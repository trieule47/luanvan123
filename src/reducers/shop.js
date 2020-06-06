import * as types from '../constants/ActionType';

const initialState = {
    inforShop: [],
    slide_shop: [],
    sanphamshop: [],
    thongbao: [],
};

const myshop = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOP_SIGN_UP:
            return { ...state, inforShop: action.info }
        case types.GET_INFOR_SHOP:
            return { ...state, inforShop: action.data, idLoading: action.isLoading }
        case types.GET_PRODUCT:
            return { ...state, sanphamshop: action.data}
        case types.GET_SLIDE:
            return  {...state, slide_shop : action.item}
        default: return { ...state};
    }
}

export default myshop;