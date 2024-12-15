import { IntlProvider } from 'react-intl';
import { AppRouter } from './router/AppRouter';
import ThemeCustomization  from 'src/themes/index';

export const App = () => {
  return (
    <ThemeCustomization>
      <IntlProvider locale="en">
        <AppRouter />
      </IntlProvider>
    </ThemeCustomization>
  );
};
