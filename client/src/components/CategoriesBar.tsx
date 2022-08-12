import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const CategoriesBar = observer(() => {
    const {deviceStore} = useContext(Context);

    return (
        <ListGroup>
            {deviceStore.categories.map(category =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={category.id === deviceStore.selectedCategory.id}
                    onClick={() => deviceStore.setSelectedCategory(category)}
                    key={category.id}
                >
                    {category.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default CategoriesBar;