import React from 'react';
import   './style.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [ "InputElement" ];
    switch(props.elementType)
    {
        case 'input':
            inputElement= (<input 
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />);
            break;
        case 'select':
            inputElement = (
				<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
					<option value="" />
					{props.elementConfig.options.map((el) => (
						<option key={el.value} value={el.value}>
							{el.displayValue}
						</option>
					))}
				</select>
			);
            break;
        case 'textarea':
            inputElement = (
                    <textarea
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}
                    />
                );
                break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }
    return (
        <div className="Input" >
            <label className="Label">{props.label}</label>
            {
                inputElement
            }
        </div>
    );
};

export default Input;