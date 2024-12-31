import { IntlProvider } from 'react-intl';
import { AppRouter } from './router/AppRouter';
import ThemeCustomization from 'src/themes/index';
// import Notistack from 'src/components/third-party/Notistack';
import { SimpleSnackbarProvider } from 'src/components/SimpleSnackbarProvider';
export const App = () => {
  return (
    <ThemeCustomization>
      <SimpleSnackbarProvider>
        <IntlProvider locale="en">
          <AppRouter />
        </IntlProvider>
      </SimpleSnackbarProvider>
    </ThemeCustomization>
  );
};
