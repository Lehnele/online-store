import React, {useContext, useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CategoriesBar from "../components/CategoriesBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchCategories, fetchDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {IBrand, ICategory} from "../store/DeviceStore";


const Shop = observer(() => {
    const {deviceStore} = useContext(Context);

    useEffect(() => {
        fetchCategories().then(data => deviceStore.setCategories(data));
        fetchBrands().then(data => deviceStore.setBrands(data));
        fetchDevices(null, null, 1, 4).then(data => {
            deviceStore.setDevices(data.rows);
            deviceStore.setTotalCount(data.count);
        });
    }, [])

    useEffect(() => {
        fetchDevices(deviceStore.selectedCategory.id, deviceStore.selectedBrand.id, deviceStore.page, 4).then(data => {
            deviceStore.setDevices(data.rows);
            deviceStore.setTotalCount(data.count);
        });
    }, [deviceStore.page, deviceStore.selectedCategory, deviceStore.selectedBrand])

    const clearFilters = () => {
        deviceStore.setSelectedCategory({} as ICategory);
        deviceStore.setSelectedBrand({} as IBrand);
        fetchDevices(null, null, 1, 4).then(data => {
            deviceStore.setDevices(data.rows);
            deviceStore.setTotalCount(data.count);
        });
    }

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3} className='d-flex flex-column justify-content-between'>
                    <div>
                        <CategoriesBar/>
                        <Button
                            className='mt-3'
                            variant='outline-primary'
                            onClick={clearFilters}
                        >
                            Сбросить фильтры
                        </Button>
                    </div>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;