import React from 'react';
import {Modal, Button} from '@material-ui/core';
import './modal.css';
const DeleteConfirmModal = (props) => {
    return (
        <Modal
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        >
         <div className="modal-body">
            <h2 id="server-modal-title">Do you want to delete this item?</h2>
            <p>itemId: {props.item.id}</p>
            <div className = "modal-footer">
                <Button variant="contained" onClick={props.onCacnel}>Cacnel</Button>
                <Button variant="contained" color="primary" onClick={props.onConfirm.bind(null, props.item.id)}>
                Confirm
                </Button>
            </div>
        </div>
</Modal>
    );
};

export default DeleteConfirmModal;