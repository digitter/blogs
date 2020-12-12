---
marp: true
header: "**Tech mesia**"
paginate: true
footer: "by kazuki tanida"
---
<!-- prerender: true -->

# 非同期処理って何？😑に3分で答える
そもそも同期とは、
コンピュータ関係ではプロセスなどといった複数のエージェントの動作について、
時系列的にタイミングを合わせる制御

---

## 同期的な処理(Ruby)

Rubyなら上から順番に実行されていきます。
なのでターミナルで 1,2,3と順番に表示されました。
1 -> 2 を表示する前に3秒待っています。

```ruby
puts '1'

sleep(3)

def output_2
  puts '2'
end

output_2

puts '3'
```

---

## 非同期的な処理(JavaScript)

JSは同期的ではありません。(非同期)
即座に全てのコードが実行されて、
1, 3, 2と言う順番で表示されてしまいました。
1, 3 が表示され、その3秒後に2が表示されました。

```js
console.log('1')

setTimeout(
  function() { console.log('2') },
  '3000'
);

console.log('3')
```
---

これが非同期処理です。
