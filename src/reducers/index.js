import { combineReducers } from 'redux';
import topproducts from './topproducts';
import cart from './cart';
import signup from './signup';
import user from './user';
import category from './category';
import myshop from './shop';
import colection from './colection';
import search from './search';


const appReducers = combineReducers({
    topproducts,
    cart,
    signup,
    user,
    category,
    myshop,
    colection,
    search,
});

export default appReducers;