---
marp: true
header: "**Tech mesia**"
paginate: true
footer: "by kazuki tanida"
---
<!-- prerender: true -->

# 非同期処理って何？😑に5分で答える
そもそも同期とは、
コンピュータ関係ではプロセスなどといった複数のエージェントの動作について、
時系列的にタイミングを合わせる制御

---

### 今回は1~10まで数字を表示する
### 3つ表示したら3秒待つ

---

## 同期的な処理(Ruby)

Rubyなら上から順番に実行されていきます。
なのでターミナルで順番に表示されました。

---

```ruby
def show_num(num)
  num
end

def wait_three_second(num)
  sleep(3)
  puts num
end

puts show_num(1)
puts show_num(2)
puts show_num(3)
wait_three_second(4)
puts show_num(5)
puts show_num(6)
wait_three_second(7)
puts show_num(8)
puts show_num(9)
wait_three_second(10)

```

---

## 非同期的な処理(JavaScript)

JSは同期的ではありません。(非同期)
即座に全てのコードが実行されて、３秒後に 4,7,10が表示されました

---

```js
function showNum(num) {
  console.log(num)
}

function waitThreeSecond(num) {
  setTimeout(
    function() { console.log(num) },
    '3000'
  )
}

showNum('1')
showNum('2')
showNum('3')
waitThreeSecond('4')
showNum('5')
showNum('6')
waitThreeSecond('7')
showNum('8')
showNum('9')
waitThreeSecond('10')

```
---

JSは非同期的(asyncronous)な処理をする言語という事です。

---

## JSで同期的な処理をしたいときは

Promiseを利用しましょう。

---

```js
const showNum = (num) => console.log(num)

const stopThreeSecond = num => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(showNum(num)),
      3000
    )
  })
}

showNum('1')
showNum('2')
showNum('3')
stopThreeSecond('4')
  .then(() => showNum('5'))
  .then(() => showNum('6'))
  .then(() => stopThreeSecond('7'))
  .then(() => showNum('8'))
  .then(() => showNum('9'))
  .then(() => stopThreeSecond('10'))

```
