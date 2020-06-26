import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";


// ================= lấy thông tin tất cả các shop==================
export const GetDSShopRequest = () => {
    return (dispatch) => {
      return callApi("dsshop", "GET", null, null).then((res) => {
        if (res.data.shop != null) {
          dispatch(actGetDSShop(res.data.shop));
        } else {
          Alert.alert("Thông báo ! ", "Lấy ds shop thất bại");
        }
      });
    };
  };
  export const actGetDSShop = (dsshop) => {
    return {
      type: types.GET_DS_SHOP,
      dsshop,
    };
  };
  //==========get slide shop
  
  export const getSlideShop = (id_shop) => {
    return (dispatch) => {
      callApi("slide/" + id_shop, "GET", null).then((res) => {
        if (res.data.status == "error") {
          dispatch(actFetchBannerShop([]));
        } else dispatch(actFetchBannerShop(res.data.slide));
      });
    };
  };
  
  export const actFetchBannerShop = (item) => {
    return {
      type: types.GET_SLIDE,
      item,
    };
  };



  //=========xem sản phẩm shop
export const getDataShop = (id_shop, page) => {
    return (dispatch) => {
      callApi("xemspshop/" + id_shop + "?page=" + page, "GET", null).then(
        (res) => {
          //console.log("s SS:" + res.data.sanphamshop.data.length);
          dispatch(actShopGetProduct(res.data.sanphamshop.data));
        }
      );
    };
  };
  
  export const actShopGetProduct = (data) => {
    return {
      type: types.GET_PRODUCT,
      data,
      isLoading: false,
    };
  };


  
  //===== LOAD MORE SAN PHAM SHOP 

export const actLoadMoreRequest = (id_shop,page) => {
  return (dispatch) => {
      callApi("xemspshop/" + id_shop + "?page=" + page, "GET" , null ).then((res) => {
          dispatch(actLoadMore(res.data.sanphamshop.data));
      });
  }
}
export const actLoadMore = (item) => {
  return {
      type : types.LOAD_MORE_SP_SHOP,
      item
  }
}