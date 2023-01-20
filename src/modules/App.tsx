import { lazy } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import PublicRoute from 'components/PublicRoute';
import { UserProvider } from 'contexts/user';
import { Box, ThemeProvider } from '@mui/material';
import { useIsFetching, useIsMutating } from 'react-query';
import GlobalLoadingIndicator from 'components/GlobalLoadingIndicator';
import { SnackbarProvider } from 'contexts/snackbar';
import theme from '../theme';

const Home = lazy(() => import('./home/Home'));
const Login = lazy(() => import('./auth/Login'));
const TransactionsList = lazy(() => import('./transactions/TransactionsList'));
const Budgets = lazy(() => import('./budgets/Budgets'));

function App() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <Box>
      {(!!isFetching || !!isMutating) && <GlobalLoadingIndicator />}

      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <UserProvider>
            <Router>
              <Switch>
                <ProtectedRoute path="/" exact>
                  <Home />
                </ProtectedRoute>
                <PublicRoute path="/login" exact>
                  <Login />
                </PublicRoute>
                <ProtectedRoute path="/transactions" exact>
                  <TransactionsList />
                </ProtectedRoute>
                <ProtectedRoute path="/budgets" exact>
                  <Budgets />
                </ProtectedRoute>
              </Switch>
            </Router>
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
