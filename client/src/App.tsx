import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {IUser} from "./store/UserStore";

const App = observer(() => {
    const {userStore} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(user => {
            userStore.setUser(user as IUser);
            userStore.setIsAuth(true);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <Spinner animation='grow'/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
