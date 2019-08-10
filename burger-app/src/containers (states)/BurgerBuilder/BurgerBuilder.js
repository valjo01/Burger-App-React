import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

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
        purchasable: false,
        totalPrice: 4,
        purchasing: false,
        loading: false
    }

    // if > 1 ingredients order Btn. avaiable
    updatePurchaseState (ingredients) {
        // create Array
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})

        console.log("ingredients count:");
        console.log(ingredients);
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
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        // update purchasable state
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // check if there are ingredients
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        // immutable update
        // new js object with states
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        // update price
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        // update purchasable state
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    };

    purchaseContinueHandler = () => {
        alert('Thanks for your order!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Valentin',
                address: {
                street:  'Teststreet',
                zipCode: '34556',
                country: 'Germany'
            },
            email: 'test@test.com',
        },
            deliveryMethod: 'fastest'
        }
        
        axios.post('/orders.json', order)
            .then ( response => {
                this.setState({ loading : false, purchasing: false})
            })
            .catch(error => {
                this.setState({ loading : false, purchasing: false})
            });
            // .then(response => console.log(response))
            // .catch(error => console.log(error));
    };

    render () {
        // disable Btns
        // copy object from state
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        } // form: {salad: true, meat: false, ...}

        // spinner
        let orderSummary = <OrderSummary 
            // ingredients
            ingredients={this.state.ingredients}
            // purchaseCanceled Btn
            purchaseCanceled={this.purchaseCancelHandler}
            // purchaseContinue Btn
            purchaseContinue={this.purchaseContinueHandler}
            //price
            price={this.state.totalPrice}></OrderSummary>

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>

                    {/* Spinner */}
                    {orderSummary}                            
                </Modal>

                <Burger ingredients={this.state.ingredients}/>
                
                <BuildControls 
                    // pass methods
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    // price
                    price={this.state.totalPrice}
                    // purchasable
                    purchasable={this.state.purchasable}
                    // show modal
                    ordered={this.purchaseHandler}
                    
                />
                
            </Aux>
        );
    }
}

export default BurgerBuilder;