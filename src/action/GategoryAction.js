import * as types from '../constants/ActionType';
import callApi from '../network/apiCaller';

export const actFetchCategoryRequest = (id_shop) => {
    return (dispatch) => {
<<<<<<< HEAD
        return callApi('slide/15', 'GET', null).then(res => {
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