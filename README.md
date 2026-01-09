# Demo Requirements Schema

**最強のデモ開発**のための共通ライブラリ。

どのプロジェクトからでも使える、デモアプリケーション自動生成のための要件定義スキーマです。

## 概要

このリポジトリは、クライアントミーティングの議事録から**完璧なデモアプリケーション**を生成するための全てを提供します：

- **型定義** - TypeScriptの厳密な型
- **デフォルト値** - 会話で触れられなかった項目の補完
- **抽出ガイド** - Claude Codeが要件を抽出するための詳細なプロンプト
- **サンプル** - 参考となる完全な要件定義例

## リポジトリ構造

```
demo-requirements-schema/
├── types/
│   └── demo-requirements.ts    # TypeScript型定義（1,400行以上の詳細な型）
├── defaults/
│   └── index.ts                # デフォルト値（全カテゴリ網羅）
├── examples/
│   └── crm-system.json         # CRMシステムの完全なサンプル
├── prompts/
│   └── extraction-guide.md     # Claude Code用の抽出ガイド
└── output/
    └── (生成された要件定義ファイル)
```

## セットアップ

### 1. リポジトリをクローン

```bash
cd ~/projects
git clone https://github.com/japagate/demo-requirements-schema.git
```

### 2. 環境変数を設定（オプション）

japagate_systems_admin側で、パスを環境変数で指定できます：

```env
DEMO_REQUIREMENTS_SCHEMA_PATH=~/projects/demo-requirements-schema
```

## 使い方

### Claude Codeでの要件定義作成

1. **管理システムから起動**: ミーティング分析画面の「要件定義を作成」ボタンをクリック
2. **Claude Codeが自動起動**: ターミナルでClaude Codeが起動
3. **要件定義が生成**: `output/` ディレクトリにJSONファイルが保存

### 手動での使用

```bash
cd ~/projects/demo-requirements-schema
claude

# プロンプト例
「prompts/extraction-guide.mdに従って、以下のミーティング議事録から要件定義を作成してください：

[議事録テキスト]
」
```

## 主要な型

### DemoRequirements（メイン型）

```typescript
interface DemoRequirements {
  project_name: string
  version: string
  screens: Screen[]              // 画面定義
  design: DesignRequirements     // デザイン要件
  entities: Entity[]             // データエンティティ
  workflows: Workflow[]          // ユーザーフロー
  navigation: NavigationStructure // ナビゲーション
  ui_states: UIStatePatterns     // ローディング・空状態・エラー
  form_patterns: FormPatterns    // フォームのパターン
  notifications: NotificationConfig // 通知設定
  roles: Role[]                  // ユーザーロール
  relations: EntityRelation[]    // エンティティ間の関係
  messages: ErrorMessages        // メッセージ定義
  // ... 他多数
}
```

### 詳細な型定義

- **Screen**: 画面のレイアウト、コンポーネント、アクション
- **Entity**: データ構造、フィールド、サンプルデータ
- **Workflow**: ユーザーフロー、ステップ、エラーケース
- **MicroInteractions**: ボタン・入力・カードのホバー・フォーカス・アクティブ状態
- **FormPatterns**: バリデーション、自動保存、ウィザード

## デフォルト値

`defaults/index.ts`には全カテゴリのデフォルト値が定義されています：

```typescript
// カラーシステム
export const DEFAULT_COLORS: ColorSystem = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  // ...
}

// マイクロインタラクション
export const DEFAULT_MICRO_INTERACTIONS: MicroInteractions = {
  button: { hover: { scale: 1.02, shadow: true }, ... },
  input: { focus: { ring: true }, ... },
  // ...
}

// ナビゲーション
export const DEFAULT_NAVIGATION: NavigationStructure = {
  sidebar: { style: 'full', position: 'left', width: 240, ... },
  header: { show: true, height: 64, ... },
  // ...
}
```

## 抽出ガイド

`prompts/extraction-guide.md`は、Claude Codeがミーティング議事録から要件を抽出するための詳細なガイドです：

- **Step 1**: 基本情報の抽出
- **Step 2**: 画面の特定（言及パターンからの推定）
- **Step 3**: エンティティの特定
- **Step 4**: デザイン要件の抽出
- **Step 5**: ワークフローの作成
- **Step 6-8**: ナビゲーション、ロール、リレーション

## サンプル

`examples/crm-system.json`は、顧客管理システムの完全な要件定義例です：

- 4つの画面（ダッシュボード、一覧、フォーム、詳細）
- 2つのエンティティ（Customer、Deal）
- デザイン要件（参考サービス、カラー、トーン）
- ワークフロー（新規顧客登録フロー）
- ナビゲーション構造
- 2つのロール（管理者、営業担当）

## 貢献

このリポジトリは継続的に改善されます：

- 新しいサンプルの追加
- 型定義の拡張
- 抽出ガイドの改善
- デフォルト値の調整

## ライセンス

MIT
