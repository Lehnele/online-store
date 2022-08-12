import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceAPI";
import {IDevice} from "../store/DeviceStore";
import {DEVICE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {IAlert} from "./Auth";
import AlertDismissible from "../components/AlertDismissible";

const DevicePage = observer(() => {
    const [device, setDevice] = useState({} as IDevice);
    const {userStore} = useContext(Context);
    const {id}: any = useParams();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        showAlert: false,
        variant: '',
        title: '',
        description: ''
    } as IAlert);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [])

    const validateAddToBasket = () => {
        if (userStore.isAuth) {
            userStore.addToBasket(device);
        } else {
            setAlert({
                showAlert: true,
                variant: 'primary',
                title: 'Уведомление',
                description: 'Авторизуйтесь на сайте для доступа к корзине'
            });
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
        <Container className='mt-3'>
            <Button
                variant='outline-dark'
                style={{position: 'absolute', left: 0}}
                onClick={() => navigate(DEVICE_ROUTE)}
            >
                Назад
            </Button>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{
                                background: `url('https://www.svgrepo.com/show/172818/star-outline.svg') no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid grey'}}
                    >
                        <h3>{device.price} руб.</h3>
                        <Button
                            variant={userStore.basket.find(basketDevice => basketDevice.id === device.id) ? 'dark' : 'outline-dark'}
                            onClick={validateAddToBasket}
                            disabled={!!userStore.basket.find(basketDevice => basketDevice.id === device.id)}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device.info?.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgrey' : 'transparent'}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
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

export default DevicePage;