import * as types from '../constants/ActionType';

const initialState = {
    inforShop: [],
    dsshop: [],
    sanphamshop: [],
    sanphamtim: [],
    slide_shop: [],
    idLoading:[],
    fisrt_page: 1,
    last_page: 0,
    sanphamtheoloai: [],
};

const myshop = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_SP:
            return  {...state, sanphamtim : action.sanpham}

        case types.LOAD_MORE_SP_SHOP:
            var pageNew = state.fisrt_page + 1;
            var sanphamOld = state.sanphamshop;
            var sanphammoi = sanphamOld.concat(action.item);
            return {...state, sanphamshop : sanphammoi, 
                fisrt_page : pageNew}
        default: return { ...state};
    }
}

export default myshop;
