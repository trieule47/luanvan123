import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

//=========================== lấy tt sản phẩm theo loại sản phẩm============

export const actSPTheoLoaiRequest = (key, token) => {
    return (dispatch) => {
      return callApi("categorypr/"+key, "GET", null, token).then((res) => {
        if (res.data.status == "error") {
          Alert.alert("Thông báo ! ", "Lấy sản phẩm thất bại");
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


    
    //=============== tìm sản phẩm
    export const actTimSPRequest = (key) => {
      
      return (dispatch) => {
        return callApi("search", "POST", key).then((res) => {
          console.log(res.data.search);
          if (res.data.search.data<1) {
            Alert.alert("Thông báo ! ", "không tim thấy sản phẩm !");
          } else {
            dispatch(actTimSP(res.data.search.data));
          }
        });
      };
    };
  
    export const actTimSP = (sanpham) => {
        return {
          type: types.SEARCH_SP,
          sanpham,
        };
      };
    
  