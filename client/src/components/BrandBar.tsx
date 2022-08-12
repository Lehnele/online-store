import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card} from "react-bootstrap";

const BrandBar = observer(() => {
    const {deviceStore} = useContext(Context);

    return (
        <div className='d-flex'>
            {deviceStore.brands.map(brand =>
                <Card
                    style={{cursor: 'pointer'}}
                    border={brand.id === deviceStore.selectedBrand.id ? 'primary' : 'light'}
                    onClick={() => deviceStore.setSelectedBrand(brand)}
                    key={brand.id}
                    className='p-3'
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;