---
marp: true
header: "**Tech mesia**"
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->

# JQueryパフォーマンス改善

---

DOMの取得はcpuかgpuが頑張るので出来るだけセレクタを取得するコードの重複は避けた方が良い

---

JQueryではメソッドチェーンを使うと良い

❌
```
$('.box').css('color', 'blue')
$('.box').css('font-weight', 'bold')
$('.box').text('hogehoge~~')
```

⭕️
```
$('.box')
  .css('color', 'blue')
  .css('font-weight', 'bold')
  .text('hogehoge~~')
```

もしくは `const box1 = $('.box1')` みたいに変数でキャッシュさせて使いまわすとかも良い.
