import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Sidebar from "../components/sidebar";
import routes from './routes';

function AppRouter() {
    return (
        <Router>
            <Sidebar>
                {
                    routes.map(route =>
                        <Route path={route.path} component={route.component} key={route.path} />
                    )
                }

                <Route path='/' render={() => (<Redirect to={routes[0].path} />)} />
            </Sidebar>
        </Router>
    );
}

export default AppRouter;