## 目次

<!-- TOC -->

- [目次](#目次)
- [前提](#前提)
  - [usersテーブル](#usersテーブル)
  - [articlesテーブル](#articlesテーブル)
  - [favoritesテーブル](#favoritesテーブル)
- [リレーションは以下の前提で進めます。](#リレーションは以下の前提で進めます)
- [preload](#preload)
  - [役割](#役割)
  - [使い方](#使い方)
- [eager_load](#eager_load)
  - [役割](#役割-1)
  - [使い方](#使い方-1)
- [preloadとeager_laodの違い](#preloadとeager_laodの違い)
- [includes](#includes)
  - [役割](#役割-2)
- [使い方](#使い方-2)
- [join](#join)
  - [役割](#役割-3)
  - [使い方](#使い方-3)

<!-- /TOC -->

## 前提

以下の３つのテーブルがあるとする。

users, articles, favorites

### usersテーブル

カラムは以下

- id
- name
- email
- introduction
- profile_image_id
- created_at
- updated_at

### articlesテーブル

カラムは以下

- id
- user_id(外部キー)
- title
- content
- created_at
- updated_at

### favoritesテーブル

カラムは以下

- id
- user_id(外部キー)
- article_id(外部キー)
- created_at
- updated_at

## リレーションは以下の前提で進めます。

![画像](https://raw.githubusercontent.com/digitter/blogs/master/article/Rails/N%2B1%E5%95%8F%E9%A1%8C/images/user_article_favorite.png)

## preload

### 役割

クエリで取得したデータをあらかじめ、メモリ上に格納してくれる。

### 使い方

>Userを取得して、そのUserの主キー(id)を外部キー(user_id)に持つArticleを取得する。

```sql
irb(main):001:0> User.preload(:articles).first
  User Load (1.0ms)  SELECT  "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
  Article Load (0.5ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ?  [["user_id", 1]]
=> #<User id: 1, email: "a@a.a", name: "aaa", introduction: "", profile_image_id: "983049398d7c4b8e6b0f860a726065b4631fe62c78611bb89a...", created_at: "2020-11-15 14:25:56", updated_at: "2021-04-20 15:39:00">
```

- `User.preload(:articles, articles: :favorites).first`

>Userを取得して、そのUserの主キーを外部キーに持つArticleを取得する。
>それらのArticleの主キー(id)を外部キー(article_id)に持つfavoritesを取得する。

```sql
irb(main):005:0> User.preload(:articles, articles: :favorites).first
  User Load (0.2ms)  SELECT  "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]

  Article Load (0.1ms)  SELECT "articles".* FROM "articles" WHERE "articles"."user_id" = ?  [["user_id", 1]]

  Favorite Load (0.3ms)  SELECT "favorites".* FROM "favorites" WHERE "favorites"."article_id" IN (?, ?, ?)  [["article_id", 6], ["article_id", 7], ["article_id", 8]]

=> #<User id: 1, email: "a@a.a", name: "aaa", introduction: "", profile_image_id: "983049398d7c4b8e6b0f860a726065b4631fe62c78611bb89a...", created_at: "2020-11-15 14:25:56", updated_at: "2021-04-20 15:39:00">
```

このように、preloadはアソシエーションの関連先１つずつクエリを送るのでレスポンスタイムがeager_loadより早い。

ただし、IN句が大きくなりがちなのでメモリ使用量に注意。

関連先テーブル(articles, favoritesテーブル)に対してはwhere句は使えないぽい。

## eager_load

### 役割

クエリで取得したデータをあらかじめ、メモリ上に格納してくれる。

### 使い方

>User.eager_load(:articles).first

```sql
irb(main):008:0> User.eager_load(:articles).first
  SQL (0.3ms)  SELECT  DISTINCT "users"."id" FROM "users" LEFT OUTER JOIN "articles" ON "articles"."user_id" = "users"."id" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
  SQL (0.4ms)  SELECT "users"."id" AS t0_r0, "users"."email" AS t0_r1, "users"."encrypted_password" AS t0_r2, "users"."reset_password_token" AS t0_r3, "users"."reset_password_sent_at" AS t0_r4, "users"."remember_created_at" AS t0_r5, "users"."sign_in_count" AS t0_r6, "users"."current_sign_in_at" AS t0_r7, "users"."last_sign_in_at" AS t0_r8, "users"."current_sign_in_ip" AS t0_r9, "users"."last_sign_in_ip" AS t0_r10, "users"."name" AS t0_r11, "users"."introduction" AS t0_r12, "users"."profile_image_id" AS t0_r13, "users"."created_at" AS t0_r14, "users"."updated_at" AS t0_r15, "articles"."id" AS t1_r0, "articles"."title" AS t1_r1, "articles"."content" AS t1_r2, "articles"."created_at" AS t1_r3, "articles"."updated_at" AS t1_r4, "articles"."user_id" AS t1_r5 FROM "users" LEFT OUTER JOIN "articles" ON "articles"."user_id" = "users"."id" WHERE "users"."id" = ? ORDER BY "users"."id" ASC  [["id", 1]]
=> #<User id: 1, email: "a@a.a", name: "aaa", introduction: "", profile_image_id: "983049398d7c4b8e6b0f860a726065b4631fe62c78611bb89a...", created_at: "2020-11-15 14:25:56", updated_at: "2021-04-20 15:39:00">
```

>User.eager_load(:articles, articles: :favorites).first

```sql
irb(main):013:0> User.eager_load(:articles, articles: :favorites).first
  SQL (0.4ms)  SELECT  DISTINCT "users"."id" FROM "users" LEFT OUTER JOIN "articles" ON "articles"."user_id" = "users"."id" LEFT OUTER JOIN "favorites" ON "favorites"."article_id" = "articles"."id" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
  SQL (0.5ms)  SELECT "users"."id" AS t0_r0, "users"."email" AS t0_r1, "users"."encrypted_password" AS t0_r2, "users"."reset_password_token" AS t0_r3, "users"."reset_password_sent_at" AS t0_r4, "users"."remember_created_at" AS t0_r5, "users"."sign_in_count" AS t0_r6, "users"."current_sign_in_at" AS t0_r7, "users"."last_sign_in_at" AS t0_r8, "users"."current_sign_in_ip" AS t0_r9, "users"."last_sign_in_ip" AS t0_r10, "users"."name" AS t0_r11, "users"."introduction" AS t0_r12, "users"."profile_image_id" AS t0_r13, "users"."created_at" AS t0_r14, "users"."updated_at" AS t0_r15, "articles"."id" AS t1_r0, "articles"."title" AS t1_r1, "articles"."content" AS t1_r2, "articles"."created_at" AS t1_r3, "articles"."updated_at" AS t1_r4, "articles"."user_id" AS t1_r5, "favorites"."id" AS t2_r0, "favorites"."article_id" AS t2_r1, "favorites"."user_id" AS t2_r2, "favorites"."created_at" AS t2_r3, "favorites"."updated_at" AS t2_r4 FROM "users" LEFT OUTER JOIN "articles" ON "articles"."user_id" = "users"."id" LEFT OUTER JOIN "favorites" ON "favorites"."article_id" = "articles"."id" WHERE "users"."id" = ? ORDER BY "users"."id" ASC  [["id", 1]]
=> #<User id: 1, email: "a@a.a", name: "aaa", introduction: "", profile_image_id: "983049398d7c4b8e6b0f860a726065b4631fe62c78611bb89a...", created_at: "2020-11-15 14:25:56", updated_at: "2021-04-20 15:39:00">
```

LEFT OUTER JOIN を使う。

関連先のwhere句による絞り込みなども可能です。

一回のクエリでまとめて取得した方が効率的な場合に使うと良さげ。

ただし、1回のSQLでJOINした全データを取得するので、データ量の増加に合わせてレスポンスタイムは長くなる。

## preloadとeager_laodの違い

https://www.rubydoc.info/docs/rails/4.1.7/ActiveRecord/Associations/Preloader

LEFT JOIN するということはテーブル全部読み込みするので紐付け先がいなくでもわざわざ読み込んでしまう。

## includes

### 役割

includes は基本的には preload で挙動する。

関連先に対して絞り込み条件を指定した場合は、eager_loadの挙動になる。

## 使い方

```ruby
# usersテーブルのカラムemailを指定
User.includes(:articles).where(email: "a@aa.a")
```

```ruby
# articlesテーブルのカラムuser_idを指定
User.includes(:articles).where(articles: {user_id: 1})

# 以下、2つと同じ挙動になる。
User.eager_load(:articles).where("articles.user_id = 1")
User.includes(:articles).where("articles.user_id = 1").references(:articles)
```

ややこしいので、includes を使うくらいなら `preload` か `eager_load` を使うのが良いかもしれないという意見もある。

## join

### 役割

INNER JOINでテーブルを結合する。

cacheをそもそもしない。

preload, eager_load の様なcacheももちろん無し。

メモリの使用量を最小限に抑えたい時に使うと良さげ。

INNER JOINした先のデータを参照せず、絞り込み結果だけが必要な場面とかに使うと良さげ。(countとか使う場合, 条件に使う場合など)

### 使い方

usersテーブルとarticlesテーブルを inner join する。

joinはするが、戻り値は userのactive record relationになる。

```sql
User.joins(:articles).all

User Load (0.3ms)  SELECT  "users".* FROM "users" INNER JOIN "books" ON "articles"."user_id" = "users"."id" LIMIT ?  [["LIMIT", 11]]
```

```ruby
User.all.count
# => 3
Article.all.count
# => 3

User.joins(:articles).count
# => 6
```
