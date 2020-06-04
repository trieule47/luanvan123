import * as types from './../constants/ActionType';
import callApi from '../network/apiCaller';
import { Alert, AsyncStorage } from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation'

export const actSignInRequest = (info) => {
    return (dispatch) => {
        callApi('login', 'POST', info).then(res => {
            if (res.data.status == "error") {
                dispatch(actSignIn([], "error"));
                Alert.alert("Thông báo !", "Tài khoản hoặc mật khẩu không đúng");
            }
            else {
               // console.log('res', res)
                dispatch(actSignIn(res.data.user, res.data.status));
                RootNavigation.navigate('Shop');
            }
        });
    };
}

export const actSignIn = (info, checked) => {
    return {
        type: types.SIGN_IN,
        info,
        checked
    }
}

export const actSignOut = () =>{
    return {
        type : types.SIGN_OUT,
        info : ' ',
        checked: ' '
    }
}



export const actChangeInfoRequest = (id, email, info) => {
    const body = {
        id : id,
        email : email,
        password: info.password ,
        name : info.name,
        sodienthoai : info.sodienthoai,
        diachi : info.diachi
    }
    return (dispatch) => {
        callApi('change/' + id, 'PUT', body).then(res => {
            if(res.data.status == "error")
            {
                Alert.alert("Thông báo !", "Thay đổi không thành công");
            }
            else
            {
                dispatch(actChangeInfo(res.data.user));
                Alert.alert("Thông báo !", "Thay đổi thành công", [
                    {
                        text : "Tiếp tục",
                        onPress : () => {RootNavigation.navigate('Shop');}
                    }
                ]);
            }
        });
    };
}

export const actChangeInfo = (info) => {
    return {
        type : types.CHANGE_INFO,
        info,
    }
}
