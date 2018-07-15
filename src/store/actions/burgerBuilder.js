import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient: ingredient
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient: ingredient
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const fetchIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-19d6c.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => dispatch(fetchIngredientsFailed()));
  }
}

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
})