# APIサーバー + GraphQL 認可のフロー

<!-- ### SignIn SignUp (認証) フロー

```plantuml
  actor user as user
  participant Client_Side as client
  participant GraphQL as gq
  participant APIサーバー as api
  database Database as db

  user -> client: 画面遷移(clientルーティング)
  client -> gq: 認証情報を含んだクエリ
  gq -> api: 処理してくださいな
  api -> db: user情報確認して~
  db -> api: 保存したよ〜
  api -> gq: 処理後のデータあげますよ
  gq -> client: データ貰ってきたよ
  note left: Set Cookie する
``` -->

### 認可後にデータ投稿するフロー

```plantuml
  actor user as user
  participant Client_Side as client
  participant GraphQL as gq
  participant APIサーバー as api
  database Database as db

  user -> client: 画面遷移(clientルーティング)
  client -> gq: Cookie情報を含んだリクエスト
  gq -> api: このデータ作ってあげてもろてOK？
  group 確認中
    api -> db: この人は会員？
    db -> api: そうだよ〜
    note right
      Cookieのデータを復号し

      ユーザーが存在するかを検索
    end note
  end
  api -> db: じゃ、投稿情報保存して~
  db -> api: 保存したよ〜
  api -> gq: 君はOK！作ったよ！
  gq -> client: データ貰ってきたよ！
  note left: Set Cookie する
```
