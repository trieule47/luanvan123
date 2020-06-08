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