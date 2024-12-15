// types
import { DefaultConfigProps } from 'src/types/config';
// ==============================|| THEME CONSTANT ||============================== //
export const KEY_CAPTCHA = '6LdpAAQnAAAAAFGkQBeGVSM3jdNYq7Bnf4i_ePrq';
export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/home';
export const HORIZONTAL_MAX_ITEM = 7;
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;

export enum MenuOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeDirection {
  LTR = 'ltr',
  RTL = 'rtl'
}

export enum NavActionType {
  FUNCTION = 'function',
  LINK = 'link'
}

// ==============================|| THEME CONFIG ||============================== //

const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.LIGHT,
  presetColor: 'default',
  themeDirection: ThemeDirection.LTR
};

export default config;