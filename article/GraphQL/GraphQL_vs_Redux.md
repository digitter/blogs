# React, Redux vs React, GraphQL with Apollo Client
|役割|Redux|GraphQL, Apollo client|
|---|---|---|
|リモート(のデータ取得/へ投稿)|HTTPリクエスト(色々)|HTTPリクエスト(POSTだけ)|
|データストア|Store|InMemoryCache|
|(ストアからの)データ読み込み|Action|readQuery, readFragment|
|(ストアからの)データ更新|Action|writeQuery, writeFragment, useMutationのupdate|
|(ストアからの)データ削除|Action|useMutationのupdate、fileterとかで除外|

---

### 更新、削除などmutation後にcacheを更新する場合
>この場合は、`useMutationのupdate`を利用するのが良い.
