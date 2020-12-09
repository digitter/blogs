# < 前提の整理 >
# 値渡し (call by value)」とは、変数の値をコピーする渡し方です。
# 「参照渡し (call by reference)」とは、変数のメモリ番地を渡す渡し方です、

# 1. Rubyの変数はオブジェクトの参照

x = 'hoge'
y = x

# p x.object_id
# p y.object_id
# 
# x = 'foo'
# 
# p x.object_id
# p y.object_id


# 2. 参照されているオブジェクト自身を変更すると、もう片方の変数も影響を受ける。
# SimbolやInteger を除くほとんどオブジェクト。

x = [1]
y = x

p x.object_id
p y.object_id 
p 1.object_id
p x[0].object_id # 整数1のオブジェクトID

 # 配列[1]を[2]に変更、配列の自身のアドレスは変わらない
x[0] = 100

p x.object_id 
p y.object_id

p x[0]
p y[0]

p x[0].object_id
p y[0].object_id

