/**
 * デモ開発に必要な要件定義の型
 *
 * 目的: クライアントに見せる完璧なUIUXデモの作成
 *
 * このファイルで定義するもの:
 * 1. 画面定義 - どんな画面が必要か（レイアウト・コンポーネント配置含む）
 * 2. デザインシステム - 具体的なスタイル仕様
 * 3. データ構造 - モックデータ・表示ルール・サンプルデータ
 * 4. ワークフロー - ユーザーの操作フロー（成功演出・デモガイド含む）
 * 5. UI状態パターン - loading, empty, error の詳細表示
 * 6. マイクロインタラクション - ホバー・フォーカス・トランジション
 * 7. ナビゲーション構造 - サイドバー・ブレッドクラム・モバイル対応
 * 8. フォームパターン - レイアウト・バリデーション・自動保存
 * 9. 通知・フィードバック - トースト・確認ダイアログ
 * 10. エラー・バリデーション - エラー時の表示
 * 11. ロール定義 - ユーザー種別による画面出し分け
 * 12. データリレーション - エンティティ間の関係
 */

// ============================================
// 1. 画面定義（大幅拡張）
// ============================================

/** 画面レイアウトタイプ */
export type ScreenLayout =
  | 'dashboard'      // 統計・グラフ・カード配置
  | 'list'           // テーブル/リスト一覧
  | 'detail'         // 詳細表示
  | 'form'           // フォーム（サイドバー付き）
  | 'form-centered'  // フォーム（中央配置）
  | 'split'          // 左右分割
  | 'kanban'         // カンバンボード
  | 'calendar'       // カレンダービュー
  | 'settings'       // 設定ページ

/** 画面コンポーネント定義 */
export interface ScreenComponent {
  id: string
  type: 'table' | 'card' | 'form' | 'chart' | 'stats' | 'list' | 'tabs' | 'kanban' | 'calendar' | 'timeline'
  position: 'main' | 'sidebar' | 'header' | 'footer' | 'modal'
  title?: string

  // テーブル用
  columns?: TableColumn[]
  pagination?: 'infinite' | 'numbered' | 'load-more' | 'none'
  row_actions?: ('view' | 'edit' | 'delete' | 'duplicate')[]
  bulk_actions?: ('delete' | 'export' | 'archive')[]

  // フォーム用
  fields?: FormFieldSpec[]
  submit_label?: string

  // チャート用
  chart_type?: 'line' | 'bar' | 'pie' | 'donut' | 'area'

  // 統計カード用
  stats?: Array<{
    label: string
    value_source: string
    format?: 'number' | 'currency' | 'percent'
    trend?: boolean
  }>

  // データソース
  data_source?: string
}

/** テーブルカラム定義 */
export interface TableColumn {
  key: string
  label: string
  type: 'text' | 'badge' | 'date' | 'datetime' | 'number' | 'currency' | 'avatar' | 'link' | 'actions' | 'checkbox'
  width?: number | 'auto'
  sortable?: boolean
  filterable?: boolean

  // バッジ用カラーマッピング
  color_map?: Record<string, 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink'>

  // リンク用
  link_to?: string  // "/customers/{id}"

  // 数値フォーマット
  format?: string  // "¥{value:,}" など
}

/** フォームフィールド仕様 */
export interface FormFieldSpec {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'datetime' | 'time' | 'select' | 'multi-select' | 'textarea' | 'checkbox' | 'radio' | 'switch' | 'file' | 'image' | 'rich-text' | 'color' | 'slider'
  required?: boolean
  placeholder?: string
  helper_text?: string

  // 選択肢系
  options?: Array<{ value: string; label: string }>

  // バリデーション
  validation?: FieldValidation

  // 条件付き表示
  show_when?: {
    field: string
    equals: string | boolean | number
  }

  // 幅（グリッド）
  col_span?: 1 | 2 | 3 | 4

  // デモ用プリフィル値
  demo_value?: string | number | boolean
}

/** レスポンシブ設定 */
export interface ResponsiveConfig {
  mobile: {
    layout?: ScreenLayout
    hide_components?: string[]
    table_to_cards?: boolean
  }
  tablet?: {
    layout?: ScreenLayout
    compact_sidebar?: boolean
  }
}

/** 画面トランジション設定 */
export interface ScreenTransition {
  enter: 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale' | 'none'
  exit?: 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale' | 'none'
  duration?: 'fast' | 'normal' | 'slow'
}

