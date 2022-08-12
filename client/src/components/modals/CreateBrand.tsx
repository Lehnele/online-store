import React, {FC, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {CreateProps} from "./CreateCategory";
import {createBrand} from "../../http/deviceAPI";

const CreateBrand: FC<CreateProps> = ({show, onHide}) => {
    const [value, setValue] = useState('');

    const addBrand = () => {
        createBrand({name: value})
            .then(() => setValue(''))
        onHide();
        setValue('');
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
                    Добавить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Введите название типа'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={() => {
                    onHide();
                    setValue('');
                }}
                >
                    Отмена
                </Button>
                <Button variant='outline-success' onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;