import React, {FC, useContext, useEffect} from 'react';
import {Context} from "../../index";
import {fetchAllDevices, removeDevice} from "../../http/deviceAPI";
import {Button, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {removeProps} from "./RemoveCategory";

const RemoveDevice: FC<removeProps> = observer(({show,onHide}) => {
    const {deviceStore} = useContext(Context);
    const deleteDevice = (id: number) => {
        removeDevice(id).then(data => {
            deviceStore.setDevices(data);
        })
        onHide();
    }

    useEffect(() => {
        fetchAllDevices().then(data => {
            deviceStore.setDevices(data.rows);
            deviceStore.setTotalCount(data.count);
        });
    }, [])


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-wrap'>
                {deviceStore.devices.map(device =>
                    <Button
                        key={device.id}
                        className='m-3'
                        onClick={() => deleteDevice(device.id)}
                    >
                        {device.name}
                    </Button>
                )}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between align-items-center'>
                <div>Выберите устройство, которое требуется удалить.</div>
                <Button variant='outline-danger' onClick={() => onHide()}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveDevice;