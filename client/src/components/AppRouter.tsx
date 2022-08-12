import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import Shop from "../pages/Shop";

const AppRouter = () => {
    const {userStore} = useContext(Context);
    return (
        <Routes>
            {userStore.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {userStore.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Shop/>}/>
        </Routes>
    );
};

export default AppRouter;