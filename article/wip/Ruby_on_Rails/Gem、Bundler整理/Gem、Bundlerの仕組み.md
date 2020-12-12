---
marp: true
header: "**Tech mesia**"
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

# Gem、Bundlerの仕組み

---
## Package managing
---
### rbenv, Ruby-build

ruby-buildは、PC上で異なるバージョンのRubyをコンパイルしたり、インストールする。
rbenvで色々なバージョンのRubyをインストールしたり、ディレクトリごとに使うRubyのバージョン指定をしたりできるコマンドを使える。
*rbenvをインストールした時に、ruby-buildもインストールされる。

[rbenvの使い方](link)

---

## RubyGems
---
### RubyGemsとは
>Ruby用のパッケージ管理システム
>RubyがRubyGemsを標準ライブラリとして内包している。

```ruby
ruby -v
# Rubyがあるなら
gem -v
# gemコマンドも使える
```

`gem install Gem名` でgemをインストールしたりできる。
*Gem document
>https://guides.rubygems.org/

---

### RubyGems自体のupdate
```
gem update —system
```

### 特定のgemをバージョンアップする
```
gem update [GEMNAME]
```

*RubyGemsのコマンド
>https://guides.rubygems.org/command-reference/

---

## Bundlerについて

---
### bundler
>Gemの一種、Gem同士の依存関係とバージョンの管理

*Bundle gem document
>https://bundler.io/man/bundle-install.1.html

```
bundle init
# Gemfileを作る
```

```
bundle install
#でGemfileに記載したgemを一括で導入できる.
```

---

### bundle install 時のgemのインストール先

デフォルトでは`gem env`で確認できる`INSTALLATION DIRECTORY`にgemはインストールされるが、別の場所に変えることも可能。

```
bundle install —path vendor/bundle --jobs=4
# 最初だけこのコマンドを打つと次回以降のbundleインストール先は
# ./vendor/bunlde以下になる.
```

---

### bunlderの設定確認
```
bundle config

#または

bundler env
# こちらは、bundler だけでなく ruby や gem 等の情報も確認できる.
```

bundlerがどこからgemを探すかは、プロジェクトルートの下の.bundle/configに設定ファイルで決まります。これを消すことで、新たな場所にbundle installできるようになります。
無い場合は、`gem env`で表示される`INSTALLATION DIRECTORY`になる。
>The location to install the specified gems to. This defaults to Rubygems' setting.

---

### Bundle updateについて
>Gemfileをもとにgemの更新やインストールを行います。lockファイルも変わる.

```
bundle update
# Gemfileにあるのを全部update
```

```
bundle update 特定のgem
# 特定のgemをupdate
```

---

### GemfileでインストールしたGemを削除する

1. RubyGems自体から削除
```
gem uninstall gem名
```

2. Gemfileから該当のGemを削除、Gemfile.lockを更新する
```
bundle install or bundle update
```
