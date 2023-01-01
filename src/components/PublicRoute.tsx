import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

function PublicRoute({ children, ...rest }: RouteProps) {
    const location = useLocation();

    const isAuthenticated = !!window.localStorage.getItem("open_banking_token");

    console.log(isAuthenticated);

    return (
        <Route {...rest}>
            { !isAuthenticated ? children : <Redirect to={{ pathname: "/", state: { from: location } }} /> }
        </Route>
    )
}

export default PublicRoute;