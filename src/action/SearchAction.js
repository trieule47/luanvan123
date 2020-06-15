import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

//=========================== lấy tt sản phẩm theo loại sản phẩm============

export const actSPTheoLoaiRequest = (key, token) => {
    return (dispatch) => {
      return callApi("categorypr/"+key, "GET", null, token).then((res) => {
        if (res.data.status == "error") {
          Alert.alert("Thông báo ! ", "Lấy ds shop thất bại");
        } else {
          dispatch(actSPTheoLoaiShop(res.data.sanphamdm));
        }
      });
    };
  };
  
  export const actSPTheoLoaiShop = (sanpham) => {
      return {
        type: types.GET_SP_THEO_LOAI,
        sanpham,
      };
    };
  