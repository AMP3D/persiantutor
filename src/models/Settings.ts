export type ThemeMode = 'dark' | 'light';

export interface UserSetting<T = unknown> {
  key: string;
  value: T;
}

export const SettingKeys = {
  DictVersion: 'dictVersion',
  LlmEnabled: 'llmEnabled',
  Theme: 'theme',
} as const;

export type SettingKey = (typeof SettingKeys)[keyof typeof SettingKeys];
