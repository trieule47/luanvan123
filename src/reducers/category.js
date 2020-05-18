import * as types from '../constants/ActionType';
var initialState = [];

const slide = (state = initialState, action) => {
   switch (action.type) {
      case types.FETCH_CATEGORY: 
         state = action.item;
         return [...state];
      default: return [...state];
   }
}

export default slide;