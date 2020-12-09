---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->

# Rails N+1問題
(user:book / 1:N) を想定

---

各Bookに紐づいたUserのnameをみたい時、以下のようにしますよね？🤔💭

```ruby
[1] pry(main)> Book.all.each do |b| puts b.user.name end
  Book Load (0.2ms)  SELECT "books".* FROM "books"

  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
    Aさん

  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
    Bさん

  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 3], ["LIMIT", 1]]
    Cさん
```

普通にやると4回クエリが実行される...(SELECT ...の部分がSQLクエリ)

合計 0.8ミリ秒

---

今回はBookがデータベースに3つしかない想定ですが、
100のBookがあるとすると合計101回クエリが発行されます。
データベースにアクセスする回数が多ければ多いほど時間も負荷もかかります。

---

## Active Record `includes`メソッドでクエリ回数を減らす
includesは、関連するテーブルのデータをあらかじめ参照するメソッド

---

各Bookに紐づいたUserのnameをincludesを利用して取得...🤔💭

```ruby
[2] pry(main)> Book.includes(:user).all.each do |b| puts b.user.name end
  Book Load (0.2ms)  SELECT "books".* FROM "books"
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."id" IN (?, ?, ?)  [["id", 1], ["id", 2], ["id", 3]

    aaa
    bbb
    bbb
```
includesを利用するとクエリ2回だけで済んでいる！(SELECT ...の部分)

合計 0.4ミリ秒

---

今回の場合は2倍早くなりました。
保存しているデータの量が大きくなるほど効果が出てきますよ😌

### 実際にデータ数を増やしてやってみました
1000件のBookからそれぞれ紐づくUserのnameを取得した時の時間
>Bookに紐づくUserのnameを取得 (includesメソッド不使用) (581.0ms)
>Bookに紐づくUserのnameを取得 (includesメソッド利用版) (70.6ms)