/** 画面定義（拡張版） */
export interface DemoScreen {
  id: string
  name: string
  description: string
  priority: 'must' | 'should' | 'nice'
  mentioned_context?: string
  path: string

  // レイアウト・構造
  layout: ScreenLayout
  components: ScreenComponent[]

  // レスポンシブ
  responsive?: ResponsiveConfig

  // トランジション
  transitions?: ScreenTransition

  // ナビゲーション
  parent_screen?: string  // 親画面ID（階層構造用）
  breadcrumb_label?: string

  // UI状態
  states?: {
    loading?: UIStateConfig
    empty?: UIStateConfig
    error?: UIStateConfig
  }

  // アクセス制御
  allowed_roles?: string[]

  // ページアクション
  actions?: {
    primary?: { label: string; icon?: string; action: string }
    secondary?: Array<{ label: string; icon?: string; action: string }>
  }

  // SEO/メタ（デモ用）
  page_title?: string

  // 旧形式互換
  key_elements?: string[]
}

/** UI状態設定（拡張版） */
export interface UIStateConfig {
  type: 'spinner' | 'skeleton' | 'message' | 'illustration' | 'custom'
  message?: string
  show_action?: boolean
  action_label?: string
  action_behavior?: string

  // スケルトン詳細
  skeleton_config?: {
    rows?: number
    show_avatar?: boolean
    show_image?: boolean
    cell_widths?: (number | 'auto')[]
  }

  // イラスト
  illustration?: 'empty-box' | 'no-data' | 'no-results' | 'error' | 'success' | 'custom'
  illustration_url?: string
}

// ============================================
// 2. デザインシステム（大幅拡張）
// ============================================

/** タイポグラフィ設定 */
export interface TypographyConfig {
  font_family: {
    heading: string  // "Inter, Noto Sans JP, sans-serif"
    body: string
    mono?: string
  }
  font_sizes: {
    xs: string   // "12px"
    sm: string   // "14px"
    base: string // "16px"
    lg: string   // "18px"
    xl: string   // "20px"
    '2xl': string
    '3xl': string
  }
  font_weights: {
    normal: number  // 400
    medium: number  // 500
    semibold: number // 600
    bold: number    // 700
  }
  line_heights: {
    tight: number   // 1.25
    normal: number  // 1.5
    relaxed: number // 1.75
  }
}

/** スペーシング設定 */
export interface SpacingConfig {
  base_unit: number  // 4 (4px grid)
  section_gap: number // 24
  card_padding: number // 16
  form_gap: number    // 16
  inline_gap: number  // 8
}

/** 角丸設定 */
export interface BorderRadiusConfig {
  none: string    // "0"
  sm: string      // "4px"
  md: string      // "6px"
  lg: string      // "8px"
  xl: string      // "12px"
  '2xl': string   // "16px"
  full: string    // "9999px"

  // コンポーネント別
  button: string
  card: string
  input: string
  modal: string
  badge: string
  avatar: string
}

/** シャドウ設定 */
export interface ShadowConfig {
  style: 'none' | 'subtle' | 'medium' | 'elevated' | 'dramatic'

  // 具体的な値
  sm?: string
  md?: string
  lg?: string

  // コンポーネント別
  card?: string
  modal?: string
  dropdown?: string
  button_hover?: string
}

/** カラーシステム */
export interface ColorSystem {
  // ブランドカラー
  primary: string       // "#3B82F6"
  primary_light?: string
  primary_dark?: string

  secondary?: string
  accent?: string

  // セマンティックカラー
  success: string
  warning: string
  error: string
  info: string

  // ニュートラル
  background: string
  foreground: string
  muted: string
  border: string

  // ダークモード
  dark?: {
    background: string
    foreground: string
    muted: string
    border: string
  }
}

/** アイコン設定 */
export interface IconConfig {
  library: 'lucide' | 'heroicons' | 'phosphor' | 'tabler' | 'custom'
  style: 'outline' | 'solid' | 'duotone'
  default_size: number  // 20
  stroke_width?: number // 1.5 (outline用)
}

/** アニメーション設定 */
export interface AnimationConfig {
  style: 'none' | 'minimal' | 'smooth' | 'playful' | 'bouncy'

  durations: {
    fast: string    // "150ms"
    normal: string  // "200ms"
    slow: string    // "300ms"
  }

