## 目次

<!-- TOC -->

- [目次](#目次)
- [この記事は？](#この記事は)
- [注意書き](#注意書き)
- [empty?とexists?とblank?とpresent?の対応表](#emptyとexistsとblankとpresentの対応表)
- [empty?(空っぽですか？)](#empty空っぽですか)
  - [定義元(Rubyのいくつかの標準のクラス)](#定義元rubyのいくつかの標準のクラス)
  - [定義元(ActiveRecord::Relation)](#定義元activerecordrelation)
  - [検証](#検証)
- [exists?(存在する？)](#exists存在する)
  - [定義元(Rubyの標準のFileクラス)](#定義元rubyの標準のfileクラス)
  - [定義元(ActiveRecord::RelationのFinderMethods)](#定義元activerecordrelationのfindermethods)
  - [検証](#検証-1)
- [blank?(空欄ですか？)](#blank空欄ですか)
  - [定義元(Objectクラスにモンキーパッチ)](#定義元objectクラスにモンキーパッチ)
  - [定義元(ActiveRecord::Relation)](#定義元activerecordrelation-1)
  - [検証](#検証-2)
- [present?(存在しますか？)](#present存在しますか)
  - [定義元(Objectクラスでモンキーパッチ)](#定義元objectクラスでモンキーパッチ)
- [まとめ](#まとめ)

<!-- /TOC -->

## この記事は？

 empty? exists? blank? present? の違いを確認したものです。

Railsでは標準でオブジェクトの存在、空白確認ができるメソッドが用意されています。

なかでも混乱するのが empty? exists? blank? present? の4つのメソッドでしょう。

一つ一つ定義元を参照したり、コード検証をしてみました。

## 注意書き

また本記事ではBookというモデルを利用したコードにしています。
このBookは RailsのMVCのModelに相当する `app/models/book.rb` ということで進めていきます。必要であれば好きなモデル名に置き換えて読み進めてください。

ActiveRecord::Relationのコード例を全て Book.all として表現しています。
必要であればwhereなどに置き換えて読み進めてください。


## empty?とexists?とblank?とpresent?の対応表

|定義元|empty?|exists?|blank?|present?|
|--|--|--|--|--|
|Objectクラス(モンキーパッチ)|--|--|◯|◯|
|Ruby標準クラス|◯|◯ Fileクラス|--|--|
|ActiveRecord::Relation|◯|◯|◯|--|

## empty?(空っぽですか？)

### 定義元(Rubyのいくつかの標準のクラス)

Rubyのいくつかのクラスで標準である。

"", {}, []なら空っぽとみなす。

true or falseを返す。

### 定義元(ActiveRecord::Relation)

ActiveRecord::Relationにも存在する。

RubyのString、Array、Hashなどに標準で `empty?` メソッドというものがありますが、これはActiveRecord::Relationにも定義されています。

>https://github.com/rails/rails/blob/main/activerecord/lib/active_record/relation.rb#L274-L281

```ruby
# Returns true if there are no records.
def empty?
	if loaded?
		records.empty?
	else
		!exists?
	end
end
```

### 検証

- String

```ruby
"".empty?
=> true

"hello".empty?
=> false
```

- Array

```ruby
[].empty?
=> true

[1,2,3].empty?
=> false
```

- Hash

```ruby
{}.empty?
=> true

{a: 1, b: 2}.empty?
=> false
```

- ActiveRecord::Base

これは使えない。

```ruby
Book.new.empty?
NoMethodError: undefined method `empty?' for #<Book:0x00007fdb4632d538>
from /Users/kazuki/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/activemodel-5.2.4.3/lib/active_model/attribute_methods.rb:430:in `method_missing'
```

- ActiveRecord::Relation

```ruby
Book.all.empty?
Book Exists (1.7ms)  SELECT  1 AS one FROM "books" LIMIT ?  [["LIMIT", 1]]
=> false
```

## exists?(存在する？)

DBに該当のレコードがあるかチェックしtrue or falseを返す。

### 定義元(Rubyの標準のFileクラス)

省略

### 定義元(ActiveRecord::RelationのFinderMethods)

>https://github.com/rails/rails/blob/9a2c639a0c/activerecord/lib/active_record/relation/finder_methods.rb#L300-L347

### 検証

- ActiveRecord::Base

これは使えない。

```ruby
Book.new.exists?
  NoMethodError: undefined method `exists?' for #<Book:0x00007fdb461dcee0>
  from /Users/kazuki/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/activemodel-5.2.4.3/lib/active_model/attribute_methods.rb:430:in `method_missing
```

- ActiveRecord::Relation

```ruby
Book.all.exists?
  Book Exists (0.9ms)  SELECT  1 AS one FROM "books" LIMIT ?  [["LIMIT", 1]]
=> true
```

## blank?(空欄ですか？)

まず、空白とは何なのかを整理しましょう。

以下はRailsのガイドより抜粋です。

[blank?とpresent?](https://railsguides.jp/active_support_core_extensions.html#blank-questionmark%E3%81%A8present-questionmark)

>Railsでは以下を空白（blank)とみなす。
>
>- nilとfalse
>
>- 空白文字 (whitespace) だけで構成された文字列 (以下の注釈を参照)
>
>- 空欄の配列とハッシュ
>
>その他、empty?メソッドに応答するオブジェクトはすべて空白として扱われます。

### 定義元(Objectクラスにモンキーパッチ)

>https://github.com/rails/rails/blob/9a2c639a0c24c12490a8f9ef324395a36949e15c/activesupport/lib/active_support/core_ext/object/blank.rb#L17-L20

```ruby
# @return [true, false]
def blank?
  respond_to?(:empty?) ? !!empty? : !self
end
```

まさかの empty? を利用していました。

しかしここで重要なのはObjectクラスでモンキーパッチしていることです。

Objectは全てのクラスのスーパークラスなので(つまりRubyのあらゆるクラスはObjectを継承している。)Objectにpresent?があるということはRubyのどのクラスでも `blank?` が利用できます。


### 定義元(ActiveRecord::Relation)

>https://github.com/rails/rails/blob/9a2c639a0c/activerecord/lib/active_record/relation.rb#L761-L764

```ruby
# Returns true if relation is blank.
def blank?
  records.blank?
end
```

### 検証

- ActiveRecord::Base

```ruby
Book.new.blank?
=> false
```

- ActiveRecord::Reation(使えるがやめた方がいい。。。)

次の使い方はやばいです。絶対やらない方がいいです。

blank?かをどうかを確認したいだけなのに、該当のレコードを全て取得してオブジェクトに変換した上でblank?メソッドを利用しています。

しかもblank?はtrue or falseしか返さないので、その後すぐに生成したオブジェクトが破棄されるわけです。最悪ですね。🙏😌🙏

```ruby
# これは使わない方がいい。
Book.all.blank?
  Book Load (37.7ms)  SELECT "books".* FROM "books"
=> false

# 代わりにexists?で十分。 (exists? はオブジェクトを生成しない。)
Book.all.exists?
  Book Exists (0.9ms)  SELECT  1 AS one FROM "books" LIMIT ?  [["LIMIT", 1]]
=> true
```

既に存在するオブジェクトに対して使うのであれば、問題ないです。
```ruby
# これは問題ない。
books.blank?
=> false
```

## present?(存在しますか？)

### 定義元(Objectクラスでモンキーパッチ)

>https://github.com/rails/rails/blob/main/activesupport/lib/active_support/core_ext/object/blank.rb#L22-L27

```ruby
# An object is present if it's not blank.
#
# @return [true, false]
def present?
  !blank?
end
```

ただのblank?の否定版を利用しているだけでした。

なのでこれもblank?で指摘した内容と同じく注意する点があります。

```ruby
# これはヤヴァイ (true or false返すためにわざわざ無駄にオブジェクトを生成する羽目に。。。)
Book.all.present?
  Book Load (29.9ms)  SELECT "books".* FROM "books"
=> true

# 代わりにempty?で十分。 (empty? はオブジェクトを生成しない。)

```

既に存在するオブジェクトに対して使うのであれば、問題ないです。
```ruby
books.present?
=> true
```

## まとめ

どこに定義されてるか見ると、使うケースがわかる。

blank?とpresent?はパフォーマンスの面でちょっと気をつけた方がいいケースがありました。😥
