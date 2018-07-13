import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/burgerBuilder';

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-19d6c.firebaseio.com/ingredients.json')
      .then(response => {
        // this.setState({ ingredients: response.data })
        this.props.onSetIngredients(response.data);
      })
      .catch(error => this.setState({ error: true }));
  }

  // updatePurchaseState = (ingredients) => {
  //   const sum = Object.keys(ingredients)
  //     .map(igKey => ingredients[igKey])
  //     .reduce((sum, el) => sum + el, 0)

  //   this.setState({
  //     purchasable: sum > 0
  //   })
  // }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    // let queryString = Object.keys(this.props.ingredients)
    //   .map(key =>
    //     `${encodeURIComponent(key)}=${encodeURIComponent(this.props.ingredients[key])}`)
    //   .join('&');
    // queryString += `&price=${this.props.totalPrice}`;
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: `?${queryString}`
    // });
    this.props.history.push('/checkout');
  }

  render() {
    console.log(this.props);

    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.props.purchasable}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice} />
        </Fragment>);


      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable
  })
};

const mapDispatchToProps = dispatch => ({
  onSetIngredients: (ingredients) => dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: ingredients }),
  onAddIngredient: (ingredient) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient: ingredient }),
  onRemoveIngredient: (ingredient) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient }),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));