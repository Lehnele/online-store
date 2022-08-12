import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import RemoveBrand from "../components/modals/RemoveBrand";
import RemoveCategory from "../components/modals/RemoveCategory";
import RemoveDevice from "../components/modals/RemoveDevice";
import {fetchBrands, fetchCategories} from "../http/deviceAPI";
import {Context} from "../index";

const Admin = () => {
    const {deviceStore} = useContext(Context);
    const [createCategoryVisible, setCreateCategoryVisible] = useState(false);
    const [createBrandVisible, setCreateBrandVisible] = useState(false);
    const [createDeviceVisible, setCreateDeviceVisible] = useState(false);

    const [removeCategoryVisible, setRemoveCategoryVisible] = useState(false);
    const [removeBrandVisible, setRemoveBrandVisible] = useState(false);
    const [removeDeviceVisible, setRemoveDeviceVisible] = useState(false);

    useEffect(() => {
        fetchCategories().then(data => deviceStore.setCategories(data));
        fetchBrands().then(data => deviceStore.setBrands(data));
    }, [deviceStore.categories, deviceStore.brands, deviceStore.devices])

    return (
        <Container className='d-flex flex-column'>
            <h2>Добавление:</h2>
            <Button
                variant='outline-dark'
                className='mt-2 p-2'
                onClick={() => setCreateCategoryVisible(true)}
            >
                Добавить категорию
            </Button>
            <Button
                variant='outline-dark'
                className='mt-2 p-2'
                onClick={() => setCreateBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant='outline-dark'
                className='mt-2 p-2'
                onClick={() => setCreateDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateCategory show={createCategoryVisible} onHide={() => setCreateCategoryVisible(false)}/>
            <CreateBrand show={createBrandVisible} onHide={() => setCreateBrandVisible(false)}/>
            <CreateDevice show={createDeviceVisible} onHide={() => setCreateDeviceVisible(false)}/>
            <hr/>
            <h2>Удаление:</h2>
            <Button
                variant='outline-danger'
                className='mt-2 p-2'
                onClick={() => setRemoveCategoryVisible(true)}
            >
                Удалить категорию
            </Button>
            <Button
                variant='outline-danger'
                className='mt-2 p-2'
                onClick={() => setRemoveBrandVisible(true)}
            >
                Удалить бренд
            </Button>
            <Button
                variant='outline-danger'
                className='mt-2 p-2'
                onClick={() => setRemoveDeviceVisible(true)}
            >
                Удалить устройство
            </Button>

            <RemoveCategory show={removeCategoryVisible} onHide={() => setRemoveCategoryVisible(false)}/>
            <RemoveBrand show={removeBrandVisible} onHide={() => setRemoveBrandVisible(false)}/>
            <RemoveDevice show={removeDeviceVisible} onHide={() => setRemoveDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;