  easings: {
    default: string  // "ease-out"
    bounce?: string  // "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }

  // 特定アニメーション
  page_transition: boolean
  hover_effects: boolean
  loading_animations: boolean
  success_celebrations: boolean
}

/** デザイン設定（拡張版） */
export interface DesignPreferences {
  // 参考・方向性
  references: Array<{
    url?: string
    name: string
    like: string
  }>
  keywords: string[]
  avoid: string[]
  tone: 'professional' | 'casual' | 'playful' | 'minimal' | 'luxury' | 'tech' | 'unknown'

  // 具体的なシステム
  colors: ColorSystem
  typography?: TypographyConfig
  spacing?: SpacingConfig
  border_radius?: BorderRadiusConfig
  shadows?: ShadowConfig
  icons?: IconConfig
  animations?: AnimationConfig

  // ダークモード
  dark_mode: 'none' | 'toggle' | 'system' | 'always-dark'

  // 旧形式互換
  color_preferences?: {
    primary?: string
    likes?: string[]
    dislikes?: string[]
  }
}

// ============================================
// 3. データ構造（大幅拡張）
// ============================================

/** フィールドバリデーション */
export interface FieldValidation {
  min_length?: number
  max_length?: number
  min?: number
  max?: number
  pattern?: string
  pattern_description?: string
  custom_message?: string
}

/** フィールド表示設定 */
export interface FieldDisplayConfig {
  component: 'text' | 'badge' | 'avatar' | 'link' | 'date' | 'currency' | 'progress' | 'rating' | 'toggle' | 'image'

  // バッジ用
  color_map?: Record<string, string>

  // 日付用
  date_format?: string  // "YYYY/MM/DD"
  relative?: boolean    // "3日前"

  // 数値用
  format?: string       // "¥{value:,}"
  decimal_places?: number

  // 文字数制限
  truncate?: number

  // アバター用
  fallback?: 'initials' | 'icon' | 'placeholder'
}

/** データエンティティ（拡張版） */
export interface DataEntity {
  name: string
  japanese_name: string

  fields: Array<{
    name: string
    type: 'string' | 'number' | 'date' | 'datetime' | 'boolean' | 'enum' | 'relation' | 'json' | 'url' | 'email' | 'phone' | 'image' | 'file'
    japanese_name: string
    required: boolean
    enum_values?: string[]
    relation_to?: string
    validation?: FieldValidation

    // 表示設定
    display?: FieldDisplayConfig

    // デフォルト値
    default_value?: string | number | boolean

    // 自動生成
    auto_generate?: 'uuid' | 'increment' | 'timestamp' | 'none'

    // 検索対象
    searchable?: boolean

    // ソート可能
    sortable?: boolean
  }>

  // サンプルデータ
  sample_count: number
  sample_data?: Array<Record<string, unknown>>

  // 表示ルール
  display_rules?: {
    title_field: string        // 一覧で表示するタイトル
    subtitle_field?: string    // サブタイトル
    avatar_field?: string      // アバター画像
    description_field?: string
    badge_field?: string       // ステータスバッジ
  }

  // 検索・ソート設定
  search_fields?: string[]
  default_sort?: {
    field: string
    order: 'asc' | 'desc'
  }

  // フィルター設定
  filter_fields?: Array<{
    field: string
    type: 'select' | 'multi-select' | 'date-range' | 'number-range' | 'boolean'
    label: string
  }>
}

// ============================================
// 4. ワークフロー（大幅拡張）
// ============================================

/** ワークフローステップ（拡張版） */
export interface WorkflowStep {
  order: number
  screen: string
  action: string
  expected_result?: string

  // デモ用設定
  pre_filled?: Record<string, unknown>  // 自動入力値
  highlight_fields?: string[]           // 強調するフィールド
  wait_for?: 'click' | 'input' | 'validation_pass' | 'submit'

  // トランジション
  transition?: 'slide-left' | 'slide-right' | 'fade' | 'modal-open' | 'modal-close'

  // デモガイド
  guide_message?: string
  guide_position?: 'top' | 'bottom' | 'left' | 'right'
}

/** 成功時の演出 */
export interface SuccessBehavior {
  celebration?: 'none' | 'toast' | 'confetti' | 'checkmark' | 'modal'
  message: string
  duration_ms?: number
  redirect_to?: string      // "/customers/{id}"
  redirect_delay_ms?: number

