import React, {FC, useContext} from 'react';
import {Button, Card, Image, Row} from "react-bootstrap";
import {IDevice} from "../store/DeviceStore";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

interface BasketItemProps {
    device: IDevice
}

const BasketItem: FC<BasketItemProps> = observer(({device}) => {
    const {userStore} = useContext(Context);
    return (
        <div className='mt-3 mb-3 shadow-lg bg-white rounded-4 d-flex' style={{borderRadius: '25px', overflow: 'hidden'}}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
            <div className='text-black-50 mt-1 d-flex justify-content-evenly align-items-center flex-column flex-grow-1'>
                <h5>{device.name}</h5>
                <div>{device.price} р.</div>
                <div>
                    <Button
                        variant='outlined-dark'
                        onClick={() => userStore.removeFromBasket(device.id)}
                    >
                        Убрать из корзины
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default BasketItem;