import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {CreateProps} from "./CreateCategory";
import {Context} from "../../index";
import {IBrand, ICategory, IInfo} from "../../store/DeviceStore";
import {createDevice, fetchBrands, fetchCategories, fetchDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice: FC<CreateProps> = observer(({show, onHide}) => {
    const {deviceStore} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState<any>(null);//!!
    const [info, setInfo] = useState<IInfo[]>([]);

    const addInfo = (): void => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    }

    const removeInfo = (number: number): void => {
        setInfo(info.filter(i => i.id !== number));
    }

    const changeInfo = (key: string, value: string, id: number) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const selectFile = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        setFile(file);
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', `${deviceStore.selectedBrand.id}`);
        formData.append('typeId', `${deviceStore.selectedCategory.id}`);
        formData.append('info', JSON.stringify(info));
        try {
            createDevice(formData).then(onHide);
            clearModal();
        } catch (e: any) {
            alert(e.response.data.message);
        }

    }

    const clearModal = () => {
        setName('');
        setPrice(0);
        setFile(null)
        setInfo([]);
        deviceStore.setSelectedCategory({} as ICategory);
        deviceStore.setSelectedBrand({} as IBrand);
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
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <Dropdown className='mt-2 mb-2'>
                            <Dropdown.Toggle>{deviceStore.selectedCategory.name || 'Выберите категорию'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {deviceStore.categories.map(category =>
                                    <Dropdown.Item
                                        onClick={() => deviceStore.setSelectedCategory(category)}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='mt-2 mb-2'>
                            <Dropdown.Toggle>{deviceStore.selectedBrand.name || 'Выберите брэнд'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {deviceStore.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() => deviceStore.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название устройства'
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(+e.target.value)}
                        className='mt-3'
                        placeholder='Введите цену устройства'
                        type='number'
                    />
                    <Form.Control
                        onChange={selectFile}
                        className='mt-3'
                        placeholder='Выберите фото устройства'
                        type='file'
                    />
                    <hr/>
                    <Button
                        variant='outline-dark'
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className='mt-3' key={i.id}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.id)}
                                    placeholder='Введите название'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.id)}
                                    placeholder='Введите описание'
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.id)}
                                    variant='outline-primary'
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={() => {
                    onHide();
                    clearModal();
                }}>
                    Отмена
                </Button>
                <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;