  // 追加アクション
  show_next_action?: {
    label: string
    action: string
  }
}

/** エラーシナリオ */
export interface ErrorScenario {
  name: string
  trigger: string
  expected_behavior: string
  ui_feedback: string

  // 具体的な表示
  error_type?: 'validation' | 'permission' | 'not_found' | 'conflict' | 'server'
  recovery_action?: string
}

/** ユーザーワークフロー（拡張版） */
export interface UserWorkflow {
  id: string
  name: string
  trigger: string
  goal: string
  is_demo_scenario: boolean

  // ステップ
  steps: WorkflowStep[]

  // 成功時
  success_behavior: SuccessBehavior

  // エラーケース
  error_scenarios?: ErrorScenario[]

  // デモ用
  demo_data?: Record<string, unknown>  // デモ用のサンプルデータ
  estimated_duration_seconds?: number

  // 関連フロー
  related_workflows?: string[]  // 関連ワークフローID
}

// ============================================
// 5. UI状態パターン（大幅拡張）
// ============================================

/** ローディング詳細設定 */
export interface LoadingConfig {
  default: 'spinner' | 'skeleton' | 'shimmer' | 'pulse'

  // スケルトン形状
  skeleton_shapes?: {
    table_row?: { height: number; cells: (number | 'auto')[] }
    card?: { height: number; show_image: boolean; lines: number }
    list_item?: { height: number; show_avatar: boolean }
  }

  // ページ遷移
  page_transition: 'spinner' | 'progress-bar' | 'fade' | 'none'

  // フォーム送信
  form_submit: 'button-spinner' | 'button-text' | 'overlay' | 'disable-only'

  // デモ用遅延
  simulate_delay_ms?: number

  // 部分ローディング
  partial?: {
    header: 'instant' | 'skeleton' | 'cached'
    sidebar: 'instant' | 'skeleton' | 'cached'
    content: 'skeleton'
  }
}

/** 空状態詳細設定 */
export interface EmptyStateConfig {
  style: 'simple-message' | 'illustration' | 'card' | 'full-page'

  // イラスト
  illustration?: 'empty-box' | 'no-data' | 'no-results' | 'search' | 'custom'
  illustration_size?: 'sm' | 'md' | 'lg'

  // メッセージ
  default_message: string
  default_description?: string

  // CTA
  show_create_action: boolean
  create_action_label?: string
  create_action_style?: 'button' | 'link' | 'card'
}

/** エラー状態詳細設定 */
export interface ErrorStateConfig {
  style: 'toast' | 'inline' | 'banner' | 'page' | 'modal'
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'

  show_retry: boolean
  show_details: boolean
  auto_dismiss_ms?: number

  // エラータイプ別
  type_config?: {
    validation: { style: 'inline'; show_field_errors: boolean }
    network: { style: 'toast'; show_retry: boolean }
    server: { style: 'modal'; show_support_link: boolean }
  }
}

/** UI状態パターン（拡張版） */
export interface UIStatePatterns {
  loading: LoadingConfig
  empty: EmptyStateConfig
  error: ErrorStateConfig

  // 楽観的更新
  optimistic_updates: boolean

  // オフライン対応
  offline?: {
    show_indicator: boolean
    cache_strategy: 'none' | 'stale-while-revalidate' | 'cache-first'
  }
}

// ============================================
// 6. マイクロインタラクション（新規）
// ============================================

/** ホバー効果 */
export interface HoverEffect {
  scale?: number        // 1.02
  shadow?: boolean
  background?: string   // "muted"
  border?: string
  transition?: string
}

/** フォーカス効果 */
export interface FocusEffect {
  ring: boolean
  ring_color?: string
  ring_width?: number
  outline?: boolean
}

/** クリック効果 */
export interface ClickEffect {
  scale?: number        // 0.98
  ripple?: boolean
  haptic?: boolean      // モバイル用
}

/** マイクロインタラクション設定 */
export interface MicroInteractions {
  // ボタン
  button: {
    hover: HoverEffect
    focus: FocusEffect
    active: ClickEffect
    loading: 'spinner' | 'dots' | 'pulse'
  }

  // 入力フィールド
  input: {
    focus: FocusEffect
    error: 'shake' | 'red-border' | 'icon' | 'all'
    success: 'green-border' | 'checkmark' | 'none'
  }

  // リストアイテム
  list_item: {
    hover: HoverEffect
    selected: {
      background: string
      border_left?: boolean
      checkmark?: boolean
    }
  }

