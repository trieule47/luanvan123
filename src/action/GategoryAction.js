import * as types from '../constants/ActionType';
import callApi from '../network/apiCaller';

<<<<<<< HEAD
export const actFetchCategoryRequest = (token) => {
    return (dispatch) => {
        return callApi('slide/15', 'GET', null,token).then(res => {
=======
export const actFetchCategoryRequest = (id_shop) => {
    return (dispatch) => {
<<<<<<< HEAD
        return callApi('slide/15', 'GET', null).then(res => {
>>>>>>> 1187718ddc327cd636a5bc1bd24003bb4d97cf8a
            dispatch(actFetchCategory(res.data.slide))
=======
        return callApi('slide', 'GET', null).then(res => {
            dispatch(actFetchCategory(res.data.slide));
>>>>>>> hoang cap nhat
        });
    };
}

export const actFetchCategory= (item) => {
    return {
        type : types.FETCH_CATEGORY,
        item
    }
}