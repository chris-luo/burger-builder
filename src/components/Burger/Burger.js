import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .map(igKey => [...Array(props.ingredients[igKey])].map((_, i) =>
      <BurgerIngredient key={igKey + i} type={igKey} />
    ));
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;