import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }: RouteProps) {
    const location = useLocation();

    const isAuthenticated = !!window.localStorage.getItem("open_banking_token");


    return (
        <Route {...rest}>
            { isAuthenticated ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} /> }
        </Route>
    )
}

export default ProtectedRoute;