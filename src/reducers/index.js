import { combineReducers } from 'redux';
import topproducts from './topproducts';
import cart from './cart';
import signup from './signup';
import user from './user';
import myshop from './shop';

const appReducers = combineReducers({
    topproducts,
    cart,
    signup,
    user,
    myshop

});

export default appReducers;