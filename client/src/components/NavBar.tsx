import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {IDevice} from "../store/DeviceStore";
import {IUser} from "../store/UserStore";

const NavBar = observer(() => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        userStore.setUser({} as IUser);
        userStore.setIsAuth(false);
        userStore.setBasket([] as IDevice[])
        navigate(SHOP_ROUTE);
        localStorage.removeItem('token');
    }

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>BuyVay</NavLink>
                <Nav className='ms-auto' style={{color: 'white'}}>
                    {userStore.isAuth ?
                        <>
                            {userStore.isAdmin
                                ? <Button
                                    variant='outline-light'
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button>
                                : null
                            }
                            <Button
                                variant='primary'
                                className='ms-2'
                                onClick={() => navigate(BASKET_ROUTE)}
                            >
                                Корзина
                            </Button>
                            <Button
                                variant='outline-light'
                                className='ms-2'
                                onClick={logOut}
                            >
                                Выйти
                            </Button>
                        </>
                        :
                        <Button variant='outline-light' onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;