---
marp: true
paginate: true
---

<!-- prerender: true -->

# ActiveRecordのnewメソッドの引数に指定できるもの

---

## そもそもRubyのnewメソッドとは ?

自身のインスタンスを生成して返します。このメソッドの引数はブロック引数も含め Object#initialize に渡されます。
>https://docs.ruby-lang.org/ja/latest/method/Class/i/new.html


インスタンスとかオブジェクト指向を分かっている前提で話を進めますので、
必要であれば私が書いた記事などを参考にしてみてください。
>https://qiita.com/digitter/items/6c232f0b07a0d78cd74f

---

## Model.new() についての前提

Railsの `モデル.new()` の引数に指定するものは基本的には、テーブルのカラム名に相当するもの。
と公式ガイドでも書かれています。


例えば、RDBでusersテーブルを利用していて以下の様なカラムが存在するとします。
> nameカラム、emailカラムがある

```ruby
class User < ApplicationRecord
  ...
end
```

DBへ新たにレコードを作成する場合は、以下の様にします。

```ruby
user = User.new(name: 'Rails太郎', email: 'a@a.a')
user.save

# User.create(name: 'Rails太郎', email: 'a@a.a')
# でも作成は可能です。
```

---

newでインスタンスの初期化した後では、カラム名と同じメソッドを呼び出すとカラムの値が取得できます。

```
user.name # => Rails太郎
user.email # => a@a.a
```

実際に、以下の様にsetter的割をするメソッドを呼び出して値を指定することができます。

```ruby
user = User.new
user.name # => nil
user.name = 'ActiveRecord 太郎'
user.name # => ActiveRecord 太郎
```

ここで、newはsetter的役割があるのではないか?と推測できます。
実際のソースコードを見なくてもnewに指定できるものは `setterメソッド: 値` なのではないか？ と仮定して検証してみましょう。

---

attr_accessorで `profile` というgetter, setterで利用できる様に設定

```ruby
class User < ApplicationRecord
  attr_accessor :profile
end
```

```ruby
User.new.methods.grep(/profile/)
# => [:profile, :profile=]
```

```ruby
user = User.new(
  name: 'Rails太郎',
  profile: 'ActiveRecordのnewメソッドを掘り下げるのが趣味です。'
)

user.name # => Rails太郎
user.profile # => ActiveRecordのnewメソッドを掘り下げるのが趣味です。'
```

やはり、新たに定義してた `profile` もnewの引数に渡すと値がありました。

---

## ソースコードを追う

探し方は色々あるが、手っ取り早く見つける。


存在しない hoge というのを指定して、エラーを起こす。
```ruby
User.new(hoge: '')

ActiveModel::UnknownAttributeError: unknown attribute 'hoge' for User.
from /Users/kazuki/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/activemodel-5.2.4.3/lib/active_model/attribute_assignment.rb:53:in `_assign_attribute'
```

Railsのこの部分です。
>https://github.com/digitter/rails/blob/master/activemodel/lib/active_model/attribute_assignment.rb#L47-L54

cat とかで直接ソースコードをみても良いでしょう。

---
respond_to?で `hoge=` というものが存在すれば `true` になり、
`public_send` して `hoge = v` を実行して、
falseになったらエラーが出力されていたんですね。
なるほど。。。

```ruby
...

def _assign_attribute(k, v)
  setter = :"#{k}="
  if respond_to?(setter)
    public_send(setter, v)
  else
    raise UnknownAttributeError.new(self, k)
  end
end

...
```

---

## つまり。。。

Model.new()の引数に渡ってきた `key, value` を元にして、
インスタンスが `key=` というメソッドを持つか調べて、持ってたら
 `インスタンス.key = v` を実行してくれてたんですね〜。

---

## アソシエーションで今回のことを活かしてみる
>アソシエーションを知っている前提で話を進めます。

例えば、Twitterを想定して、Userモデル, Tweetモデルがあるとします。
`Userが1 : TweetがN' の様な関係の時通常は以下の様に主キー外部キーの設定をしてからデータを作成するかと思います。

```ruby
user = User.new(
  name: 'アソシエーション太郎',
  email: 'a@a.a'
 )
user.save

# contentというカラムがあるとする。
tweet = Tweet.new(content: 'アソシエーションは、has_many, belogns_toの設定と主キー外部キーの設定が必要だった。')
# これが外部キーと主キーを紐づけている。
tweet.user_id = user.id

tweet.save
```

---

```ruby
user = User.new(
  name: 'アソシエーション太郎',
  email: 'a@a.a'
)
user.save

# 親を指定できる
tweet = Tweet.new(
  content: 'アソシエーションは、has_many, belogns_toの設定と主キー外部キーの設定が必要だった。',
  user: user
)

tweet.save
```

---

```ruby
tweets = []
3.times do |i|
  i += 1
  tweets << Tweet.new(content: "#{i}番目のツイートです。")
end

# 子を複数指定できる
user = User.new(
  name: 'アソシエーション太郎',
  email: 'a@a.a',
  books: books
)

# この時、1人のuserと3つのtweetが作成される！
user.save
```

---

# まとめ

`Modelのインスタンス.xxx=`

とできるものは、`Model.new(xxx: 任意の値)` と書けてしまう。。。
(例外はあるかもしれないですが。)
なんと恐ろしい。。。
