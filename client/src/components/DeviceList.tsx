import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {deviceStore} = useContext(Context);
    return (
        <Row className='d-flex'>
            {deviceStore.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    );
});

export default DeviceList;