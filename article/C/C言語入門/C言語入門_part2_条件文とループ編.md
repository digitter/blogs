## 目次

<!-- TOC -->

- [目次](#目次)
- [関連リンク](#関連リンク)
- [関連リンク](#関連リンク-1)
- [if](#if)
- [比較演算子](#比較演算子)
- [三項演算子](#三項演算子)
- [switch](#switch)
- [論理演算子](#論理演算子)
- [while, do-while](#while-do-while)
  - [while](#while)
  - [do-while](#do-while)
  - [break, continue](#break-continue)
- [for](#for)

<!-- /TOC -->

---

## 関連リンク

[C言語入門リスト](https://heuristic-bartik-0f9dae.netlify.app/blog/c-list)

---

## 関連リンク

[C言語入門リスト](https://heuristic-bartik-0f9dae.netlify.app/blog/c-list)

---

条件文は true or false によって処理を続けるかどうかなどを決める。
ループでも条件が true or false になるかどうかで処理を続けるか止めるかを決めている。
ループの強制終了やスキップなどもある。🤔💭

## if

```c
#include <stdio.h>

int main() {
  int input;
  printf("1~3の数値を入力してください...");
  scanf("%d", &input);

  if (input == 1) {
    printf("1が入力されました。\n");
  }
  else if (input == 2) {
    printf("2が入力されました。\n");
  }
  else if (input == 3) {
    printf("3が入力されました。\n");
  }
  else {
    printf("Error!!!\n");
  }
}
```

scanf()は変換指定子とアドレスを指定するやつで、
第二引数の &... は変数のアドレスを求める演算子しているらしい。

変数、メモリ、アドレスの概念がないと理解できないですねこのへんは〜。

## 比較演算子
他の言語と同じ感じですね〜

> <, <=, >, >=, ==, !=

## 三項演算子

`条件 ? : ;` の三項演算子も使えるんですね〜

```c
#include <stdio.h>

int main() {
  int x;
  char *y; // 配列変数に対して = で値を設定することはできない。なのでcharのポインタを指定して宣言。
  // * がアドレスの実際の値を指し示しているっと。

  printf("1~10の数値を入力してください。\n");
  scanf("%d", &x);

  if (x > 10 || x < 1) {
    printf("Error !!!");
    return 1;
  }

  // 三項演算子
  y = (x % 2 == 0) ? "偶数です" : "奇数です";

  printf("%s", y);

  return 0;
}
```

## switch

switch分もある

```c
#include <stdio.h>

int main() {
  int num = 3;

  switch (num) {
    case 1:
      printf("1だよ！\n");
      break;
    case 2:
      printf("2だよ！\n");
      break;
    case 3:
      printf("3だよ！\n");
      break;
    default:
      printf("1~3じゃないです---😬\n");
  }
}
```

## 論理演算子

&&, ||, !

AND OR NOT にあたるものがあります。

## while, do-while

### while

```c
#include <stdio.h>

int main() {
  int count = 1;

  while (count <= 10) {
    printf("カウント数: %d\n", count);
    count++;
  }

  return 0;
}
```

```
カウント数: 1
カウント数: 2
カウント数: 3
カウント数: 4
カウント数: 5
カウント数: 6
カウント数: 7
カウント数: 8
カウント数: 9
カウント数: 10
```

### do-while

さっきのwhileは条件チェックしてから処理を実行、

do whileは処理を実行してから条件チェックするってやつですね〜

```c
#include <stdio.h>

int main() {
  int count = 1;

  while (count <= 10) {
    printf("カウント数: %d\n", count);
    count++;
  }

  return 0;
}
```

### break, continue

- break: ループを終了させたい場合

```c
#include <stdio.h>

int main() {
  int count = 1;

  do {
    printf("カウント数: %d\n", count);

    if (count == 3) break;

    count++;
  } while (count < 10);

  return 0;
}
```

```
カウント数: 1
カウント数: 2
カウント数: 3
```

- continue: ループは続けたいが、現在の処理をスキップしたい場合

```c
#include <stdio.h>

int main() {
  int count = 1;

  do {
    printf("カウント数: %d\n", count);

    count++;

    if (count == 3) continue;

  } while (count < 10);

  return 0;
}
```

```
カウント数: 1
カウント数: 2
カウント数: 3
カウント数: 4
カウント数: 5
カウント数: 6
カウント数: 7
カウント数: 8
カウント数: 9
```

インクリメントしている行と、if文を逆にすると無限ループになるので気をつけましょ。。。

## for

```c
for (初期値; 条件; 初期値に対する処理) {
  処理;
}
```

```c
#include <stdio.h>

int main() {
  int num;
  int limit = 10;

  // 条件チェックでtrueなら -> printf -> インクリメント -> ...
  for (num = 0; num <= limit; num++) {
    printf("%d\n", num);
  }
}
```

```
0 1 2 3 4 5 6 7 8 9 10
```

ということで、条件、ループ共に他の言語でも同じ様な書き方ができるものばかりでした。
