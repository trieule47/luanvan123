import { combineReducers } from 'redux';
import topproducts from './topproducts';
import cart from './cart';
import signup from './signup';
import user from './user';
import slide from './category';

const appReducers = combineReducers({
    topproducts,
    cart,
    signup,
    user,
    slide,

});

export default appReducers;