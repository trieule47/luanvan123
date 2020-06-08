import * as types from '../constants/ActionType';

const initialState = {
  topproduct : [],
  allproduct : [],
};

const topproducts = (state = initialState, action) => {
   switch (action.type) {
      case types.FETCH_TOP_PRODUCT: 
         return { ...state, topproduct: action.item };
      case types.FETCH_ALL_PRODUCT: 
         return { ...state, allproduct: action.item };
      default: return { ...state};
   }
}

export default topproducts;