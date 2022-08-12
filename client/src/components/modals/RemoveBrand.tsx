import React, {FC, useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {removeProps} from "./RemoveCategory";
import {removeBrand} from "../../http/deviceAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const RemoveBrand: FC<removeProps> = observer(({show,onHide}) => {
    const {deviceStore} = useContext(Context);
    const deleteBrand = (id: number) => {
        removeBrand(id).then(data => {
            deviceStore.setBrands(data);
        })
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-wrap'>
                {deviceStore.brands.map(brand =>
                    <Button
                        key={brand.id}
                        className='m-3'
                        onClick={() => deleteBrand(brand.id)}
                    >
                        {brand.name}
                    </Button>
                )}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between align-items-center'>
                <div>Выберите брэнд, который требуется удалить.</div>
                <Button variant='outline-danger' onClick={() => onHide()}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveBrand;