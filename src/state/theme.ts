import { signal } from '@preact/signals-react';
import { getSetting, setSetting } from '../db/settings';
import { SettingKeys, type ThemeMode } from '../models/Settings';

export const theme = signal<ThemeMode>('light');

const apply = (mode: ThemeMode): void => {
  document.documentElement.dataset.theme = mode;
};

export const initTheme = async (): Promise<void> => {
  const saved = await getSetting<ThemeMode>(SettingKeys.Theme);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  theme.value = saved ?? (prefersDark ? 'dark' : 'light');
  apply(theme.value);
};

export const toggleTheme = (): void => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  apply(theme.value);
  void setSetting(SettingKeys.Theme, theme.value);
};
