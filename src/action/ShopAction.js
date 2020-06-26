import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

//================== Đăng kí mở shop =================================
export const actShopSignUpRequest = (info, token) => {
  return (dispatch) => {
    callApi("dkshop", "POST", info, token).then((res) => {
      console.log("Đăng ký shop thành công: ", res.data);
      if (res.data.status == "error") {
        Alert.alert(
          "Thông báo thất bại!",
          "Tài khoản này đã được đăng ký shop ! vui lòng đăng nhập tài khoản khác để đăng ký"
        );
      } else {
        console.log("Đăng ký shop thành công: ", res.data);
        dispatch(actShopSignUp(info));
        RootNavigation.navigate("MyShop");
      }
    });
  };
};

export const actShopSignUp = (info) => {
  return {
    type: types.SHOP_SIGN_UP,
    info,
  };
};
//================== Lấy hết thông tin shop + sản phẩm =================================
export const actAllInfoShopRequest = (id_user, page, token) => {
  return (dispatch) => {
    callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
      if (res.data.status == "error") {
        //alert("Tài khoản chưa đăng kí mở shop");
        Alert.alert(
          "Tài khoản chưa đăng kí mở shop",
          "Bạn có muốn đăng ký mở shop !",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () =>   RootNavigation.navigate("DangKyShop") }
          ],
          { cancelable: false }
        );
      } else {
        dispatch(infor(res.data.shop));
        console.log("Thong tin shop1 : " + res.data.shop.id);
        const id_shop = res.data.shop.id;
        callApi(
          "xemspshop/" + id_shop ,
          "GET",
          null,
          null
        ).then((res) => {
          if (res.data.sanphamshop.total ==0 )  {
            //alert("Tài khoản chưa đăng sản phẩm nào");
            Alert.alert(
              "Tài khoản chưa đăng sản phẩm nào",
              "Bạn có muốn đăng sản phẩm !",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () =>  RootNavigation.navigate("AddProduct")}
              ],
              { cancelable: false }
            );
           
            console.log("Thong tin shop 2: " + JSON.stringify(res.data));
          } else {
            callApi("slide/" + id_shop, "GET", null).then((res) => {
              if (res.status == "error") {
                alert("Tài khoản chưa có slide");
              } else dispatch(actFetchBannerShop(res.data.slide));
            });
            dispatch(actShopGetProduct(res.data.sanphamshop.data));
          }
        });
      }
    });
  };
};

export const infor = (data) => {
  return {
    type: types.GET_INFOR_SHOP,
    data,
  };
};

