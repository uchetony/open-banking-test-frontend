import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

function PublicRoute({ children, ...rest }: RouteProps) {
    const location = useLocation();

    const isAuthenticated = !!localStorage.getItem("open_banking_token");

    return (
        <Route {...rest}>
            { !isAuthenticated ? children : <Redirect to={{ pathname: "/", state: { from: location } }} /> }
        </Route>
    )
}

export default PublicRoute;