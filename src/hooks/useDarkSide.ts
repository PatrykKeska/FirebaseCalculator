import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export default function useDarkSide() {
  const [theme, setTheme] = useState<Theme>(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return { colorTheme, setTheme };
}
