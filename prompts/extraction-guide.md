# デモ要件定義 抽出ガイド

このドキュメントは、ミーティング議事録からデモ要件定義を作成するためのClaude Codeガイドです。

## 概要

あなたは、クライアントとの打ち合わせ議事録から、完璧なデモアプリケーションを構築するための要件定義を作成するエキスパートです。

## 入力

- ミーティング議事録（テキスト形式）
- 対象案件の基本情報（案件名、クライアント名など）

## 出力

`demo-requirements-schema/types/demo-requirements.ts`の`DemoRequirements`型に準拠したJSONファイル。

## 抽出プロセス

### Step 1: 基本情報の抽出

議事録から以下を特定してください：

```
- project_name: プロジェクト/システム名
- version: "1.0.0"（初回の場合）
```

### Step 2: 画面（screens）の特定

会話の中で言及された画面を特定します。一般的なパターン：

| 言及パターン | 推定される画面 |
|-------------|---------------|
| 「一覧が見たい」「リストで」 | list画面 |
| 「詳細を見たい」「クリックしたら」 | detail画面 |
| 「登録したい」「入力フォーム」 | form画面 |
| 「ダッシュボード」「概要」「サマリー」 | dashboard画面 |
| 「設定」「管理」 | settings画面 |
| 「カレンダー」「スケジュール」 | calendar画面 |
| 「カンバン」「ボード」 | kanban画面 |

各画面に対して：
- id: ケバブケース（例: `customer-list`）
- name: 日本語名
- description: 何ができる画面か
- priority: "must" | "should" | "could"
- path: URLパス
- layout: 画面タイプ
- components: 画面に含まれるコンポーネント

### Step 3: エンティティ（entities）の特定

管理対象となるデータを特定します：

```typescript
{
  name: "Customer",           // 英語名（PascalCase）
  japanese_name: "顧客",      // 日本語名
  fields: [
    {
      name: "id",
      type: "string",
      japanese_name: "ID",
      required: true,
      auto_generate: "uuid"
    },
    // ...他のフィールド
  ],
  sample_count: 20,          // サンプルデータ数
  display_rules: {
    title_field: "name",     // タイトルとして表示するフィールド
    subtitle_field: "company",
    badge_field: "status"
  }
}
```

### Step 4: デザイン要件（design）の抽出

明示的な言及がなくても、以下から推測：

- 参照サービス: 「〇〇みたいな」「〇〇っぽい」
- キーワード: 「シンプル」「モダン」「かわいい」「かっこいい」
- 避けたいもの: 「ごちゃごちゃ」「派手」「地味」
- トーン: professional / friendly / playful / minimal

**デフォルト値を適用**: 明示的な指定がない場合は`defaults/index.ts`の値を使用。

### Step 5: ワークフロー（workflows）の作成

デモシナリオとなる操作フローを定義：

```typescript
{
  id: "wf-new-customer",
  name: "新規顧客登録",
  trigger: "新しい見込み客の情報を登録したい時",
  goal: "顧客データベースに新規顧客を追加する",
  is_demo_scenario: true,
  steps: [
    {
      order: 1,
      screen: "customer-list",
      action: "右上の「新規顧客」ボタンをクリック",
      expected_result: "顧客登録フォームに遷移",
      guide_message: "新規顧客ボタンをクリックしてください"
    },
    // ...続くステップ
  ],
  success_behavior: {
    celebration: "toast",
    message: "顧客を登録しました",
    redirect_to: "/customers"
  }
}
```

### Step 6: ナビゲーション（navigation）の構成

サイドバー、ヘッダー、パンくずリストの構成を定義。

### Step 7: ロール（roles）の定義

ユーザー権限が言及されている場合は定義。なければ基本の「管理者」「一般ユーザー」を設定。

### Step 8: リレーション（relations）の定義

エンティティ間の関係を定義。

## 推測と補完のルール

### 必ず補完すべき項目

以下は議事録に記載がなくても、必ず補完してください：

1. **loading状態** - skeleton表示をデフォルト
2. **empty状態** - イラスト付きの空状態
3. **error状態** - toast通知
4. **フォームバリデーション** - 必須項目チェック
5. **レスポンシブ対応** - モバイル表示の考慮
6. **ダークモード** - toggle対応

### 推測してよい項目

クライアントの業種・システム目的から合理的に推測：

- カラースキーム（業種に合わせた色）
- アイコン選定
- サンプルデータの内容
- ステータスのenum値

### 推測すべきでない項目（確認が必要）

- 金額・価格に関する表示形式
- 権限による機能制限の詳細
- 外部システム連携
- 特殊なビジネスロジック

## 品質チェックリスト

出力前に確認：

- [ ] 全てのscreenにunique idがある
- [ ] 全てのentityに最低限のCRUD画面がある
- [ ] path同士に重複がない
- [ ] relationのfrom/toが存在するentityを参照している
- [ ] workflowのstep.screenが存在する画面を参照している
- [ ] sample_dataがentityのfields定義と一致している
- [ ] 必須フィールドに全てrequired: trueが設定されている

## 出力形式

```json
{
  "project_name": "顧客管理システム",
  "version": "1.0.0",
  "screens": [...],
  "design": {...},
  "entities": [...],
  "workflows": [...],
  "navigation": {...},
  "roles": [...],
  "relations": [...],
  "additional_requirements": [],
  "extracted_at": "2024-01-01T00:00:00Z",
  "confidence": "high" | "medium" | "low",
  "missing_info": ["確認が必要な項目のリスト"]
}
```

## 参考資料

- 型定義: `demo-requirements-schema/types/demo-requirements.ts`
- デフォルト値: `demo-requirements-schema/defaults/index.ts`
- サンプル: `demo-requirements-schema/examples/crm-system.json`

## 重要な注意点

1. **完璧なデモ体験のために**: 不足情報は合理的に推測し、missing_infoに記録
2. **デフォルト値の活用**: 明示的な指定がない項目にはdefaultsを使用
3. **一貫性**: 同じ画面・エンティティへの参照は必ず同じIDを使用
4. **日本語**: name系フィールドは日本語で、id系フィールドは英語で
