import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const updatedIngredients = {};
  //   let price = 0;
  //   for (let entry of query.entries()) {
  //     if (entry[0] === 'price') {
  //       price = +entry[1];
  //       continue;
  //     }
  //     updatedIngredients[entry[0]] = +entry[1];
  //   }
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: price
  //   });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    console.log(this.props);
    let checkoutSummary = null;
    if (this.props.ingredients) {
      checkoutSummary =
        (
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />);
    }
    return (
      <div>
        {checkoutSummary}
        <Route path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients
})

export default connect(mapStateToProps)(Checkout);