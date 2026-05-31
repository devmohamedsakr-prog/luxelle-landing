export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  current: Theme;
  isDark: boolean;
}
