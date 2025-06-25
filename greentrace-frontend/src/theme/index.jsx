import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default ThemeWrapper;