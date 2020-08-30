import React, { useState } from 'react';
import {Modal, Button, TextField} from '@material-ui/core';
import './addModal.css';
const AddItemModal = (props) => {
    const [item, setItem] = useState({});
    const inputOnChangeHandler = (event, identifier)=>{
        const newItem = {...item};
        newItem[identifier] = event.target.value;
        console.log('new value = '+ newItem[identifier]);
        setItem(newItem);
    }
    return (
        <Modal
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        >
         <div className="modal-body">
            <h2 id="server-modal-title">Please add your item:</h2>
            <label>Title:</label>
            <TextField id="outlined-basic"  size="small" variant="outlined" onChange={(event)=>inputOnChangeHandler(event, 'title')} />
            <label>Rating:</label>
            <TextField id="outlined-basic"  size="small" variant="outlined" onChange={(event)=>inputOnChangeHandler(event, 'rating')} />
            <div className = "modal-footer">
                <Button variant="contained" onClick={props.onCacnel}>Cacnel</Button>
                <Button variant="contained" color="primary" onClick={props.onConfirm.bind(null, item)}>
                Confirm
                </Button>
            </div>
        </div>
</Modal>
    );
};

export default AddItemModal;