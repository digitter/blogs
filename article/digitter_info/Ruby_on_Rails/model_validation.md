---
marp: true
paginate: true
---

<!-- prerender: true -->

<!-- <style>
  section {
    font-size: 20px
  }
</style> -->

# Rails ActiveRecord の validationヘルパー

---

## そもそもvalidationとは? 🤔💭
英語辞書を見ましょう
>作業結果などが規定の条件や仕様に適合しているかどうかの〕検証、証明、妥当性確認

簡単に言えば `入力チェック` のこと
>50文字以内になってる？
>空っぽじゃない？
>emailの形式になっている？
>大文字含んでいない？

---

## validationの設定
>モデルに設定するだけです

```ruby
class Book < ApplicationRecord
  # タイトルの空っぽはダメ🙅‍♂️🙅‍♀️という設定 ↓
  validates :title, presence: true
end
```

#### validation実行のタイミング
> Bookが `データベースに保存される前` に状態をチェックします

---

## 実際に空っぽの状態で保存しようとしてみる
rails consoleで実験してみます

```
❯ rails c

irb(main):001:0> book_instance = Book.new(title: '', body: 'validation ヘルパー')
=> #<Book id: nil, title: "", body: "validation ヘルパー", created_at: nil, updated_at: nil>

irb(main):002:0> book_instance.save
   (0.1ms)  begin transaction
   (0.1ms)  rollback transaction
=> false
```

`begin transaction(開始)` のあと、`rollback transaction(取り止め)` してます
>transactionとはここではデータベースにデータ保存しようとする処理と捉えてください。

つまり、空っぽで投稿すると、検証に引っかかって保存されませんでした !!!

---

## validationのエラーメッセージの表示する

# エラーメッセージはあらかじめ用意されている !

---

# Q. じゃあ、エラーメッセージはどこにあるの？ 🤔💭

---

# A. 検証に引っかかったインスタンスにくっついてくる

---

### 実際にエラー文を取得してみる

`検証に引っかかったインスタンス.errors` でエラーに関する情報を取得できて、
そのあとに `.full_messages` とするとエラーメッセージを `配列` で取得できます。

```
❯ rails c

irb(main):001:0> book_instance = Book.new(title: '', body: 'validation ヘルパー')
=> #<Book id: nil, title: "", body: "validation ヘルパー", created_at: nil, updated_at: nil>

irb(main):002:0> book_instance.save
   (0.1ms)  begin transaction
   (0.1ms)  rollback transaction
=> false

irb(main):003:0> book_instance.errors
=> #<ActiveModel::Errors:0x00007f96a9460310
@base=#<Book id: nil, title: "", body: "validation ヘルパー", created_at: nil, updated_at: nil>,
@messages={:title=>["can't be blank"]}, @details={:title=>[{:error=>:blank}]}>

irb(main):004:0> book_instance.errors.full_messages
=> ["Title can't be blank"]

```

---

### バリデーションエラーをViewで表示する

配列の形式でエラーメッセージを取得できたので後は、eachメソッドで分解してやるだけ！

Rails Guide を参考にしてみて下さい !
https://railsguides.jp/active_record_validations.html#%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%A8%E3%83%A9%E3%83%BC%E3%82%92%E3%83%93%E3%83%A5%E3%83%BC%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B