  // カード
  card: {
    hover: HoverEffect
    clickable: boolean
  }

  // リンク
  link: {
    hover: 'underline' | 'color' | 'both'
    visited_color?: string
  }

  // ページ遷移
  page_transition: {
    type: 'fade' | 'slide' | 'scale' | 'none'
    duration: 'fast' | 'normal' | 'slow'
  }

  // モーダル
  modal: {
    open: 'fade' | 'scale' | 'slide-up' | 'slide-down'
    close: 'fade' | 'scale' | 'slide-down'
    backdrop: 'blur' | 'dark' | 'none'
  }

  // ドロップダウン
  dropdown: {
    open: 'fade' | 'scale' | 'slide-down'
    item_hover: HoverEffect
  }

  // スクロール
  scroll?: {
    smooth: boolean
    reveal_animation: boolean  // スクロールで要素が現れる
  }
}

// ============================================
// 7. ナビゲーション構造（新規）
// ============================================

/** サイドバーアイテム */
export interface SidebarItem {
  id: string
  icon: string
  label: string
  path: string

  // バッジ
  badge?: {
    type: 'count' | 'dot' | 'new'
    source?: string  // "tasks.pending_count"
    color?: string
  }

  // サブメニュー
  children?: SidebarItem[]

  // 権限
  allowed_roles?: string[]

  // 外部リンク
  external?: boolean
}

/** ナビゲーション構造 */
export interface NavigationStructure {
  // サイドバー
  sidebar: {
    style: 'full' | 'compact' | 'icon-only' | 'collapsible'
    position: 'left' | 'right'
    width: number  // 240
    items: SidebarItem[]

    // フッター（設定・ログアウトなど）
    footer_items?: SidebarItem[]

    // ユーザー情報
    show_user_info: boolean
    user_info_position: 'top' | 'bottom'
  }

  // ヘッダー
  header?: {
    show: boolean
    height: number
    show_breadcrumb: boolean
    show_search: boolean
    show_notifications: boolean
    show_user_menu: boolean
  }

  // ブレッドクラム
  breadcrumb: {
    show: boolean
    include_home: boolean
    separator: '/' | '>' | '→' | 'chevron'
    max_items?: number
  }

  // モバイル
  mobile: {
    navigation_type: 'bottom-tabs' | 'hamburger' | 'drawer' | 'none'
    bottom_tabs?: Array<{
      icon: string
      label: string
      path: string
    }>
    show_back_button: boolean
  }

  // 戻るボタン
  back_button: {
    show: 'always' | 'when-nested' | 'never'
    style: 'icon' | 'text' | 'both'
  }
}

// ============================================
// 8. フォームパターン（新規）
// ============================================

/** フォームレイアウト設定 */
export interface FormLayout {
  style: 'single-column' | 'two-column' | 'three-column' | 'sectioned' | 'wizard'

  // ラベル
  label_position: 'above' | 'inline' | 'floating' | 'hidden'
  label_width?: number  // inline時の幅

  // 必須表示
  required_indicator: '*' | '(必須)' | 'red-asterisk' | 'badge' | 'none'

  // オプション表示
  optional_indicator?: '(任意)' | 'gray-text' | 'none'

  // セクション
  section_style?: 'card' | 'divider' | 'tabs' | 'accordion'
}

/** フォーム動作設定 */
export interface FormBehavior {
  // 自動保存
  autosave: {
    enabled: boolean
    debounce_ms: number
    indicator: 'subtle-text' | 'saving-badge' | 'none'
    success_message?: string
  }

  // バリデーション
  validation: {
    timing: 'on-blur' | 'on-change' | 'on-submit'
    show_success: boolean
    scroll_to_error: boolean
  }

  // 送信ボタン
  submit: {
    position: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'sticky-bottom' | 'inline'
    show_cancel: boolean
    confirm_unsaved: boolean
  }

  // リセット
  reset_on_success: boolean

  // キーボード
  keyboard: {
    enter_to_submit: boolean
    tab_order: 'natural' | 'custom'
  }
}

/** フォームパターン */
export interface FormPatterns {
  layout: FormLayout
  behavior: FormBehavior

  // マルチステップフォーム
  wizard?: {
    show_steps: boolean
    step_style: 'numbers' | 'progress-bar' | 'dots'
    allow_skip: boolean
    save_progress: boolean
  }

  // インライン編集
  inline_edit?: {
    enabled: boolean
    trigger: 'click' | 'double-click' | 'edit-button'
    save_on: 'blur' | 'enter' | 'button'
  }

