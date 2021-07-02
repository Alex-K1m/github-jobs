import '@fontsource/kumbh-sans/300.css';
import '@fontsource/kumbh-sans/400.css';
import '@fontsource/kumbh-sans/700.css';

import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import { useLayoutEffect } from 'react';
import { JssProvider, ThemeProvider } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import reset from 'reset-jss';

import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';
import Home from './components/pages/Home';
import Position from './components/pages/Position';
import { useThemePreference } from './hooks';
import { switchTheme } from './store/ui/ui.slice';
import theme from './theme';
import { DARK } from './utils/constants/themes';

const globalStyles = {
  '@global': {
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },

    html: {
      boxSizing: 'border-box',
      fontSize: '62.5%',
    },

    body: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '1.6rem',
    },

    'button, input': {
      fontFamily: 'inherit',
    },

    '.sr-only': {
      border: 0,
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    },
  },
};

const jss = createJss(preset());
jss.createStyleSheet(reset).attach();
jss.createStyleSheet(globalStyles).attach();

const App = () => {
  const currentTheme = useSelector((state) => state.ui.theme);
  const isDarkThemePreferred = useThemePreference();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isDarkThemePreferred) dispatch(switchTheme(DARK));
  }, [isDarkThemePreferred, dispatch]);

  return (
    <JssProvider jss={jss}>
      <ThemeProvider theme={{ ...theme, colors: theme.colors[currentTheme] }}>
        <Router>
          <Wrapper>
            <Header />
            <Switch>
              <Route exact path='/:id'>
                <Position />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
          </Wrapper>
        </Router>
      </ThemeProvider>
    </JssProvider>
  );
};

export default App;
