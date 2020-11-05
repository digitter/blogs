---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->

Rails N+1問題
(user:book / 1:N) を想定

---

各Userに紐づいたBookのタイトルをみたい時、以下のようにしますよね？🤔💭

---

普通にやると4回クエリが実行される...
（今回３人のUserが存在して、一人ずつにBookが紐づいているという設定)

```ruby
> User.all.each do |u| puts u.books[0].title end

 User Load (0.1ms) SELECT "users".* FROM "users"
  Book Load (0.6ms) SELECT "books".* FROM "books" WHERE "books"."user_id" = ? [["user_id", 1]]
タイトル1
  Book Load (0.1ms) SELECT "books".* FROM "books" WHERE "books"."user_id" = ? [["user_id", 2]]
タイトル2
  Book Load (0.0ms) SELECT "books".* FROM "books" WHERE "books"."user_id" = ? [["user_id", 3]]
タイトル3

...
```

合計 0.8ミリ秒

---

includesを利用するとクエリ2回だけで済んでいる！
```ruby
> User.includes(:books).all.each do |u| puts u.books[0].title end
  User Load (0.1ms) SELECT "users".* FROM "users"
  Book Load (0.3ms) SELECT "books".* FROM "books" WHERE "books"."user_id" IN (?, ?, ?) [["user_id", 1], ["user_id", 2], ["user_id", 3]]
  タイトル1
  タイトル2
  タイトル3
```

>`allは省略可能です`

合計 0.4ミリ秒

---

今回の場合は2倍早くなりました。
アプリの規模が大きくなるほど効果が出てきます。😌