  // ファイルアップロード
  file_upload?: {
    style: 'button' | 'dropzone' | 'inline'
    show_preview: boolean
    max_size_mb: number
    allowed_types: string[]
  }
}

// ============================================
// 9. 通知・フィードバック（新規）
// ============================================

/** トースト通知設定 */
export interface ToastConfig {
  position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  duration_ms: number
  max_visible: number
  stack_direction: 'up' | 'down'

  // タイプ別スタイル
  styles: {
    success: { icon: string; color: string }
    error: { icon: string; color: string; persistent?: boolean }
    warning: { icon: string; color: string }
    info: { icon: string; color: string }
  }

  // アクション
  show_close: boolean
  show_action?: boolean

  // アニメーション
  animation: 'slide' | 'fade' | 'scale'
}

/** 確認ダイアログ設定 */
export interface ConfirmDialogConfig {
  // 削除確認
  delete: {
    title: string         // "削除の確認"
    message: string       // "{item}を削除しますか？"
    confirm_label: string // "削除"
    confirm_style: 'danger' | 'primary'
    require_type_confirm?: boolean  // "削除"と入力させる
  }

  // 破棄確認
  discard: {
    title: string
    message: string
    confirm_label: string
    cancel_label: string
  }

  // カスタム
  custom?: Record<string, {
    title: string
    message: string
    confirm_label: string
    cancel_label?: string
    style?: 'danger' | 'warning' | 'primary'
  }>
}

/** 通知・フィードバック設定 */
export interface NotificationConfig {
  toast: ToastConfig
  confirm_dialogs: ConfirmDialogConfig

  // インライン通知
  inline?: {
    style: 'banner' | 'callout' | 'alert'
    dismissible: boolean
    icon: boolean
  }

  // プログレス表示
  progress?: {
    style: 'bar' | 'circular' | 'steps'
    show_percentage: boolean
    show_label: boolean
  }

  // ツールチップ
  tooltip?: {
    delay_ms: number
    position: 'top' | 'bottom' | 'left' | 'right' | 'auto'
    max_width: number
  }
}

// ============================================
// 10. エラー・バリデーションメッセージ
// ============================================

export interface ErrorMessages {
  validation: {
    required: string
    min_length: string
    max_length: string
    min: string
    max: string
    email: string
    url: string
    phone: string
    pattern: string
    match: string  // パスワード確認など
    unique: string // 重複チェック
    custom?: Record<string, string>
  }
  system: {
    network_error: string
    server_error: string
    not_found: string
    unauthorized: string
    forbidden: string
    timeout: string
    maintenance: string
  }
  success: {
    create: string
    update: string
    delete: string
    save: string
    send: string
    upload: string
    download: string
  }
  confirm: {
    delete: string
    discard: string
    logout: string
  }
}

// ============================================
// 11. ロール定義
// ============================================

export interface RoleDefinition {
  id: string
  name: string
  description: string
  permissions: string[]
  accessible_screens: string[]
  is_default?: boolean

  // UI差分
  ui_differences?: {
    hide_elements?: string[]      // 非表示にする要素ID
    disable_actions?: string[]    // 無効化するアクション
    show_readonly?: string[]      // 読み取り専用にするフィールド
  }

  // デモ用サンプルユーザー
  sample_user?: {
    name: string
    email: string
    avatar?: string
  }
}

// ============================================
// 12. データリレーション
// ============================================

export interface DataRelation {
  from: string
  to: string
  type: '1:1' | '1:N' | 'N:1' | 'N:M'
  foreign_key: string
  description?: string
  cascade_delete?: boolean

  // 表示設定
  display?: {
    inline: boolean           // インライン表示するか
    expandable: boolean       // 展開可能か
    link_to_detail: boolean   // 詳細へのリンク
    show_count: boolean       // 件数表示
  }

  // ロード設定
  loading?: 'eager' | 'lazy'
}

// ============================================
// デモ要件全体（統合インターフェース）
// ============================================

export interface DemoRequirements {
  // 基本情報
  project_name?: string
  version?: string

  // 1. 画面一覧
  screens: DemoScreen[]

  // 2. デザインシステム
  design: DesignPreferences

  // 3. データ構造
  entities: DataEntity[]

  // 4. ユーザーフロー
  workflows: UserWorkflow[]

  // 5. UI状態パターン
  ui_states?: UIStatePatterns

