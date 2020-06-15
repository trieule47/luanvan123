import * as types from '../constants/ActionType';

const initialState = {
    inforShop: [],
    dsshop: [],
    sanphamshop: [],
<<<<<<< HEAD
    slide_shops: [],
=======
    slide_shop: [],
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
    idLoading:[],
    fisrt_page: 1,
    last_page: 0,
    sanphamtheoloai: [],
};

const colection = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_INFOR_SHOP:
            return { ...state, inforShop: action.data }
        case types.GET_PRODUCT:
            return { ...state, sanphamshop: action.data , idLoading: action.isLoading }
        case types.GET_DS_SHOP:
            return { ...state, dsshop: action.dsshop }
        case types.GET_SLIDE:
<<<<<<< HEAD
            return  {...state, slide_shops : action.item }
=======
            return  {...state, slide_shop : action.item }
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
        case types.GET_SP_THEO_LOAI:
            return  {...state, sanphamtheoloai : action.sanpham }
        case types.LOAD_MORE_SP_SHOP:
            var pageNew = state.fisrt_page + 1;
            var sanphamOld = state.sanphamshop;
            var sanphammoi = sanphamOld.concat(action.item);
            if(state.sanphamshop==state.sanphamshop) console.log('no more')
            return {...state, sanphamshop : sanphammoi, fisrt_page : pageNew}
        default: return { ...state};
    }
}

export default colection;