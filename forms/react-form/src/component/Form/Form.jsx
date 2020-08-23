import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Form.css';

const Form = () => {
    const [formState, setFormState] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(false);
    const submitHandler = (event)=>{
        event.preventDefault();
        alert("submitted!");
        console.log(formState);
    };
    const selectConfig = {
        options: [
            {value: 'red', displayValue: 'Red'},
            {value: 'blue', displayValue: 'Blue'}
        ]};
    const inputChangedHandler = (event)=>{
        const newState = {
            ...formState,
            name: event.target.value
        };
        setFormState(newState);
    };

    let form = (
        <form onSubmit={submitHandler}>
            <Input elementType="input" label="Name" value={formState.name}
            changed={inputChangedHandler}></Input>
            <Input elementType="input" label="Age" value={formState.age}></Input>
            <Input elementType="select" value='blue' 
                elementConfig={selectConfig}></Input>
            <Button btnType="Success" disabled={btnDisabled} > Sign Up </Button>
        </form>
    );
    return (
        <div className="main">
                <h2 className="title">Sign Up Jelly's Form</h2>
                {form}
                <div>
                    <h4>Current form state </h4>
                {JSON.stringify(formState)}
                </div>
        </div>
    );
};

export default Form;