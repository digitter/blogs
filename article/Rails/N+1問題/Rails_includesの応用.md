---
marp: true
header: "**Tech mesia**"
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->

# Rails - includesするテーブル自体に条件をつける

---

## 前提
- UserとBookがアソシエーションで紐づけられている.
- 主キーがid = 1 のUserを取得し、そのUserが作った"hoge"という名のBookを全て参照する.

---

## 普通のincludes

```ruby
pry(main)> user = User.includes(:books).find(1)
  User Load (0.1ms) SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]

  Book Load (0.2ms)  SELECT "books".* FROM "books" WHERE "books"."user_id" = ?  [["user_id", 1]]
=> #<User
      id: 1,
      email: "a@a.a",
      name: "太郎",
      introduction: "太郎です〜",
      profile_image_id: nil,
      created_at: "2021-02-21 12:34:59",
      updated_at: "2021-02-21 12:34:59">

pry(main)> user.books
=> [#<Book:0x00007f9105e0a248
      id: 1,
      title: "Ruby",
      body: "たのしい",
      created_at: Sun, 21 Feb 2021 12:34:59 UTC +00:00,
      updated_at: Sun, 21 Feb 2021 12:34:59 UTC +00:00, user_id: 1>,
    #<Book:0x00007f9105e09d48
      id: 1002,
      title: "Rails"
      body: "楽しい"
      created_at: Thu, 01 Apr 2021 16:19:14 UTC +00:00,
      updated_at: Thu, 01 Apr 2021 16:19:14 UTC +00:00, user_id: 1>]
```

---

## includesするテーブルに条件を課す.

先ほどでは、条件指定なしのincludesでUserに紐づく全てのBooksテーブルのレコードを参照していたが、今回は1つだけ参照するようになった.

```ruby
pry(main)> user = User.includes(:books).where(:books=>{title: "hoge"}).find(1)
  SQL (0.6ms)  SELECT  DISTINCT "users"."id" FROM "users"
  LEFT OUTER JOIN "books" ON "books"."user_id" = "users"."id"
  WHERE "books"."title" = ? AND "users"."id" = ? LIMIT ?
  [["title", "hoge"], ["id", 1], ["LIMIT", 1]]

pry(main)> user.books
[#<Book:0x00007f9105e09d48
  id: 1002,
  title: "Rails"
  body: "楽しい"
  created_at: Thu, 01 Apr 2021 16:19:14 UTC +00:00,
  updated_at: Thu, 01 Apr 2021 16:19:14 UTC +00:00, user_id: 1>]
```

＊ この書き方でもいけました。
```
User.includes(:books).where('books.title="hoge"').references(:books).first
```

---

## ただし。。。

includesの条件に一致するものがない場合は、
エラーになったり、nilになってしまうパターンがある。

```ruby
pry(main)> user = User.includes(:books).where(:books=>{title: "unknown"}).find(1)

  SQL (1.0ms) SELECT DISTINCT "users"."id" FROM "users"
  LEFT OUTER JOIN "books" ON "books"."user_id" = "users"."id"
  WHERE "books"."title" = ? AND "users"."id" = ? LIMIT ?
  [["title", "unknown"], ["id", 1], ["LIMIT", 1]]

ActiveRecord::RecordNotFound: Couldn't find User with 'id'=1 [WHERE "books"."title" = ?]
```

エラーは例外処理に任せて、
nilならraiseで例外処理に任せるのが良さそう.
