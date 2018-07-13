import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as ordersAction from '../../store/actions/orders';

class Orders extends Component {
  state = {
    // orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        console.log(fetchedOrders);
        this.props.onSetOrders(fetchedOrders)
        this.setState({
          loading: false,
          // orders: fetchedOrders
        })
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      });
  }

  render() {
    console.log(this.props);
    let orders = this.props.orders.map(order => (
      <Order key={order.id}
        ingredients={order.ingredients}
        price={order.price} />
    ))

    return (
      <div>
        {orders}
      </div>

    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  onSetOrders: (orders) => dispatch({ type: ordersAction.SET_ORDERS, orders: orders })
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));