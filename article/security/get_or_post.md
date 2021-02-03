---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->


# GETでなぜ重要情報をform送信しない方が良いのか？

---

GETのURLのクエリストリングから情報が丸見えだから。
POSTならリクエストボディで情報が渡されるのでURLから情報は見れない。
