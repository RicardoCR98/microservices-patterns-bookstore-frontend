import { ReactNode, useMemo } from 'react';

// material-ui
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// project import
import { useConfig2} from 'src/hooks/useConfig';
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

// types
import { CustomShadowProps } from 'src/types/theme';

// types
type ThemeCustomizationProps = {
  children: ReactNode;
};

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { themeDirection, mode, presetColor, fontFamily } = useConfig2();

  const theme: Theme = useMemo<Theme>(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(() => Typography(fontFamily), [fontFamily]);

  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => CustomShadows(theme), [theme]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes = useMemo(() => {
    const createdTheme = createTheme(themeOptions);
    return {
      ...createdTheme,
      components: componentsOverride(createdTheme)
    };
  }, [themeOptions]);


  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
