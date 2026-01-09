/**
 * デモ要件定義のデフォルト値
 *
 * 会話から抽出できなかった項目に使用するデフォルト値
 * これにより、AIが完璧なデモを自律的に生成できる
 */

import type {
  ColorSystem,
  TypographyConfig,
  SpacingConfig,
  BorderRadiusConfig,
  UIStatePatterns,
  MicroInteractions,
  NavigationStructure,
  FormPatterns,
  NotificationConfig,
  ErrorMessages,
} from '../types/demo-requirements'

// カラーシステム
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

// タイポグラフィ
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

// スペーシング
export const DEFAULT_SPACING: SpacingConfig = {
  base_unit: 4,
  section_gap: 24,
  card_padding: 16,
  form_gap: 16,
  inline_gap: 8,
}

// 角丸
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

// UI状態パターン
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

// マイクロインタラクション
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

// ナビゲーション構造
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

// フォームパターン
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

// 通知設定
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

// エラーメッセージ
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
