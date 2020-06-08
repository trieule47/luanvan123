import * as types from '../constants/ActionType';
import callApi from '../network/apiCaller';

export const actFetchTopProductsRequest = () => {
    return (dispatch) => {
        return callApi('toppr', 'GET', null).then(res => {
            dispatch(actFetchTopProducts(res.data.top))
        });
    };
}

export const actFetchTopProducts = (item) => {
    return {
        type : types.FETCH_TOP_PRODUCT,
        item
    }
}

export const actAllProductsRequest = (page=1) => {
    return (dispatch) => {
        return callApi('product?page=' + page , 'GET', null).then(res => {
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