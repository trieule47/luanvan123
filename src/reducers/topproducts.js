import * as types from '../constants/ActionType';

const initialState = [];

const topproducts = (state = initialState, action) => {
   switch (action.type) {
      case types.FETCH_TOP_PRODUCT:
         state = action.item; 
         return [...state];
      default: return [...state];
   }
}

export default topproducts;