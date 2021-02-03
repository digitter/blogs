---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

# Cookieのセキュリティたいさく
- SSL,Secure属性でも改変される可能性がある

ECサイト会員が商品を注文する時にCookieを改変される(埋め込み)ケースを考察

---

## SSL、Secure属性、HttpOnly属性、の設定済みを想定
>常時SSL、Secure属性で盗聴を防ぐ🛡
>HttpOnly属性で窃盗を防ぐ🛡

*ただし、Cookieを改変(埋め込み)されても良いように想定しておくのがベストではある。

---

右側が Cookieに 保存される key(value)
<注文情報> --— Hash & 暗号化 —--> _app_session(xdxg)

```
*注文情報の内容

・ 会員のID
・ 会員の名前
・ 郵便番号
・ 住所
・ 注文状況
・ 送料
・ 請求金額
・ 支払い方法
```

---

## 中間者攻撃でCookieを新たに埋め込まれた場合を考察 💣
参考:  https://www.youtube.com/watch?v=GP1eEit1quY

```
[注文情報記入画面]—--POST--—>
[注文情報のセッション作成]--—Redirect GET--—>
[注文確認画面]—--POST or GET--—>
[中間者攻撃]---_app_session(0000)埋め込み---Redirect GET--->
[注文作成処理]---(0000), (xdxg)を受け取る--—> 完了画面表示
```

注文作成処理で攻撃者のcookie(0000)が読み込まれる。
被害者のアカウントやセッションには問題ない。

---

## XSSで操作された場合を考察 💣

```
[注文情報記入画面]—--POST--—>
[注文情報のセッション作成]--—Redirect GET--—>
[注文確認画面]—--POST or GET(XSS... Cookieは盗み出せない...)--—>
[注文作成処理]---(0000), (xdxg)を受け取る--—> 完了画面表示
```

*HttpOnly属性設定があるのでCookieは盗み出せないが、XSSでコードは実行できる。
参考: https://www.youtube.com/watch?v=4JREwhSC2dQ
