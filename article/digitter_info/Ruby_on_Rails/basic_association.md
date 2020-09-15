---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->

<style>
  section {
    font-size: 20px
  }
</style>

# Rails アソシエーションの挙動を知る
# 1:N (user:book)

---

## アソシエーションの設定は大きく捉えて2つだけ
1. モデルに関係性を定義
>Userモデルにhas_many :books の設定を定義する
>Bookモデルにbelongs_to :user の設定を定義する

2. idレベルで紐付け(主キーと外部キー)
>Nが相手のidを `相手のモデル名_idに` 保持している

### users のデータがあるとします

```
#<user id: 1, name: 'メンター太郎', introduction: 'Rubyが得意です', ... >
#<user id: 2, name: 'メンター二郎', introduction: 'HTML/CSSが得意です', ... >
#<user id: 3, name: 'プロメンター', introduction: 'よろしく！', ... >
```

### books のデータがあるとします

```
  #<book id: 1, title: 'HTML/CSSデザインパターン', body: '面白かった', user_id: 1, ... >
  #<book id: 2, title: 'HTML/CSSデザインパターン', body: '難しかった', user_id: 1, ... >
  #<book id: 3, title: 'HTML/CSSデザインパターン', body: '面白かった', user_id: 2, ... >
```

---

## アソシエーションで嬉しいこととは？

`userインスタンス.books`
  >紐づいたbookを全て取得できる

`bookインスタンス.user`
  >紐づいたuserを一人取得できる

---

## 実際に実験してみる
`rails console` で実験してみると userから2つのbookを割り出せました。

```
❯ rails c

Running via Spring preloader in process 16083
Loading development environment (Rails 5.2.4.3)

[1] pry(main)> user_instance = User.find(1)
  User Load (0.5ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
=> #<User id: 1, name: 'メンター太郎', introduction: 'Rubyが得意です', ... >

[2] pry(main)> user_instance.books
  Book Load (0.7ms)  SELECT "books".* FROM "books" WHERE "books"."user_id" = ?  [["user_id", 1]]
=> [#<Book id: 1, title: 'HTML/CSSデザインパターン', body: '面白かった', user_id: 1, ... >,
  #<Book id: 2, title: 'HTML/CSSデザインパターン', body: '難しかった', user_id: 1, ...> ]
```
