import * as types from './../constants/ActionType';
import callApi from '../network/apiCaller';
import { Alert, AsyncStorage } from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation'

// export const actSignInRequest = (info) => {
//     return (dispatch) => {
//         callApi('login', 'POST', info , token).then(res => {
//             if (res.data.error == "Unauthorised") {
//                 dispatch(actSignIn([], "error"));
//                 Alert.alert("Thông báo !", "Tài khoản hoặc mật khẩu không đúng");
//             }
//             else {
//                // console.log('res', res)
//                dispatch(actSignIn(res.data.success.token));
//                RootNavigation.navigate('Shop');
//             }
//         });
//     };
// }
export const actSignInRequest = (info) => {
    return (dispatch) => {
        callApi('login', 'POST', info , null).then(res => {
            if (res.data.success.token != "") {
                const token = res.data.success.token;
                callApi('user' , 'GET', null, token).then(res => {
                    dispatch(actSignIn(res.data, 'success', token));
                    RootNavigation.navigate('Shop');
                })
                
            }
            else {
               dispatch(actSignIn([], "error"));
                Alert.alert("Thông báo !", "Tài khoản hoặc mật khẩu không đúng");
            }
            
        });
    };
}

export const actSignIn = (info, checked, token) => {
    return {
        type: types.SIGN_IN,
        info,
        checked,
        token
    }
}

export const actSignOut = () =>{
    return {
        type : types.SIGN_OUT,
        info : ' ',
        checked: ' ',
        token : ' ',
    }
}



export const actChangeInfoRequest = (id, email, info,token) => {
    const body = {
        id : id,
        email : email,
        password: info.password ,
        name : info.name,
        sodienthoai : info.sodienthoai,
        diachi : info.diachi
    }
    return (dispatch) => {
        callApi('change/' + id, 'PUT', body,token).then(res => {
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
