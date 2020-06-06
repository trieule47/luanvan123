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
                console.log("Thong tin shop : " + res.shop);
                callApi("xemspshopuser/" + id_user, "GET", null).then((res) => {
                    dispatch(actShopGetProduct(res.data.spshopuser.data));
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

//================== Thêm Sản phẩm cho shop =================================
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