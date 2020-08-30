import React from 'react';
import Button from '@material-ui/core/Button';
import './Item.css';

const Item = (props) => {
    return (
        <div className="Item">
            <label>{props.title}</label>
            <div className="del">
                <Button variant="contained" color="secondary" onClick={props.clicked.bind(null, props.id)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default Item;