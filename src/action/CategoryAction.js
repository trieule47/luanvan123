import * as types from '../constants/ActionType';
import callApi from '../network/apiCaller';


export const actFetchCategoryRequest = (token) => {
    return (dispatch) => {
        return callApi('slide/15', 'GET', null,token).then(res => {
            dispatch(actFetchCategory(res.data.slide))
        });
    };
}
export const actFetchCategory= (item) => {
    return {
        type : types.FETCH_CATEGORY,
        item
    }
}


//======lấy all sp

export const actAllProductsRequest = () => {
    return (dispatch) => {
            callApi('product' , 'GET', null).then(res => {
            dispatch(actAllProducts(res.data.sanpham.data))
        });
    };
}

export const actAllProducts = (item) => {
    return {
        type : types.FETCH_ALL_PRODUCT,
        item
    }
}


//===== LOAD MORE SAN PHAM SHOP 

export const actLoadMoreRequest = (page) => {
    return (dispatch) => {
        callApi("product?page=" + page , "GET" , null ).then((res) => {
            dispatch(actLoadMore(res.data.sanpham.data));
        });
    }
  }
  export const actLoadMore = (item) => {
    return {
        type : types.LOAD_MORE_SP_SHOP,
        item
    }
  }