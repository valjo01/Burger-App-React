import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// global constant-> capital letters
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.0
}


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // immutable update
        // new js object with states
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        // update price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + newPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {

    }

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    // pass methods
                    ingredientAdded={this.addIngredientHandler}
                    
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;