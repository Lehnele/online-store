import React, {FC} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {IDevice} from '../store/DeviceStore';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

interface DeviceItemProps {
    device: IDevice
}

const DeviceItem: FC<DeviceItemProps> = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: "pointer"}} border='light'>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                    <div>{device.name}</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={'https://www.svgrepo.com/show/172818/star-outline.svg'}></Image>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;