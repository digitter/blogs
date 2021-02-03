---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

  # Git チーム開発

master(main) -> develop -> 作業ブランチ

  ---

### A案
>手元のdevelopにリモートdevelopを取り込み、
>手元のdevelopを自分の作業ブランチに取り込む

```
Remote repository (Github)

    developブランチ <—-1. pull request🈴 🎉 <—— Cさんのブランチ
    developブランチ <—-1. pull request🈴 🎉 <—— Bさんのブランチ
    |
    2. pull
    ↓
-------------------------------------------------------------
    developブランチ
    |
    3. mergeで取り込み
    ↓
    Aさんのブランチ

Local repository (自分のPC)
```

---

1. リモートのdevelopに新しい変更点が加えられる！
>Bさん、CさんのPull requestが承認されdevelopにmergeされる
2. 手元のdevelopを更新する！
>自分の手元のdevelopブランチに移動してリモートのdevelopブランチをpullして最新化する。
>git pull origin develop (既にremote-trackingブランチがあるなら git pull だけでOK)
3. 自分の作業ブランチにも最新のdevelopを取り込む！
>自分の作業ブランチ(userブランチ)に移動後に最新developの情報を自分のブランチに取り込む。
>git merge origin/develop(git merge origin develop でもOK)

あとは作業が完了したら自分のブランチをpushする。

---

###  B案: 直接自分の作業ブランチにリモートdevelopを取り込む
>自分の作業ブランチに直接リモートのdevelopブランチの内容を取り込む

```
Remote repository (Github)

    developブランチ <—-1. pull request🈴 🎉 <—— Cさんのブランチ
    developブランチ <—-1. pull request🈴 🎉 <—— Bさんのブランチ
    |
    2. pull
-------------------------------------------------------------
    ↓
    Aさんのブランチ

Local repository (自分のPC)
```

---

1. リモートのdevelopに新しい変更点が加えられる！
>Bさん、CさんのPull requestが承認されdevelopにmergeされる
2. 自分の作業ブランチにも最新のdevelopを取り込む！
>自分の作業ブランチ(userブランチ)に移動後、最新developの情報を自分のブランチに取り込む。
>git pull origin develop

あとは作業が完了したら自分のブランチをpushする。
