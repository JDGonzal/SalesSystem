import { create } from 'zustand';
import { Light, Dark } from '../styles/themes';

interface ThemeState {
  theme: 'light' | 'dark';
  themesStyle: typeof Light | typeof Dark;
  setTheme: () => void;
}
export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  themesStyle: Light,
  setTheme: () => {
    const { theme } = get();
    set({ theme: theme === 'light' ? 'dark' : 'light' });
    set({ themesStyle: theme === 'light' ? Dark : Light });
  },
}));
