import React from 'react';

import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {/* price label */}
        <p>current price: <strong>{props.price.toFixed(2)}</strong></p>

        {/* ingredient control panels */}
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                // disable 
                disabled={props.disabled[ctrl.type]} />
        ))}

        {/* checkout Btn */}
        <p>
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}>ORDER NOW</button>
        </p>
        
    </div>
);

export default buildControls;