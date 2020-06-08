import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";


//================== Đăng kí mở shop =================================
export const actShopSignUpRequest = (info,token) => {
    return (dispatch) => {
        callApi("dkshop", "POST", info,token).then((res) => {
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
export const actAllInfoShopRequest = (id_user, page, token) => {
    return (dispatch) => {
        callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
            console.log("ressss" + res);
            if(res.status == "error")
            {
                Alert.alert("Tài khoản chưa đăng kí mở shop");
            }
            else
            {
                dispatch(infor(res.data.shop));
                console.log("Thong tin shop : " + res.data.shop);
                const id_shop = res.data.shop.id;
                callApi("xemspshop/"+id_shop+ "?page="+ page, "GET", null, token).then((res) => {
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
       
    };
};

export const actShopGetProduct = (data) => {
    console.log("sanpham: " + data)
    return {
        type: types.GET_PRODUCT,
        data,
        isLoading: false,
    };
};

export const actFetchBannerShop= (item) => {
    return {
        type : types.GET_SLIDE,
        item
    }
}

//================== Thêm Sản phẩm cho shop =================================
export const actAddProductRequest = (infor,id_shop, token) => {
    return (dispatch) => {
      return callApi("addpr", "POST", infor, token).then(res => {
          if(res.data.status == 'Thành công'){
            callApi("xemspshop/"+ id_shop + "?page=1", "GET", null,token).then(res => {
              dispatch(actShopGetProduct(res.data.sanphamshop.data));
            });
            Alert.alert("Thông báo ! ","Thêm sản phẩm thành công");
          }else{
            Alert.alert("Thông báo ! ","Thêm sản phẩm thất bại");
          }
      })
    };
  };
// ================= lấy tt tất cả các shop==================
export const actGetDSShopRequest = () => {
    return (dispatch) => {
      return callApi("dsshop", "GET", null, null).then(res => {
        if(res.data.shop != null){
            dispatch(actGetDSShop(res.data.shop));
          }else{
            Alert.alert("Thông báo ! ","Lấy ds shop thất bại");
          }
      })
    };
};
export const actGetDSShop= (dsshop) => {
    return {
        type : types.GET_DS_SHOP,
        dsshop
    }
}
