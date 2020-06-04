import React, { Component } from 'react';

import Main from './Main';
import Shop from './Shop/Shop';
import Authentication from '../Authentication/Authentication';
import ChangeInfo from '../ChangeInfo/ChangeInfo';
import OrderHistory from '../OrderHistory/OrderHistory';
import MyShop from '../MyShop/MyShop';
import DangKyShop from '../MyShop/DangKyShop';

import MenuLogin from './MenuLogin';
import MenuLogOut from './MenuLogOut';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from "react-redux";

const Drawer = createDrawerNavigator();

// function MyDrawer() {
//     return (
//             <Drawer.Navigator initialRouteName="Shop">
//                 <Drawer.Screen name="Shop" component={Shop} />
//                 <Drawer.Screen name="Main" component={Main} />
//                 <Drawer.Screen name="Authentication" component={Authentication} />
//                 <Drawer.Screen name="ChangeInfo" component={ChangeInfo} />
//                 <Drawer.Screen name="OrderHistory" component={OrderHistory} />
//             </Drawer.Navigator>
//     );
// }

//export default
 class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
         //   isLogedIn: false,
        };
    }

    // gotoAuthentication() {
    //     const { navigation } = this.props;
    //     navigation.push('Authentication');
    // }
    // gotoChangeInfo() {
    //     const { navigation } = this.props;
    //     navigation.push('ChangeInfo');
    // }
    // gotoOrderHistory() {
    //     const { navigation } = this.props;
    //     navigation.push('OrderHistory');
    // }

    // componentDidMount(){
    //     if(this.props.user.check == 'success')
    //     this.setState({
    //         isLogedIn: true,
    //     })
    // }
    render() {
        const {user} = this.props ;
        const loginJSX = (
            <Drawer.Navigator initialRouteName="Shop" drawerContent={props => <MenuLogin {...props} />} >
                <Drawer.Screen name="Shop" component={Shop} />
                <Drawer.Screen name="MyShop" component={MyShop} />
                <Drawer.Screen name="DangKyShop" component={DangKyShop} />
                <Drawer.Screen name="Authentication" component={Authentication} />
                <Drawer.Screen name="ChangeInfo" component={ChangeInfo} />
                <Drawer.Screen name="OrderHistory" component={OrderHistory} />
            </Drawer.Navigator>
        );
        const logoutJSX = (
            <Drawer.Navigator initialRouteName="Shop" drawerContent={props => <MenuLogOut {...props} />} >
                <Drawer.Screen name="Shop" component={Shop} />
                <Drawer.Screen name="DangKyShop" component={DangKyShop} />
                <Drawer.Screen name="Sign In" component={Main} />
            </Drawer.Navigator>
        );
        const mainJSX = user.checked == "success" ? loginJSX : logoutJSX;
      // console.log('menu' + user.checked );
        return mainJSX
    }
}

const mapStateToProps = (state) => {
    return {
      user : state.user,
    };
  };
  
  export default connect(mapStateToProps, null)(Menu);


