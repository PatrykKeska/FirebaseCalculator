import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '../hooks/useDarkSide';

interface SwitcherProps {
  mobile?: boolean;
}

export default function Switcher({ mobile }: SwitcherProps) {
  const { colorTheme, setTheme } = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(darkSide ? 'light' : 'dark');
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        style={{
          marginLeft: `${mobile ? '3rem' : '2rem'}`,
          marginTop: '.25rem',
        }}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={30}
      />
    </>
  );
}
