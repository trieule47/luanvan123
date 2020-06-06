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
<<<<<<< HEAD
            return { ...state, sanphamshop: action.sanphamshop}
        case types.GET_DS_SHOP:
            return { ...state, dsshop: action.dsshop}
        case types.GET_INFOR_SHOP:    
            return { ...state, inforShop :action.Shop, idLoading: action.isLoading}
        default: return { ...state};
=======
            return { ...state, sanphamshop: action.data }
        case types.ADD_PRODUCT:
            console.log('Thêm thành công ' + JSON.stringify(action.sanphamdathem))
            return { ...state }
        default: return { ...state };
>>>>>>> 9ffd8a9173bd77cba50dc3af4546b25c16a6129f
    }
}

export default myshop;