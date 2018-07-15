import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
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
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchOrdersFail(error));
      });
  }
}

const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error
});

const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  id: id,
  orderData: orderData
});

const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      }).catch(error => dispatch(purchaseBurgerFail(error)));
  }
}

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});