# 第2回 Ruby 基本
実際に簡単なプログラミングをしながらRubyの基本的な文法、概念を学んでいきます。

[文字列](#●-文字列-String)

[変数と定数](#●-変数-Variable-と-定数-Constant)

[データ型](#●-データ型-Data-types)

[数値計算](#●-数値計算-Math)

[入力と出力](#●-入力と出力-IO)

## ● 文字列 String
全てのテキスト値（文字列と言います）を引用符で囲う必要があります。
引用符には2種類あります。どちらを利用してもOKです!
1. シングルクォーテーション ```''```
2. ダブルクォーテーション ```""```

値の表示にはprintを利用できますが、```puts``` も利用できます。これは値の表示時に自動で改行してくれます。

```ruby
print 'hello'
print 'hello'
# hellohello
# が表示される
```

```ruby
puts 'hello'
puts 'hello'
# hello
# hello
# が表示される
```

Rubyにおいて、ハッシュ記号(#)は一行をコメント状態にします。 *ちなみにシャープ(♯)ではありません。

```#``` の行はコメントと言い、プログラム実行時には反映されず無視されます。(メモを残す為に使ったりします)

## ● 変数 Variable と 定数 Constant
変数とは簡単に言ってしまうと値の格納場所です。変数について深く知りたい方は[こちら!](https://gam0022.net/blog/2013/02/09/ruby-variable/)

値は変化する可能性があります。variableの意味を辞書で調べると`不定の`、`変化するもの`と言う意味がでてくるはずです。
>英語から概念を理解できることも多いのでわからない単語が出てきたら調べる癖をつけておくのをお勧めします。
>
>英語で検索するとヒットする内容も多いです。

以下は2つの変数x, yの例です。

- 変数

```ruby
x = 5
y = 2x

puts y
# 10
```

- 定数

大文字から始まる変数は定数と呼ばれます。一度値が代入された後に、再度値を入力すると警告が出ます。
実際には値は変更されてしまいますので厳密な定まった値とは言えないでしょう。

```ruby
puts Name = 'engineer taro'
# => engineer taro

Name = 'programming taro'
warning: already initialized constant Name
warning: previous definition of Name was here

puts Name
# => programming taro
```

## ● データ型 Data types
データには色々なデータの形があります。
それがデータ型です。単に型と言われたりします。
以下がデータ型の一例です。

```ruby
1         # integer型
'Hello !' # string型
true      # boolean型
false     # boolean型
```

同じデータ型で計算してみます。

```ruby
int1 = 1
int2 = 2
sum = int1 + int2
puts sum
# 3

str1 = 'Hello, '
str2 = "world !"
greeting = str1 + str2
puts greeting
# Hello, world !
```

```ruby
# エラーが表示されます
# 暗黙的に整数を文字列に変換できないと怒られました...
greeting + sum
# TypeError (no implicit conversion of Integer into String)

sum + greeting
文字列を強制的に整数にはできないと怒られました...
# TypeError (String can't be coerced into Integer)
```

数字と文字列を連結させることはできないのでしょうか？
実は、数字を文字列に変換する方法がいくつかありますので例をあげます。

- 数値を文字列に変換して計算する

```ruby
age = 10.to_s # to_s は 値をstring型に変換してくれます。
greeting = 'I am ' + age + ' years old'
puts greeting
# I am 11 years old
```

- 文字列の中に式を展開させる

```ruby
age = 10
greeting = "I am #{age} years old"
puts greeting
# I am 11 years old
```

## ● 数値計算 Math
- 足し算、引き算、掛け算、割り算

```ruby
x = 5
y = 3

puts x+y
# 8
puts x-y
# 2
puts x*y
# 15
puts x/y
# 1
```

*小数点まで表示したい場合は注意が必要です。

```ruby
x=5.0
y=3
puts x/y
# 1.6666666666666667
```

*余りの数を取得したい場合は`%`を利用します

```ruby
x=9
y=5
puts x%y
# 4
```

- 指数
N乗したい場合

```ruby
x=2
y=3
puts x**b
# 2*2*2
# 2の3乗なので結果は 8
```

## ● 入力と出力 IO