  // 6. マイクロインタラクション
  micro_interactions?: MicroInteractions

  // 7. ナビゲーション構造
  navigation?: NavigationStructure

  // 8. フォームパターン
  form_patterns?: FormPatterns

  // 9. 通知・フィードバック
  notifications?: NotificationConfig

  // 10. エラー・成功メッセージ
  messages?: ErrorMessages

  // 11. ロール定義
  roles?: RoleDefinition[]

  // 12. データリレーション
  relations?: DataRelation[]

  // その他の要件
  additional_requirements: string[]

  // 抽出メタデータ
  extracted_at: string
  confidence: 'high' | 'medium' | 'low'
  missing_info: string[]
}

// ============================================
// デフォルト値
// ============================================

export const DEFAULT_COLORS: ColorSystem = {
  primary: '#3B82F6',
  primary_light: '#60A5FA',
  primary_dark: '#2563EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  background: '#FFFFFF',
  foreground: '#0F172A',
  muted: '#F1F5F9',
  border: '#E2E8F0',
  dark: {
    background: '#0F172A',
    foreground: '#F8FAFC',
    muted: '#1E293B',
    border: '#334155',
  },
}

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  font_family: {
    heading: 'Inter, "Noto Sans JP", sans-serif',
    body: 'Inter, "Noto Sans JP", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  font_sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
  },
  font_weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  line_heights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}

export const DEFAULT_SPACING: SpacingConfig = {
  base_unit: 4,
  section_gap: 24,
  card_padding: 16,
  form_gap: 16,
  inline_gap: 8,
}

export const DEFAULT_BORDER_RADIUS: BorderRadiusConfig = {
  none: '0',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
  button: '8px',
  card: '12px',
  input: '6px',
  modal: '16px',
  badge: '9999px',
  avatar: '9999px',
}

export const DEFAULT_UI_STATE_PATTERNS: UIStatePatterns = {
  loading: {
    default: 'skeleton',
    page_transition: 'none',
    form_submit: 'button-spinner',
    simulate_delay_ms: 800,
  },
  empty: {
    style: 'illustration',
    illustration: 'empty-box',
    illustration_size: 'md',
    default_message: 'データがありません',
    show_create_action: true,
    create_action_label: '新規作成',
    create_action_style: 'button',
  },
  error: {
    style: 'toast',
    position: 'top-right',
    show_retry: true,
    show_details: false,
    auto_dismiss_ms: 5000,
  },
  optimistic_updates: true,
}

export const DEFAULT_MICRO_INTERACTIONS: MicroInteractions = {
  button: {
    hover: { scale: 1.02, shadow: true },
    focus: { ring: true, ring_width: 2 },
    active: { scale: 0.98 },
    loading: 'spinner',
  },
  input: {
    focus: { ring: true, ring_width: 2 },
    error: 'all',
    success: 'checkmark',
  },
  list_item: {
    hover: { background: 'muted' },
    selected: { background: 'primary/10', border_left: true },
  },
  card: {
    hover: { shadow: true },
    clickable: true,
  },
  link: {
    hover: 'underline',
  },
  page_transition: {
    type: 'fade',
    duration: 'fast',
  },
  modal: {
    open: 'scale',
    close: 'fade',
    backdrop: 'blur',
  },
  dropdown: {
    open: 'scale',
    item_hover: { background: 'muted' },
  },
}

export const DEFAULT_NAVIGATION: NavigationStructure = {
  sidebar: {
    style: 'full',
    position: 'left',
    width: 240,
    items: [],
    show_user_info: true,
    user_info_position: 'bottom',
  },
  header: {
    show: true,
    height: 64,
    show_breadcrumb: true,
    show_search: true,
    show_notifications: true,
    show_user_menu: true,
  },
  breadcrumb: {
    show: true,
    include_home: true,
    separator: 'chevron',
  },
  mobile: {
    navigation_type: 'hamburger',
    show_back_button: true,
  },
  back_button: {
    show: 'when-nested',
    style: 'icon',
  },
}

export const DEFAULT_FORM_PATTERNS: FormPatterns = {
  layout: {
    style: 'single-column',
    label_position: 'above',
    required_indicator: '*',
    optional_indicator: '(任意)',
  },
  behavior: {
    autosave: {
      enabled: false,
      debounce_ms: 1000,
      indicator: 'subtle-text',
    },
    validation: {
      timing: 'on-blur',
      show_success: true,
      scroll_to_error: true,
    },
    submit: {
      position: 'bottom-right',
      show_cancel: true,
      confirm_unsaved: true,
    },
    reset_on_success: false,
    keyboard: {
      enter_to_submit: false,
      tab_order: 'natural',
    },
  },
}

