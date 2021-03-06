import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

// summary modal
const orderSummary = (props) => {
    // make Object to Array for list
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
         <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>

            <h3><p><strong>Total price: {props.price.toFixed(2)}</strong></p></h3>

            <p>Continue to Checkout?</p>

            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
            {/* <button>CANCEL</button>
            <button>CONTINUE</button> */}
        </Aux> 
    );
};
 
export default orderSummary;