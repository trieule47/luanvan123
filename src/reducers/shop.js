import * as types from '../constants/ActionType';

const initialState = {
    inforShop: [],
    dsshop: [],
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
        case types.GET_DS_SHOP:
            return { ...state, dsshop: action.dsshop}
        default: return { ...state};
    }
}

export default myshop;