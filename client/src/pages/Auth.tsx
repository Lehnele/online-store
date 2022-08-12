import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import AlertDismissible from "../components/AlertDismissible";

export interface IAlert {
    showAlert: boolean,
    variant: string,
    title: string,
    description: string
}

const Auth = observer(() => {
    const {userStore} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState({
        showAlert: false,
        variant: '',
        title: '',
        description: ''
    } as IAlert);

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            userStore.setUser(data);
            userStore.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e: any) {
            setAlert({showAlert: true, variant: 'danger', title: 'Ошибка', description: e.response.data.message});
        }
    }

    const closeAlert = () => {
        setAlert({
            showAlert: false,
            variant: '',
            title: '',
            description: ''
        })
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Логин...'
                        value={email}
                        onChange={event => setEmail((event.target as HTMLInputElement).value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Пароль...'
                        value={password}
                        onChange={event => setPassword((event.target as HTMLInputElement).value)}
                        type='password'
                    />
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        {isLogin ?
                            <div>
                                Нет аккаунта?&nbsp;
                                <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт?&nbsp;
                                <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-success'
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>
                </Form>
            </Card>
            {alert.showAlert
                ? <AlertDismissible
                    closeAlert={closeAlert}
                    variant={alert.variant}
                    title={alert.title}
                    description={alert.description}
                />
                : null
            }
        </Container>
    );
});

export default Auth;