import * as types from "../constants/ActionType";
import callApi from "../network/apiCaller";

<<<<<<< HEAD
// export const actAddToCartRequest = (product, token) => {
//   product = { ...product, qty: 1 };
//   console.log(product.id + "   " + product.sanpham_ten + " " + token);
//   const Data = { sanpham_id: product.id, soluong: qty };
//   return (dispatch) => {
//     return callApi("addcart", "POST", Data, token).then((res) => {
//       console.log(JSON.stringify(res.data));
//       dispatch(actAddToCart(Data));
//     });
//   };
// };

// export const actAddToCart = (item) => {
//   return {
//     type: types.ADD_TO_CART,
//     item,
//   };
// };

// // remove from cart

// export const actRemoveFromCartRequest = (product, token) => {
//   return (dispatch) => {
//     return callApi("deletecart?sanpham_id=4", "POST", null, token).then(
//       (res) => {
//         console.log(JSON.stringify(res.data));
//         //dispatch(actRemoveFromCart(product));
//       }
//     );
//     actAddToCart = item;
//   };
// };
// export const actRemoveFromCart = (item) => {
//   return {
//     type: types.REMOVE_FROM_CART,
//     item,
//   };
// };

// export const actUpQuantityCart = (item) => {
//   return {
//     type: types.UP_QUANTITY_CART,
//     item,
//   };
// };

// export const actDownQuantityCart = (item) => {
//   return {
//     type: types.DOWN_QUANTITY_CART,
//     item,
//   };
// };

// export const actGetCart = (token)=>{
//   return(dispatch)=>{
//     return callApi('getcart','GET', null ,token).then(
//       (res) => {
//         console.log("Giỏ hàng:  " + JSON.stringify(res.data.GioHang.items));
//       }
//     )
//   }
// }


export const actAddToCartRequest = (product, token) => {
  product = { ...product,  qty: 1 };
  console.log( product.id + "   " + product.sanpham_ten+ " "+ token );
return (dispatch) => {
  return callApi(
    "addcart?sanpham_id=2" + "&soluong=" + product.qty,
    "POST",
    null,
    token
  ).then((res) => {
    console.log(JSON.stringify(res.data));
    dispatch(actAddToCart(product));
  });
};
=======
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
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
};

export const actAddToCart = (item) => {
  return {
    type: types.ADD_TO_CART,
    item,
  };
};

// remove from cart

export const actRemoveFromCartRequest = (product, token) => {
<<<<<<< HEAD

  return (dispatch) => {
    return callApi(
      "deletecart?sanpham_id=4" ,
      "POST",
      null,
      token
    ).then((res) => {

      console.log(JSON.stringify(res.data));
      //dispatch(actRemoveFromCart(product));
=======
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
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