export const DEFAULT_NOTIFICATIONS: NotificationConfig = {
  toast: {
    position: 'top-right',
    duration_ms: 4000,
    max_visible: 3,
    stack_direction: 'down',
    styles: {
      success: { icon: 'check-circle', color: 'green' },
      error: { icon: 'x-circle', color: 'red', persistent: true },
      warning: { icon: 'alert-triangle', color: 'yellow' },
      info: { icon: 'info', color: 'blue' },
    },
    show_close: true,
    animation: 'slide',
  },
  confirm_dialogs: {
    delete: {
      title: '削除の確認',
      message: '{item}を削除してもよろしいですか？この操作は取り消せません。',
      confirm_label: '削除する',
      confirm_style: 'danger',
    },
    discard: {
      title: '変更を破棄しますか？',
      message: '保存されていない変更があります。破棄してもよろしいですか？',
      confirm_label: '破棄する',
      cancel_label: '編集を続ける',
    },
  },
  tooltip: {
    delay_ms: 500,
    position: 'auto',
    max_width: 200,
  },
}

export const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
  validation: {
    required: '{field}は必須です',
    min_length: '{field}は{min}文字以上で入力してください',
    max_length: '{field}は{max}文字以内で入力してください',
    min: '{field}は{min}以上で入力してください',
    max: '{field}は{max}以下で入力してください',
    email: '有効なメールアドレスを入力してください',
    url: '有効なURLを入力してください',
    phone: '有効な電話番号を入力してください',
    pattern: '正しい形式で入力してください',
    match: '{field}が一致しません',
    unique: 'この{field}は既に使用されています',
  },
  system: {
    network_error: '通信エラーが発生しました。ネットワーク接続を確認してください。',
    server_error: 'サーバーエラーが発生しました。しばらく経ってから再度お試しください。',
    not_found: 'お探しのデータが見つかりませんでした。',
    unauthorized: 'ログインが必要です。',
    forbidden: 'この操作を行う権限がありません。',
    timeout: 'リクエストがタイムアウトしました。再度お試しください。',
    maintenance: '現在メンテナンス中です。しばらくお待ちください。',
  },
  success: {
    create: '{item}を作成しました',
    update: '{item}を更新しました',
    delete: '{item}を削除しました',
    save: '保存しました',
    send: '送信しました',
    upload: 'アップロードが完了しました',
    download: 'ダウンロードを開始しました',
  },
  confirm: {
    delete: '{item}を削除してもよろしいですか？',
    discard: '変更を破棄してもよろしいですか？',
    logout: 'ログアウトしてもよろしいですか？',
  },
}

// ============================================
// 画面スペック（タスク生成用）- 後方互換
// ============================================

export interface ScreenSpec {
  id: string
  name: string
  path: string
  layout: 'dashboard' | 'list' | 'detail' | 'form' | 'form-centered' | 'split'

  components: Array<{
    type: 'card' | 'table' | 'form' | 'chart' | 'list' | 'stats' | 'tabs'
    title?: string
    fields?: Array<{
      name: string
      label: string
      type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox'
      required?: boolean
      placeholder?: string
      options?: string[]
      validation?: string
    }>
    columns?: Array<{
      key: string
      label: string
      type: 'text' | 'badge' | 'date' | 'number' | 'actions'
    }>
    data_source?: string
  }>

  actions?: {
    primary?: {
      label: string
      on_click: string
    }
    secondary?: Array<{
      label: string
      on_click: string
    }>
  }

  mock_behavior?: {
    on_submit?: 'add_to_list' | 'update_item' | 'show_toast'
    toast_message?: string
    redirect_to?: string
  }
}

export interface EnhancedTaskSpec {
  title: string
  type: 'setup' | 'component' | 'page' | 'hook' | 'style'
  priority: number
  screen_spec?: ScreenSpec
  hook_spec?: {
    name: string
    entity: string
    operations: ('list' | 'get' | 'add' | 'update' | 'delete')[]
  }
  component_spec?: {
    name: string
    props: Array<{
      name: string
      type: string
      required: boolean
    }>
    variants?: string[]
  }
}
