## アプリケーション層の主な役割

***

- ユーザーがデータを解釈できるようにする。
- クライアントとサーバーという概念を持つ。
- アプリケーションプロトコルがある.
>電子メールやwwwもアプリケーションプロトコル。

## アプリケーションプロトコル www を支える HTTP の特徴

***

- HTTPはテートレス!

>一つのリクエストに対して一つのリクエスト返し、状態を保持しないステートレスでシンプルなプロトコル。

```
  < 通信開始 >
|
|         要求(index.htmlをください)--->
|   client                            server
|         <---応答(index.htmlを渡します)
▼
  < 通信終了 >
```

### リクエストパケット、レスポンスパケット
>要求パケット、応答パケットとも言われる。

>データ量を一定の大きさに単位に分けて送信することがある。これをパケット通信と言いました。リクエスト時と、レスポンス時でもパケットに基づいて送信されている。

- リクエストパケットの詳細

```
1 HTTP method
2 Request Headers
3 Body

* Bodyにはリクエスト時に必要なデータが入る。
* GETメソッドの場合、基本的に空です。
```

- レスポンスパケット詳細

```
1 status
2 Response Headers
3 Body

* statusは200番台なら正常に機能してます。
* Bodyにはレスポンス時に必要なデータが、つまりクライアントに渡す情報が入る。
```

### アプリケーションヘッダ

>アプリケーション層で付加されるヘッダのこと。要求と応答(Request, Response)に関する情報が含まれる。

### リクエストヘッダ、レスポンスヘッダの詳細例
>以下は yahoo.co.jp にアクセスした時の、リクエストとレスポンスのヘッダです。

- リクエストヘッダ詳細

```
authority: www.yahoo.co.jp
:method: GET
:path: /
:scheme: https
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
accept-encoding: gzip, deflate, br
accept-language: ja,en-US;q=0.9,en;q=0.8
.
.
.
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36
```

- レスポンスヘッダ詳細

```
accept-ranges: none
age: 1
cache-control: private, no-cache, no-store, must-revalidate
content-encoding: gzip
content-type: text/html; charset=UTF-8
date: Thu, 18 Jun 2020 16:47:24 GMT
expires: -1
pragma: no-cache
server: ATS
status: 200
vary: Accept-Encoding
via: http/1.1 edge2406.img.djm.yahoo.co.jp (ApacheTrafficServer [c sSf ])
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-vcap-request-id: 9217dde9-c2af-48e3-42dc-f90283308064
x-xss-protection: 1; mode=block
```

## リクエストヘッダ、レスポンスヘッダを実際に確認する

***

- 実際にcurlコマンドでYahooのトップページのデータを取得してみる。

```
curl -i https://www.yahoo.co.jp/
```

実際にHTML情報が返ってくるのがわかる。これがBody部分にあたる。

```
HTTP/2 200
accept-ranges: none
cache-control: private, no-cache, no-store, must-revalidate
content-type: text/html; charset=UTF-8
date: Thu, 18 Jun 2020 10:50:02 GMT
expires: -1
pragma: no-cache
set-cookie: B=7hl7rvhfemhmq&b=3&s=qb; expires=Sun, 19-Jun-2022 10:50:02 GMT; path=/; domain=.yahoo.co.jp
vary: Accept-Encoding
.
.
.

<!DOCTYPE html><html lang="ja"><head><meta charSet="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><title>Yahoo! JAPAN</title><meta name="description" content="あなたの毎日をアップデートする情報ポータル。検索、ニュース、天気、スポーツ、メール、ショッピング、オークションなど便利なサービスを展 ...
```

- ChromeのDevToolsでもヘッダの確認ができます。

<a href="https://www.youtube.com/watch?v=g3Tpilj_T8g"><img src="https://img.youtube.com/vi/g3Tpilj_T8g/0.jpg" width="400" alt="動画"></a>

## その他のアプリケーションプロトコル
***

- SMTP
- Telnet
- NAT
- SNMP
- NTP
