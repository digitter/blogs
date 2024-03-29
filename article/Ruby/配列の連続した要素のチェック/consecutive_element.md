# Ruby配列 連続した数字・同じ値・アルファベットのチェック

<!-- TOC -->

- [Ruby配列 連続した数字・同じ値・アルファベットのチェック](#ruby配列-連続した数字・同じ値・アルファベットのチェック)
  - [前提知識](#前提知識)
    - [Rangeから配列を作る](#rangeから配列を作る)
    - [each_cons(N) の挙動](#each_consn-の挙動)
    - [with_index の挙動](#with_index-の挙動)
  - [N個分連続した数字があるかどうか？](#n個分連続した数字があるかどうか)
  - [N個分連続した数字の要素番号を取得](#n個分連続した数字の要素番号を取得)
  - [N個分連続した同じ値の要素があるかどうか？](#n個分連続した同じ値の要素があるかどうか)
  - [N個分連続した同じ値の要素番号を取得](#n個分連続した同じ値の要素番号を取得)
  - [アルファベット順かどうか？](#アルファベット順かどうか)

<!-- /TOC -->

## 前提知識

### Rangeから配列を作る

```ruby
# 以下３つは全て [0, 1, 2, 3, 4, 5] になる。
[*0..5]

(0..5).to_a

Array(0..5)
```

### each_cons(N) の挙動

```ruby
# 重複ありで N 要素ずつに区切り、ブロックに渡してループする。
[0, 1, 2, 3, 4, 5].each_cons(3) {|e| p e }
# [0, 1, 2]
# [1, 2, 3]
# [2, 3, 4]
# [3, 4, 5]
```

### with_index の挙動

```ruby
# 要素にインデックスを添えて繰り返します
[0, 1, 2, 3, 4, 5].each_cons(3).with_index {|e, i| puts "#{e} #{i}"}
# [0, 1, 2] 0
# [1, 2, 3] 1
# [2, 3, 4] 2
# [3, 4, 5] 3
```

- 要素が並んでいるかどうか
- 要素の番号

実際にコードの例を書いてみました。

## N個分連続した数字があるかどうか？

```ruby
N = 2
array = [1, 3, 5, 7, 8, 9]
result = array.each_cons(N).any? do |a|
  a == (a[0]..a[0]+N-1).to_a
end

p result
```

```
# N = 2 の場合:『3, 4番目』、『4, 5番目』で２連続
# N = 3 の場合:『3, 4, 5番目』で３連続
true
```

## N個分連続した数字の要素番号を取得

```ruby
N = 2
array = [1, 3, 5, 7, 8, 9]
indices = []
array.each_cons(N).with_index do |a, i|
  indices << [*i..i+N-1] if a == [*a[0]..a[0]+N-1]
end

p indices
```

```
# N = 2 の場合:『3, 4番目』、『4, 5番目』で２連続
[[3, 4], [4, 5]]

# N = 3 の場合:『3, 4, 5番目』で３連続
[[3, 4, 5]]
```

## N個分連続した同じ値の要素があるかどうか？

```ruby
N = 2
array = [nil, 1, 2, nil, nil, nil]

result = array.each_cons(N).any? do |a|
  a.all? {|e| e.nil?}
end

p result
```

```
# N = 2 の場合:『3, 4番目』、『4, 5番目』で２連続
# N = 3 の場合:『3, 4, 5番目』で３連続

true
```

## N個分連続した同じ値の要素番号を取得

```ruby
N = 2
array = [nil, 1, 2, nil, nil, nil]

indices = []
array.each_cons(N).with_index do |a, i|
  indices << [*i..i+N-1] if a.all? {|e| e.nil?}
end

p indices
```

```
# N = 2 の場合:『3, 4番目』、『4, 5番目』で２連続
[[3, 4], [4, 5]]

# N = 3 の場合:『3, 4, 5番目』で３連続
[[3, 4, 5]]
```

## アルファベット順かどうか？

```ruby
chars0 = "abcdef".chars
# ["a", "b", "c", "d", "e"]
chars1 = "abcdef".chars
# ["a", "c", "d", "e"]

p chars0.each_cons(2).all? {|a, b| a.next == b}
# true
p chars1.each_cons(2).all? {|a, b| a.next == b}
# false
```
