import * as types from '../constants/ActionType';
import callApi from '../network/apiCaller';

export const actFetchCategoryRequest = () => {
    return (dispatch) => {
        return callApi('slide', 'GET', null).then(res => {
            dispatch(actFetchCategory(res.data.top))
        });
    };
}

export const actFetchCategory= (item) => {
    return {
        type : types.FETCH_CATEGORY,
        item
    }
}