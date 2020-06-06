import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";


//================== Đăng kí mở shop =================================
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
//================== Lấy hết thông tin shop + sản phẩm =================================
export const actAllInfoShopRequest = (id_user) => {
    return (dispatch) => {
        callApi("xemttshop/" + id_user, "GET", null).then((res) => {
            if(res.status == "error")
            {
                Alert.alert("Tài khoản chưa đăng kí mở shop");
            }
            else
            {
                dispatch(infor(res.data.shop));
                const id_shop = res.data.shop.id;
                console.log("Thong tin shop : " + res.data.shop);
                callApi("xemspshop/" + id_shop + "?page=1", "GET", null).then((res) => {
                    dispatch(actShopGetProduct(res.data.sanphamshop.data));
                });
                callApi('slide/' + id_shop, 'GET', null).then(res => {
                    dispatch(actFetchBannerShop(res.data.slide));
                });

            }
        });
        
    }
}

export const infor = (data) => {
    return {
        type: types.GET_INFOR_SHOP,
        data,
        isLoading: false,
    };
};

export const actShopGetProduct = (data) => {
    console.log("sanpham: " + data)
    return {
        type: types.GET_PRODUCT,
        data,
    };
};

export const actFetchBannerShop= (item) => {
    return {
        type : types.GET_SLIDE,
        item
    }
}
//================== Thêm Sản phẩm cho shop =================================
export const actAddProductRequest = (infor,id_user) => {
    return (dispatch) => {
      return callApi("addpr", "POST", infor).then(res => {
          if(res.data.status == 'Thành công'){
            callApi("xemspshopuser/"+ id_user + "?page=4", "GET", null).then(res => {
              dispatch(actShopGetProduct(res.data.spshopuser.data));
            });
            Alert.alert("Thông báo ! ","Thêm sản phẩm thành công");
          }else{
            Alert.alert("Thông báo ! ","Thêm sản phẩm thất bại");
          }
      })
    };
  };
