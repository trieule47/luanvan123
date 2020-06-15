import * as types from '../constants/ActionType';

var initialState = {
   slide: [],
   fisrt_page: 1,
   last_page: 0,
   sanphamtheoloai: [],
   sanphamshop: [],
};

const category = (state = initialState, action) => {
   switch (action.type) {
      case types.FETCH_CATEGORY: 
         return  { ...state, slide: action.item };
      case types.FETCH_ALL_PRODUCT: 
         return { ...state, sanphamshop: action.item };
      case types.LOAD_MORE_SP_SHOP:
         var pageNew = state.fisrt_page + 1;
         var sanphamOld = state.sanphamshop;
         var sanphammoi = sanphamOld.concat(action.item);
         return {...state, sanphamshop : sanphammoi, fisrt_page : pageNew}
      default: return {...state};
   }
}

export default category;