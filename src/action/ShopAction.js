import * as types from "./../constants/ActionType";
import callApi from "../network/apiCaller";
import { Alert, AsyncStorage } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

//================== Đăng kí mở shop =================================
export const actShopSignUpRequest = (info, token) => {
<<<<<<< HEAD
  return (dispatch) => {
    callApi("dkshop", "POST", info, token).then((res) => {
      //console.log("res : ? " + res.data);
      if (res.data.status == "err") {
        //dispatch(actShopSignUp([], "error"));
        Alert.alert("Thông báo !", "Đăng ký shop ko thành công");
      } else {
        console.log("Đăng ký shop thành công: ", res.data);
        dispatch(actShopSignUp(info));
        RootNavigation.navigate("MyShop");
      }
    });
  };
=======
    return (dispatch) => {
        callApi("dkshop", "POST", info, token).then((res) => {
            //console.log("res : ? " + res.data);
            if (res.data.status == "err") {
                //dispatch(actShopSignUp([], "error"));
                Alert.alert("Thông báo !", "Đăng ký shop ko thành công");
            } else {
                console.log("Đăng ký shop thành công: ", res.data);
                dispatch(actShopSignUp(info));
                RootNavigation.navigate("MyShop");
            }
        });
    };
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
<<<<<<< HEAD
  return (dispatch) => {
    callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
      if (res.status == "error") {
        Alert.alert("Tài khoản chưa đăng kí mở shop");
      } else {
        dispatch(infor(res.data.shop));
       // console.log("Thong tin shop : " + res.data.shop);
        const id_shop = res.data.shop.id;
        callApi(
          "xemspshop/" + id_shop + "?page=" + page,
          "GET",
          null,
          null
        ).then((res) => {
          if (res.status == "error") {
            Alert.alert("Tài khoản chưa đăng sản phẩm nào");
          } else dispatch(actShopGetProduct(res.data.sanphamshop.data));
        });
        callApi("slide/" + id_shop, "GET", null).then((res) => {
          if (res.status == "error") {
            Alert.alert("Tài khoản chưa có slide");
          } else dispatch(actFetchBannerShop(res.data.slide));
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
//====== lấy slide shop
export const getSlideShop = (id_shop) => {
  return (dispatch) => {
    callApi("slide/" + id_shop, "GET", null).then((res) => {
      if (res.data.status == "error") {
        dispatch(actFetchBannerShop([]));
      } else dispatch(actFetchBannerShop(res.data.slide));
    });
  };
=======
    return (dispatch) => {
        callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
            if (res.status == "error") {
                Alert.alert("Tài khoản chưa đăng kí mở shop");
            } else {
                dispatch(infor(res.data.shop));
                // console.log("Thong tin shop : " + res.data.shop);
                const id_shop = res.data.shop.id;
                callApi(
                    "xemspshop/" + id_shop + "?page=" + page,
                    "GET",
                    null,
                    null
                ).then((res) => {
                    if (res.status == "error") {
                        Alert.alert("Tài khoản chưa đăng sản phẩm nào");
                    } else dispatch(actShopGetProduct(res.data.sanphamshop.data));
                });
                callApi("slide/" + id_shop, "GET", null).then((res) => {
                    if (res.status == "error") {
                        Alert.alert("Tài khoản chưa có slide");
                    } else dispatch(actFetchBannerShop(res.data.slide));
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
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
};
//====== lấy slide shop
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
<<<<<<< HEAD
  return {
    type: types.GET_SLIDE,
    item,
  };
=======
    return {
        type: types.GET_SLIDE,
        item,
    };
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
};

//================== Thêm Sản phẩm cho shop =================================
export const actAddProductRequest = (infor, id_shop, token) => {
<<<<<<< HEAD
  return (dispatch) => {
    return callApi("addpr", "POST", infor, token).then((res) => {
      if (res.data.status == "Thành công") {
        callApi("xemspshop/" + id_shop + "?page=1", "GET", null, token).then(
          (res) => {
            dispatch(actShopGetProduct(res.data.sanphamshop.data));
          }
        );
        Alert.alert("Thông báo ! ", "Thêm sản phẩm thành công");
      } else {
        Alert.alert("Thông báo ! ", "Thêm sản phẩm thất bại");
      }
    });
  };
};

//================= lấy tt tất cả các shop==================

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
=======
    return (dispatch) => {
        return callApi("addpr", "POST", infor, token).then((res) => {
            // if (res.data.status == "Thành công") {
            //   dispatch(actAddProduct(1));
            //   // callApi("xemspshop/" + id_shop, "GET", null, token).then(res => {
            //   //   dispatch(actShopGetProduct(res.data.sanphamshop.data));
            //   // })
            //   console.log(" ACT Sau khi them san pham : " + res.data.sanphamshop.data);
            // } else {
            //   Alert.alert("Thông báo ! ", "Thêm sản phẩm thất bại");
            // }
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
export const actDeleteProductRequest = (id_sanPham,id_shop, token) => {
    return (dispatch) => {
        return callApi("deletepr/" + id_sanPham, "DELETE", null, token)
            .then(res => {
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
                }
                else{
                    Alert.alert("Xóa sản phẩm thất bại");
                }
            })
    }
}

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
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570

//===== LOAD MORE SAN PHAM SHOP 

export const actLoadMoreShopRequest = (id_shop, page, token) => {
<<<<<<< HEAD
  return (dispatch) => {
      callApi("xemspshop/"+id_shop+ "?page="+ page, "GET", null, token).then((res) => {
          dispatch(actLoadMoreShop(res.data.sanphamshop.data));
      });
  }
}
export const actLoadMoreShop = (item) => {
  return {
      type : types.LOAD_MORE_SP_SHOP,
      item
  }
=======
    return (dispatch) => {
        callApi("xemspshop/" + id_shop + "?page=" + page, "GET", null, token).then((res) => {
            dispatch(actLoadMoreShop(res.data.sanphamshop.data));
        });
    }
}
export const actLoadMoreShop = (item) => {
    return {
        type: types.LOAD_MORE_SP_SHOP,
        item
    }
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
}

//============= lấy thông tin shop

export const actLoadInforShop = (id_shop, page, token) => {
<<<<<<< HEAD
  return (dispatch) => {
    callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
      if (res.status == "error") {
        Alert.alert("Tài khoản chưa đăng kí mở shop");
      } else {
        dispatch(infor(res.data.shop));
      }
    })
  }
=======
    return (dispatch) => {
        callApi("xemttshop/" + id_user, "GET", null, token).then((res) => {
            if (res.status == "error") {
                Alert.alert("Tài khoản chưa đăng kí mở shop");
            } else {
                dispatch(infor(res.data.shop));
            }
        })
    }
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
}
