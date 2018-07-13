import * as actionTypes from '../actions/burgerBuilder';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const initalState = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false
}

const reducer = (state = initalState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    case actionTypes.ADD_INGREDIENT: {
      const oldCount = state.ingredients[action.ingredient];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...state.ingredients,
      }
      updatedIngredients[action.ingredient] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[action.ingredient];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: updatePurchaseState(updatedIngredients)
      }
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const oldCount = state.ingredients[action.ingredient];
      if (oldCount <= 0) {
        return state;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...state.ingredients,
      }
      updatedIngredients[action.ingredient] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[action.ingredient];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: updatePurchaseState(updatedIngredients)
      }
    }
    default:
      return state;
  }
}

const updatePurchaseState = (ingredients) => {
  const sum = Object.keys(ingredients)
    .map(igKey => ingredients[igKey])
    .reduce((sum, el) => sum + el, 0)

  return sum > 0;
}

export default reducer;