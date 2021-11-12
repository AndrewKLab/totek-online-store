import React, { useContext } from "react";
import { Routes, Route, Link } from 'react-router-dom'
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
    function NoMatch() {
        return (
            <div>
                <h2>Nothing to see here!</h2>
                <p>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        );
    }
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
}

export default AppRouter;