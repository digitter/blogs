console.log('1')

setTimeout(
  function() { console.log('2') },
  '3000'
);

console.log('3')


// つまり、JSで行う処理は非同期的な処理


// いいね => データ保存・削除 => 画面を再描画(redirect/renderも全体を再描画)
// いいね => データ保存・削除 => 部分的に画面描画(JSで通信をして、部分的な再描画)

// jsで通信 = remote: true
// jsで再描画 = DOMの操作
