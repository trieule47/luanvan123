import * as types from "../constants/ActionType";
import callApi from "../network/apiCaller";

export const actAddToCartRequest = (product, token) => {
    product = { ...product,  qty: 1 };
    console.log("product qty: " + JSON.stringify(product.qty));

  return (dispatch) => {
    return callApi(
      "addcart?sanpham_id=" + product.id + "&soluong=" + product.qty,
      "POST",
      null,
      token
    ).then((res) => {
      
      console.log(JSON.stringify(res.data.sl.items));
      dispatch(actAddToCart(product));
    });
    actAddToCart = item;
  };
};

export const actAddToCart = (item) => {
  return {
    type: types.ADD_TO_CART,
    item,
  };
};

// remove from cart

export const actRemoveFromCartRequest = (product, token) => {
    product = { ...product,  qty: 1 };
    console.log("product qty: " + JSON.stringify(product.qty));

  return (dispatch) => {
    return callApi(
      "addcart?sanpham_id=" + product.id + "&soluong=" + product.qty,
      "POST",
      null,
      token
    ).then((res) => {
        
      console.log(JSON.stringify(res.data.sl.items));
      dispatch(actAddToCart(product));
    });
    actAddToCart = item;
  };
};
export const actRemoveFromCart = (item) => {
  return {
    type: types.REMOVE_FROM_CART,
    item,
  };
};

export const actUpQuantityCart = (item) => {
  return {
    type: types.UP_QUANTITY_CART,
    item,
  };
};

export const actDownQuantityCart = (item) => {
  return {
    type: types.DOWN_QUANTITY_CART,
    item,
  };
};
