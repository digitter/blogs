- ボックスモデルとは
HTMLの要素はそれぞれ、要素を表示するための「表示領域」を確保します コンテンツ領域の周囲は、内側余白（padding）、枠線（border）、そして、外側余白（margin）で構成されています。
・border 要素に枠線を設定する
・padding 要素の内側にある余白
・margin 要素の外側にある余白

それぞれの要素の特徴は
- block要素, inline要素, inline-block要素
width/height
Margin/padding
並び方

- 余白
　 - padding 要素の内側余白
　 - margin 要素の外側の余白
   - border 要素の枠線
      - border: ボーダーラインのpx 太さ 色(ex: 1px solid red)
      - border-radius
領域の四辺の角を丸くしたいときに使うプロパティです。角の半径をpxや%などの単位を付けて指定します。50%を指定すると、正円になる。
  - リセットcssとは
  - box-sizing: content-box 含めない
  - box-sizing: border-box padding, borderまで含める

- 横並び
  - float / clearfix::after, before
  - display: inline-block

- 中央寄せの方法
  - margin: 0 auto;
  - text-align: center; インライン軸に沿ってどう並べるか

- positionで要素の位置を指定
  - static, relative, absolute, fixed
  - top, bottom, left, right

- font関連
  - font-size
  - font-weight 太さ
  - font-family フォントの種類
  - line-height 行の高さ
  - letter-spacing 文字の間隔

- その他CSS
  - リンクの下線を非表示にする方法
    text-decoration: none:
  - リストのマークを非表示にする方法
    list-style: none;

- 背景画像
  - background-image と size(幅、高さ)
  - background-position 上記ありきのposition
- レスポンシブとは

