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
        callApi('login', 'POST', info ).then(res => {
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



export const actChangeInfoRequest = (id,  info ,token) => {
  
   console.log( id +'a '+JSON.stringify(info.anh_user));
    return (dispatch) => {
        callApi('change/' + id, 'POST', info , token).then(res => {
            console.log(res.data.status);
            if(res.data.status == 'ok')
            {
                dispatch(actChangeInfo(res.data.user));
                Alert.alert("Thông báo !", "Thay đổi thành công", [
                    {
                        text : "Tiếp tục",
                        onPress : () => {RootNavigation.navigate('Shop');}
                    }
                ]);
            }
            else
            {
                Alert.alert("Thông báo !", "Thay đổi không thành công");
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
