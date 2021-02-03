---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

# CORSの原理
>cross origin resource sharing

---

originとはスキーム+ホスト+ポート

ex)
`http://hoge.com`
*ポート80は（httpのデフォルト値）

---

同一オリジンポリシーとは(same origin policy)
>あるオリジンから読み込まれた文書やスクリプトについて、そのリソースから
>他のオリジンにリソースにアクセスできない様に制限するもの。

---

しかし、AJAXの普及発展によって異なるオリジン(主に異なるホスト)のAPIにアクセスしたい動機が生まれる。

SPA ----- API

---

## CORSの性質

・オリジン単位でアクセス制御を提供
・HTTPヘッダを用いたアクセス制御
>request header: Origin, Access-Control-Request-XXXX
>response header: Access-Control-Allow-XXXX

レスポンスヘッダよりJSがリソースを受け取れるかどうかを判断している。

---

### CORSが同一ドメインのみ指定している場合

**case1**
- リクエスト時
foo.com ---> api.hoge.com  *リクエストは無条件で送信可能

- レスポンス時
foo.com ❌ <--- api.hoge.com  *レスポンスのAccess-Control-Allow-XXXXがないなら受け取れない

**case2**
- リクエスト時
hoge.com ---> api.hoge.com  *リクエストは無条件で送信可能

- レスポンス時
hoge.com ⭕️ <--- api.hoge.com  *レスポンスのAccess-Control-Allow-XXXXがある

---

https://www.youtube.com/watch?v=ryztmcFf01

