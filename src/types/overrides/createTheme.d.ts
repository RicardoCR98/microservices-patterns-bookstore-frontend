// material-ui
// eslint-disable-next-line
import * as Theme from '@mui/material/styles';
import { CustomShadowProps } from '../theme';

// project import

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowProps;
  }
}
