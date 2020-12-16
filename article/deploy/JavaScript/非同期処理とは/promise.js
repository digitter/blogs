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
