import * as types from '../constants/ActionType';
import callApi from '../network/apiCaller';

export const actFetchCategoryRequest = (id_shop) => {
    return (dispatch) => {
        return callApi('slide', 'GET', null).then(res => {
            dispatch(actFetchCategory(res.data.slide));
        });
    };
}

export const actFetchCategory= (item) => {
    return {
        type : types.FETCH_CATEGORY,
        item
    }
}