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
