import { lazy } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import PublicRoute from 'components/PublicRoute';
import { UserProvider } from 'contexts/user';
import { Box } from '@mui/material';
import { useIsFetching, useIsMutating } from 'react-query';
import GlobalLoadingIndicator from 'components/GlobalLoadingIndicator';
import { SnackbarProvider } from 'contexts/snackbar';

const Home = lazy(() => import('./home/Home'));
const Login = lazy(() => import('./auth/Login'));
const TransactionsList = lazy(() => import('./transactions/TransactionsList'));

function App() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <Box>
      {(!!isFetching || !!isMutating) && <GlobalLoadingIndicator />}

      <SnackbarProvider>
        <UserProvider>
          <Router>
            <Switch>
              <ProtectedRoute path="/" exact>
                <Home />
              </ProtectedRoute>
              <PublicRoute path="/login">
                <Login />
              </PublicRoute>
              <ProtectedRoute path="/transactions" exact>
                <TransactionsList />
              </ProtectedRoute>
            </Switch>
          </Router>
        </UserProvider>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
