## 目次

<!-- TOC -->

- [目次](#目次)
- [関連リンク](#関連リンク)
- [関数とプロトタイプ宣言](#関数とプロトタイプ宣言)
  - [プロトタイプ宣言無しでコンパイルしてみる](#プロトタイプ宣言無しでコンパイルしてみる)
  - [プロトタイプ宣言有りでコンパイルしてみる](#プロトタイプ宣言有りでコンパイルしてみる)
- [関数 と static 変数](#関数-と-static-変数)
- [再帰関数](#再帰関数)

<!-- /TOC -->

---

## 関連リンク

[C言語入門リスト](https://heuristic-bartik-0f9dae.netlify.app/blog/c-list)

---

## 関数とプロトタイプ宣言

C言語の関数は、返す値のデータ型、受け取る引数のデータ型を指定して定義できるっと。
プロトタイプ宣言というもので、あらかじめその様な型を指定もできる。

```c
#include <stdio.h>

// square 関数のプロトタイプ宣言
int square (int parameter);

int main() {
  int x = 5, y;
  y = square(x);

  printf("%d の２乗は %d\n", x, y);
  return 0;
}

// square 関数定義
int square (int parameter) {
  int y;

  y = parameter * parameter;

  return y;
}
```

なんでプロトタイプ宣言があるのかというと、関数の呼び出しが正しく行われているかを確認するために宣言します。エラーが起こった時になんでエラーが起きてるか分かりやすく教えてくれたりします。

### プロトタイプ宣言無しでコンパイルしてみる
あえてsquareの引数を空にして、ちょっと実験してみましょか...

```c
#include <stdio.h>

// square 関数のプロトタイプ宣言無し
// int square (int parameter);

int main() {
  int x = 5, y;
  y = square(); // 引数無しで実行

  printf("%d の２乗は %d\n", x, y);
  return 0;
}

// square 関数定義
int square (int parameter) {
  int y;

  y = parameter * parameter;

  return y;
}
```

コンパイルすると警告文が出ました。

```
> Executing task: C/C++: gcc アクティブなファイルのビルド <

ビルドを開始しています...
/usr/bin/gcc -g /Users/kazuki/products/c_c++/sololearn/sample.c -o /Users/kazuki/products/c_c++/sololearn/sample
/Users/kazuki/products/c_c++/sololearn/sample.c:7:7: warning: implicit declaration of function 'square' is invalid in C99 [-Wimplicit-function-declaration]
  y = square();
      ^
1 warning generated.

ビルドが完了しましたが、警告が発生しました.

Terminal will be reused by tasks, press any key to close it.
```

コードを実行すると...

```
5 の２乗は 1
```

😵 ？！、！ 間違った値だと？！ ということになりかねません。。。

### プロトタイプ宣言有りでコンパイルしてみる

ちゃんとプロトタイプ宣言しておくとコンパイル時にエラーになり、どこが間違っているか教えてくれます！ 😆
以下のコードで再度コンパイルしてみましょう。

```c
#include <stdio.h>

// square 関数のプロトタイプ宣言
int square (int parameter);

int main() {
  int x = 5, y;
  y = square();

  printf("%d の２乗は %d\n", x, y);
  return 0;
}

// square 関数定義
int square (int parameter) {
  int y;

  y = parameter * parameter;

  return y;
}
```

```
> Executing task: C/C++: gcc アクティブなファイルのビルド <

ビルドを開始しています...
/usr/bin/gcc -g /Users/kazuki/products/c_c++/sololearn/sample.c -o /Users/kazuki/products/c_c++/sololearn/sample
/Users/kazuki/products/c_c++/sololearn/sample.c:7:14: error: too few arguments to function call, single argument 'parameter' was not specified
  y = square();
      ~~~~~~ ^
/Users/kazuki/products/c_c++/sololearn/sample.c:3:1: note: 'square' declared here
int square (int parameter);
^
1 error generated.

ビルドが完了しましたが、エラーが発生しました.
The terminal process failed to launch (exit code: -1).

Terminal will be reused by tasks, press any key to close it.
```

エラーは友達。型は親友。

> error: too few arguments to function call, single argument 'parameter' was not specified

## 関数 と static 変数

localスコープの変数であるけれど、値が保たれます。(グローバルの変数ではない。)
関数内で定義して、関数の処理が終了してもstatic変数の値が保たれます。

クロージャー的な性質があるのですね。

```c
#include <stdio.h>

int square (int parameter);

int main() {
  int x = 5, y;

  y = square(x);
  y = square(x);
  y = square(x);
  y = square(x);
  y = square(x);

  printf("%d の２乗は %d\n", x, y);
  return 0;
}

int square (int parameter) {
  static int count = 1;
  printf("%d回 square関数を呼びました。\n", count);
  int y;

  y = parameter * parameter;

  count++;
  return y;
}
```

## 再帰関数

ある関数内で同じ関数を呼びます。

Cに限らず、プログラミングをする上でよく利用されるアルゴリズムですね。

ある数の階乗を求める関数を定義してみました。

```c
int factorial_of(int num);

int main() {
  int num = 3;
  printf("%d の階乗は %d です", num, factorial_of(3));
}

int factorial_of(num) {
  if (num == 1) {
    return 1;
  }
  else {
    return num * factorial_of(num - 1);
  }
}
```
