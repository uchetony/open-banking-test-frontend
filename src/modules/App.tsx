import { lazy } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import PublicRoute from 'components/PublicRoute';
import { UserProvider } from 'contexts/user';

const Home = lazy(() => import('./home/Home'));
const Login = lazy(() => import('./auth/Login'));

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Switch>
            <ProtectedRoute path="/" exact>
              <Home />
            </ProtectedRoute>
            <PublicRoute path="/login">
              <Login />
            </PublicRoute>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
