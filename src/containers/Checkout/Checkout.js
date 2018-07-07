import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const updatedIngredients = {};
    for (let entry of query.entries()) {
      updatedIngredients[entry[0]] = +entry[1];
    }
    this.setState({
      ingredients: updatedIngredients
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let checkoutSummary = null;
    if (this.state.ingredients) {
      checkoutSummary =
        (
          <CheckoutSummary
            ingredients={this.state.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />);
    }
    return (
      <div>
        {checkoutSummary}
      </div>
    );
  }
}

export default Checkout;