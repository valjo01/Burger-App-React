import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // turn object into array

    // Array: String Bacon, String Meat...
    // code from User
    let transformedIngredients = Object.entries(props.ingredients)
    .map(([ingredient, count]) => 
        {
            return Array(count).fill(ingredient);
        })
        .flat()
        .map((ingredient, i) => {
            return <BurgerIngredient key={i+1} type={ingredient} />;
        });

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients.</p>
        }
        console.log(transformedIngredients);

    // const transformedIngredients = Object.keys( props.ingredients )
    //     .map( ingredientKey => {
    //         // Array with as many ingredients, as it takes
    //         return [...Array(props.ingredients[ingredientKey])].map((_, i)=> {
    //             <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;  
    //             console.log(<BurgerIngredient/);     
    //         });
    //     });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;