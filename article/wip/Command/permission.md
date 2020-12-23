---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

# Permission 誰がどこまで操作できるか

---

## 基本
まずは`Permissions`を読み解いていく

```
❯ ls -l

Permissions Size User   Date Modified Name

lrwxr-xr-x    31 kazuki 26 9  2019    sales.sh
.rwxr--r--   262 kazuki  2 6  2019    tmuxlaunch.sh
drwxr-xr-x     - kazuki 15 5  3:45    vagrant
drwx------     - kazuki 24 5 19:29    VirtualBox VMs
.rw-r--r--     0 kazuki 29 5 18:06    hoge.txt
```

---

1文字目はファイルタイプ
> . 通常ファイル
> d ディレクトリ
> l シンボリックリンク
> ...etc

2,3,4 文字目
>user権限

5,6,7 文字目
>group権限

8,9,10
>others権限

---

### アルファベットの意味
r 読み取り、 w 書き込み、 x 実行、 \- 権限なし

---

## Permissionの変更 change mode - chmod

---
### change mode - chmod
```
chmod *** ファイル名orディレクトリ名
```

*** の３文字
Who: u,g,o,a
How: + (可能), - (不可), = (変更)
What: r, w, x, -

ex)
chmod u+w hello
chmod ugo=rwx hello

---

### change mode - chmod 数字オプションver

```
chmod *** ファイル名orディレクトリ名
```

*** の３文字
Who: ugo

r=4 w=2 x=1

7(rwx) 6(rw-) 5(r-x) 3(-wx)

ex)
```
chmod 700 hello
```
・userにrwxの権限
・group 無し
・others 無し
