import * as types from '../constants/ActionType';

const initialState = {
    inforShop: [],
    dsshop: [],
    sanphamshop: [],
    slide_shop: [],
    idLoading:[],
    fisrt_page: 1,
    last_page: 0,
    sanphamtheoloai: [],
};

const myshop = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOP_SIGN_UP:
            return { ...state, inforShop: action.info }
        case types.GET_INFOR_SHOP:
            return { ...state, inforShop: action.data }
        case types.GET_PRODUCT:
            return { ...state, sanphamshop: action.data , idLoading: action.isLoading, fisrt_page: 1}
        case types.GET_DS_SHOP:
            return { ...state, dsshop: action.dsshop }
        case types.GET_SLIDE:
            return  {...state, slide_shop : action.item }
        case types.GET_SP_THEO_LOAI:
            return  {...state, sanphamtheoloai : action.sanpham }
        case types.LOAD_MORE_SP_SHOP:
            var pageNew = state.fisrt_page + 1;
            var sanphamOld = state.sanphamshop;
            var sanphammoi = sanphamOld.concat(action.item);
            return {...state, sanphamshop : sanphammoi, fisrt_page : pageNew}
        case types.ADD_PRODUCT:
            console.log("Reducer sau khi add hàng : " + state.sanphamshop);
            // var newPage = parseInt(action.rs_first_page);
            // return {...state, fisrt_page: newPage}
        default: return { ...state}; 
    }
}

export default myshop;