export const actShopGetProduct = (data) => {
  return {
    type: types.GET_PRODUCT,
    data,
    isLoading: false,
  };
};
//====== lấy slide shop
export const getSlideShop = (id_shop) => {
  return (dispatch) => {
    callApi("slide/" + id_shop, "GET", null).then((res) => {
      if (res.data.status == "error") {
        RootNavigation.navigate("DangKyShop");
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



//================== Thêm Sản phẩm cho shop =================================
export const actAddProductRequest = (infor, id_shop, token) => {
  return (dispatch) => {
    return callApi("addpr", "POST", infor, token).then((res) => {
      if (res.data.status == "Thành công") {
        dispatch(actAddProduct(1));
        Alert.alert(
          "Thêm sản phẩm thành công",
          "Bạn có muốn quay lại shop!",
          [
            {
              text: "Cancel",
              onPress: () => RootNavigation.navigate("AddProduct"),
              style: "cancel"
            },
            { text: "OK", onPress: () =>  RootNavigation.navigate("SanPhamView")}
          ],
          { cancelable: false }
        );
       
      } else {
        Alert.alert("Thông báo ! ", "Thêm sản phẩm thất bại");
      }
    });
  };
};
export const actAddProduct = (rs_first_page) => {
  return {
    type: types.ADD_PRODUCT,
    rs_first_page,
  };
};



//================= Xóa sản phẩm shop ======================================
export const actDeleteProductRequest = (id_sanPham, id_shop, token) => {
  return (dispatch) => {
    return callApi("deletepr/" + id_sanPham, "DELETE", null, token).then(
      (res) => {
        if (res.data.status == "ok") {
          callApi(
            "xemspshop/" + id_shop + "?page=" + 1,
            "GET",
            null,
            null
          ).then((res) => {
            if (res.status == "error") {
              Alert.alert("Tài khoản chưa đăng sản phẩm nào");
            } else dispatch(actShopGetProduct(res.data.sanphamshop.data));
          });
          Alert.alert("Xóa sản phẩm thành công");
        } else {
          Alert.alert("Xóa sản phẩm thất bại");
        }
      }
    );
  };
};

// ================= lấy tt tất cả các shop==================
export const actGetDSShopRequest = () => {
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
//=========================== lấy tt sản phẩm theo loại sản phẩm============

export const actSPTheoLoaiRequest = (key, token) => {
  return (dispatch) => {
    return callApi("categorypr/" + key, "GET", null, token).then((res) => {
      if (res.data.status == "error") {
        Alert.alert("Thông báo ! ", "Lấy ds shop thất bại");
      } else {
        dispatch(actSPTheoLoai(res.data.sanphamdm));
      }
    });
  };
};

export const actSPTheoLoai = (sanpham) => {
  return {
    type: types.GET_SP_THEO_LOAI,
    sanpham,
  };
};

//===== LOAD MORE SAN PHAM SHOP

export const actLoadMoreShopRequest = (id_shop, page, token) => {
  return (dispatch) => {
    callApi("xemspshop/" + id_shop + "?page=" + page, "GET", null, token).then(
      (res) => {
        dispatch(actLoadMoreShop(res.data.sanphamshop.data));
      }
    );
  };
};
export const actLoadMoreShop = (item) => {
  return {
    type: types.LOAD_MORE_SP_SHOP,
    item,
  };
};

//============= lấy thông tin shop bàng id_user

export const actLoadInforShop = (id_user, page, token) => {
  return (dispatch) => {
    callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
      if (res.status == "error") {
        Alert.alert("Tài khoản chưa đăng kí mở shop");
      } else {
        dispatch(infor(res.data.shop));
      }
    });
  };
};
//============= lấy thông tin shop id shop

export const actGetTTShop = (id_shop) => {
  return (dispatch) => {
    callApi("ttshop/" + id_shop, "GET", null).then((res) => {
      if (res.data.status == "error") {
        Alert.alert("Không tồn tại shop");
      } else {
        const a = res.data.shop.tenshop;
        return dispatch(getinfor(res.data.shop));
      }
    });
  };
};
export const getinfor = (data) => {
  return {
    type: types.GET_INFOR_SHOP_CART,
    data,
  };
}; 
//=========lấy lo hàng==========
export const actGetLoHang = (id_shop,token) =>{
  return (dispatch) => {
    callApi("lohangs/" +id_shop , "GET", null, token).then((res) => {
      if (res.data.lohang.total == 0) {
        Alert.alert(
          "shop chưa có lô hàng nào",
          "Thêm lô hàng !",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () =>  RootNavigation.navigate("ThemLoHang") }
          ],
          { cancelable: false }
        );
      } else {
        return dispatch(getlohang(res.data.lohang.data));
      }
    });
  };
}
export const getlohang = (data) => {
  return {
    type: types.GET_LO_HANG,
    data,
  };
};


//======= thêm lô hàng=====

export const actAddLoHang = (lohang,token) =>{
  return (dispatch) => {
    callApi("addlohangs" , "POST", lohang, token).then((res) => {
      if (res.data.status == "ok") {
        Alert.alert(
          "Nhần ok để tới Thêm sản phẩm",
          "Thêm lô hàng thành công!",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () =>  RootNavigation.navigate("AddProduct") }
          ],
          { cancelable: false }
        );
      } else {
        alert('aaaa');
      }
    });
  };
}
//========= lấy loại sản phẩm========
export const actGetLoaiSP = () =>{
  return (dispatch) => {
    callApi("loaisanpham" , "GET", null,).then((res) => {
      console.log(res.data);
        return dispatch(getloai(res.data));
    });
  };
}
export const getloai = (data) => {
  return {
    type: types.GET_LOAI_SP,
    data,
  };
};

//========= lấy đơn vị tính========
export const actGetDonViTinh = () =>{
  return (dispatch) => {
    callApi("alldonvitinh" , "GET", null,).then((res) => {
      console.log(res.data);
        return dispatch(getDonViTinh(res.data));
    });
  };
}
export const getDonViTinh = (data) => {
  return {
    type: types.GET_DON_VI_TINH,
    data,
  };
};


//========= lấy nhà cung cấp========
export const actGetNhaCungCap = () =>{
  return (dispatch) => {
    callApi("nhacungcap" , "GET", null,).then((res) => {
      console.log(res.data);
        return dispatch(getNhaCC(res.data));
    });
  };
}
export const getNhaCC = (data) => {
  return {
    type: types.GET_NHA_CUNG_CAP,
    data,
  };
};
//==== lấy đơn hàng
export const actGetDonHang = (id,token) =>{
  return (dispatch) => {
    callApi("donhang/"+id, "GET", null,token).then((res) => {
      console.log(res.data);
        return dispatch(getDH(res.data.donhang));
    });
  };
}
export const getDH = (data) => {
  return {
    type: types.GET_DON_HANG,
    data,
  };
};
