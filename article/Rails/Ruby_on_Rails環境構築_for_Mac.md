---
marp: true
header: "**Tech mesia**"
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->
<!-- class: invert -->

# ローカルで Ruby on Rails 環境構築 for Mac
---

## Railsアプリを開発するのにはどんなものが必要か？

- 当たり前だけどまずRuby
- rbenv(色々なバージョンのRubyをインストールしたりするのに便利)
  - [rbenvの利用方法]()
  >特定のディレクトリのRubyのversionを指定できたりも可能。
- ruby-build
  - Rubyをコンパイルするもの。今回はrbenvと同時にインストールします。
- Gem
  - bundler
  - rails

---

## ローカルマシンで開発する

```
# rbenvと共にruby-buildというものもインストールされます。
$ brew install rbenv

# 使っているshellを確認
$ echo $SHELL

# 以下は使っているshellによって、変えてください。

# bashだった場合は以下を実行
$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile

# zshだった場合は以下を実行
$ echo 'eval "$(rbenv init -)"' >> ~/.zshrc
$ source ~/.zshrc

# versionが出ればrbenvをインストールできています。
$ rbenv --version

# rbenv経由でインストールできる最新の安定板Rubyのversionを表示する。
# -l を -L にするとインストール可能なRubyの全てのversionを表示する。
$ rbenv install -l

# 今回は安定板2.7.1をインストール
$ rbenv install 2.7.1

# デフォルトで使用したいversionを指定
$ rbenv global 2.7.1

# 2.7.1 ... が出ればOK
$ ruby -v

# bundlerをインストール
$ gem install bundler

# railsをインストール
# -v オプションで好きなバージョンをインストール可能です。
$ gem install rails

# Railsアプリを作成
$ rails new application_name

# bundle installします。
# -j4は並列処理でインストールを少し速くしてくれます。
$ cd application_name
$ bundle install -j4

# Rails serverを起動し http://localhost:3000 にアクセス !
$ rails s
```

---

## Vagrant、Virtualboxで利用する(WIP)

## Dockerで開発する(WIP)
