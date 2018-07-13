import * as ordersAction from '../actions/orders';

const intialState = {
  orders: []
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ordersAction.SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state;
  }
}

export default reducer;