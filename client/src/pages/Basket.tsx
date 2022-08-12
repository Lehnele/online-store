import React, {useContext} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import BasketItem from "../components/BasketItem";
import {IDevice} from "../store/DeviceStore";

const Basket = observer(() => {
    const {userStore} = useContext(Context);
    return (
        <Container className='d-flex'>
            <Col className='d-flex flex-column' style={{width: '65%'}}>
                {userStore.basket.map(device =>
                    <BasketItem key={device.id} device={device}/>
                )}
            </Col>
            <div className='flex-wrap m-3 shadow-lg bg-white rounded-4 d-flex flex-column justify-content-center align-items-center' style={{width: '35%', height: '40vh'}}>
                <div>Условия заказа</div>
                <div>Итого: {userStore.basket.map(item => item.price).reduce((prev, curr) => prev + curr, 0)} р.</div>
                <div>
                    <Button
                        variant='outline-success'
                        onClick={() => {}}
                    >
                        Оформить заказ
                    </Button>
                    <Button
                        onClick={() => userStore.setBasket([] as IDevice[])}
                    >
                        Очистить корзину
                    </Button>
                </div>

            </div>
        </Container>
    );
});

export default Basket;