import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

export const actShopSignUpRequest = (info) => {
  return (dispatch) => {
    callApi("dkshop", "POST", info).then((res) => {
      console.log("res : ? " + res.data);
      if (res.data.status == "err") {
        dispatch(actShopSignUp([], "error"));
        Alert.alert("Thông báo !", "Đăng ký shop ko thành công");
      } else {
        console.log("Đăng ký shop thành công: ", res.data);
        dispatch(actShopSignUp(info));
        RootNavigation.navigate("MyShop");
      }
    });
  };
};

export const actShopSignUp = (info) => {
  console.log("Thông tin đã đăng ký shop: " + info);
  return {
    type: types.SHOP_SIGN_UP,
    info,
  };
};

export const actDSShopGetRequest = () => {
  return (dispatch) => {
    return callApi("dsshop", "GET", null).then((res) => {
      //   console.log("ds shop  "+JSON.stringify(res.data.shop))
      dispatch(sanphamshop(res.data.shop));
    });
  };
};
export const sanphamshop = (dsshop) => {
  return {
    type: types.GET_DS_SHOP,
    dsshop,
  };
};

export const actInforShopRequest = (u) => {
  return (dispatch) => {
    return callApi("dsshop", "GET", null).then((res) => {
      console.log("ds shop  "+JSON.stringify(res.data.shop))
      dispatch(inforshop(u, res.data.shop));
    });
  };
};

export const inforshop = (u, ds) => {
  const b = ds;
  console.log(" số hàng : " + b.length);
  for (var i = 0; i < b.length; i++) {
    //  console.log(ds[i].user_id + " : "+u.id);
    if (ds[i].user_id == u.id) {
      // console.log(ds[i].user_id + " : "+u.id);
      var Shop = ds[i];
       console.log(' myshop '+ JSON.stringify(ds[i]));
      i = b.length;
    }
  }
  return (dispatch) => {
    dispatch(actShopGetProductRequest(Shop.id));
    dispatch(infor(Shop));
  };
};

export const infor = (Shop) => {
  return {
    type: types.GET_INFOR_SHOP,
    Shop,
    isLoading: false,
  };
};

export const actShopGetProductRequest = (id) => {
    return (dispatch) => {
      return callApi("xemspshop/" + id, "GET", null).then((res) => {
        console.log("abc " + JSON.stringify(res.data.sanphamshop.data));
        dispatch(actShopGetProduct(res.data.sanphamshop.data));
      });
    };
  };

export const actShopGetProduct = (sanphamshop) => {
    console.log("sanpham: " + sanphamshop)
    return {
      type: types.GET_PRODUCT,
      sanphamshop,
    };
};

export const actAddProductRequest = (infor) => {
  return (dispatch) => {
    return callApi("addpr", "POST", infor).then((res) => {
      // console.log("thoong tin sanr phamar "+JSON.stringify(res.data.sanpham))
      dispatch(AddProduct(res.data.sanpham));
    });
  };
};
export const AddProduct = (data) => {
  return {
    type: types.ADD_PRODUCT,
    sanphamdathem: data,
  };
};
