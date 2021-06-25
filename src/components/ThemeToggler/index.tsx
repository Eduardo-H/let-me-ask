import Switch from 'react-switch';

type ThemeTogglerProps = {
  theme: string;
  toggleTheme: () => void;
}

export function ThemeToggler({ theme, toggleTheme }: ThemeTogglerProps) {
  return (
    <Switch
      onChange={toggleTheme}
      checked={theme === 'dark'}
      uncheckedIcon={false}
      checkedIcon={false}
      offColor="#494949"
      onColor="#494949"
      handleDiameter={20}
    />
  );
}