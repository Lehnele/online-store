import React, {FC, useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {removeCategory} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

export interface removeProps {
    show: boolean,
    onHide: () => void
}

const RemoveCategory: FC<removeProps> = observer(({show,onHide}) => {
    const {deviceStore} = useContext(Context);
    const deleteCategory = (id: number) => {
        removeCategory(id).then(data => {
            deviceStore.setCategories(data);
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
                    Удалить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-wrap'>
                {deviceStore.categories.map(category =>
                    <Button
                        key={category.id}
                        className='m-3'
                        onClick={() => deleteCategory(category.id)}
                    >
                        {category.name}
                    </Button>
                )}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between align-items-center'>
                <div>Выберите категорию, которую требуется удалить.</div>
                <Button variant='outline-danger' onClick={() => onHide()}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveCategory;