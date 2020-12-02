
リモートレポジトリ作成時にInitial commitした後、 local から push
```
リモートレポジトリを作成(Initial commitする)
git init
git add .
git ci -m ‘commit message’
git remote add origin [リモートリポジトリのURL]
```

// 最初にリモート レポジトリでInitial commitしてたら必要
```
git fetch --all
git merge --allow-unrelated-histories origin/master
コンフリクト修正する

git push (最初は git push -u origin master)

リモートレポジトリ作成時にInitial commitせず、  local から push
リモートレポジトリを作成(Initial commit せずに）
git init
git add .
git ci -m ‘commit message’
git remote add origin [リモートレポジトリのURL]
git push (最初は git push -u origin master)
```

cloneしてから local から  push
```
リモートレポジトリを作成
git clone リモートレポジトリのURL
ファイルに変更を加える
git add .
git commit -m ‘commit message’
git push (最初は git push -u origin master)

```