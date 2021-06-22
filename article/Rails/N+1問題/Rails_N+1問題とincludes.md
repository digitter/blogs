## 目次

<!-- TOC -->

- [目次](#目次)
- [前提](#前提)
- [Bookに紐づくUserの名前を取得し表示する。](#bookに紐づくuserの名前を取得し表示する)
- [Active Record `includes`メソッドでクエリ回数を減らす](#active-record-includesメソッドでクエリ回数を減らす)
  - [実際にデータ数を増やして検証してみました](#実際にデータ数を増やして検証してみました)
- [includesの危険な面](#includesの危険な面)

<!-- /TOC -->

## 前提

RDBを利用していて、usersテーブル、booksテーブルというものがあるとします。

- user:book の関係は 1:N

- 主キーはid、外部キーはuser_id

- usersテーブルにはnameというカラムがある。

## Bookに紐づくUserの名前を取得し表示する。

各Bookに紐づいたUserのnameをみたい時、以下のようにしますよね？🤔💭

```ruby
[1] pry(main)> Book.all.each {|b| puts b.user.name}
  Book Load (0.2ms)  SELECT "books".* FROM "books"

  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
    Aさん

  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
    Bさん

  User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 3], ["LIMIT", 1]]
    Cさん
```

Aさん、Bさん、Cさんは表示できましたが合計4回クエリが実行されています。

>合計 0.8ミリ秒

今回はBookがデータベースに3つしかない想定ですが、
もし、100のBookがあるとすると合計101回クエリが発行されます。
データベースにアクセスする回数が多ければ多いほど時間も負荷もかかります。

## Active Record `includes`メソッドでクエリ回数を減らす

includesは、関連するテーブルのデータをあらかじめ参照するメソッドです。

Bookに紐づくUserを一気に取得してしまおうという訳です。

(🚨️この時にはActiveRecordオブジェクトも生成されメモリに保持されます。🚨)

各Bookに紐づいたUserのnameをincludesを利用して取得...🤔💭

```ruby
[2] pry(main)> Book.includes(:user).all.each do |b| puts b.user.name end
  Book Load (0.2ms)  SELECT "books".* FROM "books"
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."id" IN (?, ?, ?)  [["id", 1], ["id", 2], ["id", 3]

  Aさん
  Bさん
  Cさん
```

includesを利用するとクエリ2回だけで済んでいます！

>合計 0.4ミリ秒

---

今回の場合は2倍早くなりました。

### 実際にデータ数を増やして検証してみました

1000件のBookからそれぞれ紐づくUserのnameを取得した時の時間
>Bookに紐づくUserのnameを取得 (includesメソッド不使用) (581.0ms)
>Bookに紐づくUserのnameを取得 (includesメソッド利用版) (70.6ms)

保存しているデータの量が大きくなるほど効果が出てきますよ😌

## includesの危険な面

でも、データが量が大きくなればなるほどまた別の問題も出てきます。

includesは eager loading 方式です。

ORMでよく言われるeager loadingは簡単にいうと、少ないDBクエリで必要なデータをあらかじめ取得しておき、データをメモリ常に保持しておこうという方式です。

つまり、DBへのアクセス数は減りますが、多くのデータを取得する場合はメモリが大量に消費されるという面があります。

今回の例だとそもそも Book.all としている時点でかなりデータをとってきてしまってメモリにデータが保辞されるのですが、さらにUserも取得するとなると大量のデータをメモリに保持することになります。

取得するデータの数も考えた設計が重要になるかと思います。
