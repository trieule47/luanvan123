import * as types from "../constants/ActionType";
import callApi from "../network/apiCaller";

export const actAddToCart = (product) => {
  var a=0;
  console.log("product : " + JSON.stringify(product));
  return (dispatch) => {
      callApi("ttshop/" + product.shop_id, "GET", null,).then((res) => {
          if (res.status == "error") {
              Alert.alert("Không tồn tại shop");
          } else {
            a= res.data.shop;
           // return dispatch(actAddToCartt(product,a));
          }
      })
      callApi("donvitinh/" + product.donvitinh_id, "GET", null).then((res) => {
        if (res.status == "error") {
            Alert.alert("Không tồn tại shop");
        } else {
          var b = res.data.donvitinh[0].donvitinh_ten;
          return dispatch(actAddToCartt(product,a,b));
        }
    })
  }
}
export const actAddToCartRequest = (product, token) => {
  product = { ...product, qty: 1 };
  //console.log("product qty: " + JSON.stringify(product.qty));

  return (dispatch) => {
    return callApi(
      "addcart?sanpham_id=" + product.id + "&soluong=" + product.qty,
      "POST",
      null,
      token
    ).then((res) => {
      //console.log(JSON.stringify(res.data.sl.items));
      dispatch(actAddToCart(product));
    });
    actAddToCart = item;
  };
};
export const Chiacard = (cart)=>{
  return{
    type:types.CHIA_CARD,
    cart,
  }
}

export const actAddToCartt = (item,shop,donvitinh) => {
  return {
    type: types.ADD_TO_CART,
    item,
    shop,
    donvitinh,
  };
};

export const actOrderRequest = (cart, id_user=null,hinhthucthanhtoan) => {
  if(id_user != null){
    var totals = [];
    for (var i = 0; i < cart.length; i++) {
      var total = 0;
      for (var j = 0; j< cart[i].length; j++)
      {
        total += cart[i][j].gia_tien * cart[i][j].qty;
      }
      totals[i]= total;
      console.log("data :" + i + " " +  JSON.stringify(totals[0]) );
    }

    const c = { cart: { sanpham: cart, id_user: id_user, total: totals, hinhthucthanhtoan: hinhthucthanhtoan} };
    //alert(JSON.stringify(c));
    console.log("ooooooooooo"+ JSON.stringify(c));
    return (dispatch) => {
      callApi("order", "POST", c).then((res) => {
        console.log("data :" + JSON.stringify(res.data));
            alert('Đặt hàng thành công !');
            return dispatch(actRemoveCart());
        //dispatch(actAddToCart(product));
      });
    };
  }else return {
    type: types.LOI,
  };
};
// remove from cart
export const actRemoveCart = () => {
  return {
    type: types.REMOVE_CART,
  };
}

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


