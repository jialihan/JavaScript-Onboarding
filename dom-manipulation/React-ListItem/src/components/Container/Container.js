import React, {useState} from 'react';
import styled from 'styled-components';
import './container.css';
import Button from '@material-ui/core/Button';
import Item from '../Item/Item';
import DeleteModal from '../Modal/DeleteConfirmModal';
import AddModal from '../Modal/AddItemModal';

const StyledContainer = styled.div`
    margin: 60px auto;
    border: 1px solid palevioletred;
    width: 40%;
`;
const buttonSytle = {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        textTransform: 'capitalize',
        marginBottom: '20px'
};


function Container (props) {
    const defautlItems = [{id: 1, title: "item 1"}, {id: 2, title: "item 2"}];
    const [items, setItems] = useState(defautlItems);
    const [delModalOpen, setDelModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const onAddItemHandler =()=> {
        setAddModalOpen(true);
    }
    const addItemHandler = (item)=>{
        const newItems = [...items, item];
        newItems['key'] = Math.random();
        setItems(newItems);
        setAddModalOpen(false);
    }
    const cancelAddModalHandler = ()=>{
        setAddModalOpen(false);
    }
    const onDeleteModalHandler = (item)=>{
        console.log('current clicked item:', item);
        setSelectedItem(item);
        setDelModalOpen(true);
    }
    const deleteItemHandler =(id)=>{
        console.log('currentId:',id);
        const newItems = items.filter(el=>{
            return el.id !== id;
        });
        setItems(newItems);
        setDelModalOpen(false);
        
    };
    const cancelDeleteModalHandler = ()=>{
        setDelModalOpen(false);
    }

    let list = items.map((el)=>{

        return <Item key={Math.random()} id={el.id} title={el.title} clicked={()=>onDeleteModalHandler(el)} />;
    });
    return (
        <StyledContainer>
            { addModalOpen && <AddModal onCacnel={cancelAddModalHandler} onConfirm={addItemHandler} /> }
            { delModalOpen && <DeleteModal item={selectedItem} onCacnel={cancelDeleteModalHandler} onConfirm={deleteItemHandler} /> }
            <h2>Please add your Items here!</h2>
            <Button style={buttonSytle} onClick={onAddItemHandler} >Add an Item</Button>
            {list}
        </StyledContainer>
    );
}

export default Container;