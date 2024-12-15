import { MenuOrientation, ThemeMode, ThemeDirection } from "../config";

export type FontFamily = `'Inter', sans-serif` | `'Poppins', sans-serif` | `'Roboto', sans-serif` | `'Public Sans', sans-serif`;
export type PresetColor = 'default' | 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6' | 'theme7' | 'theme8';
export type I18n = 'en' | 'fr' | 'ro' | 'zh'; // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese

// ==============================|| CONFIG TYPES ||============================== //

export type DefaultConfigProps = {
  fontFamily: FontFamily;
  i18n: I18n;
  menuOrientation: MenuOrientation;
  miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
};

/*export type DefaultStoredProps = {  
  i18n: I18n;
  miniDrawer: boolean;
};*/

export type CustomizationProps = {
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  menuOrientation: MenuOrientation;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  onChangeContainer: VoidFunction;
  onChangeLocalization: (lang: I18n) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (theme: PresetColor) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeThemeLayout: (direction: ThemeDirection, miniDrawer: boolean) => void;
  onChangeMenuOrientation: (menuOrientation: MenuOrientation) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
};
