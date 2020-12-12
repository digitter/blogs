# ブログ管理

Git管理下に置く
```
article/
  |-wip
  |-deploy
```

1. 勉強したことをMarkdownファイルに纏める。（wipディレクトリ）
2. 推敲する。
3. デプロイする。 (deployディレクトリ)
4. 必要ならupdateする

## 1.の記事の作成フロー
---

markdownの記事は `TEMPLATE.md` を参考にしつつ作成する。
基本的には`題、章、節`に構成を分けていく

## 3.のデプロイ時の作業フロー
---
### contentfulでの作業
- PNG画像を投稿する

- 推敲する
節以下の構成の
`---` を取り消す

### デプロイ成功後
deplyディレクトリに記事を移動させる
