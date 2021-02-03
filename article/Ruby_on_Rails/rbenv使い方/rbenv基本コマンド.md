---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

# rbenv利用方法

---

## Package managing

---

### rbenv, Ruby-build

ruby-buildは、PC上で異なるバージョンのRubyをコンパイルしたり、インストールする。
rbenvで色々なバージョンのRubyをインストールしたり、ディレクトリごとに使うRubyのバージョン指定をしたりできるコマンドを使える。
*rbenvをインストールした時に、ruby-buildもインストールされる。

---

## rbenv使い方

---

### インストールできるRubyのバージョンを確認
```
rbenv install --list

>>
2.5.8
2.6.6
2.7.1
jruby-9.2.11.1
maglev-1.0.0
mruby-2.1.0
rbx-4.15
truffleruby-20.1.0

Only latest stable releases for each Ruby implementation are shown.
Use 'rbenv install --list-all' to show all local versions.

```

---

### 特定のversionのRubyをインストール

```
rbenv install 2.x.x
```

指定するversionは`rbenv install -list or rbenv install --list-all`で確認できたものをrbenv経由でインストールすることができる。
ちなみに`-list`の方は、`rbenv install -l`と略せます。

---

### マシン内にインストールされているRubyを表示

```
❯ rbenv versions
  system
  2.4.0
  2.4.6
* 2.5.1 (set by /Users/kazuki/.anyenv/envs/rbenv/version)
  2.6.1
  2.7.1
```
> * がカレントディレクトリで利用しているversion

---

### ディレクトリごとにRubyのversionを変更する

local versionで指定可能
```
rbenv local 2.x.x
rbenv rehash
# rehashは新しくインストールしたRubyや、その拡張機能の追加をrbenvに反映させるためもの
```

globalに指定したい場合は
```
rbenv global 2.x.x
rbenv rehash
```

---

### rbenv rehashが面倒...

gem `rbenv-gem-rehash`をインストールしておくと
毎回の`rbenv rehash`が不要になります。

---

## railsをインストールしたい場合

---

```
# ruby -v で先ほどインストールしたversionが適用できているか確認

ruby -v

# Railsをインストール

gem install rails

rails new アプリ名 でRailsアプリ作成
```
