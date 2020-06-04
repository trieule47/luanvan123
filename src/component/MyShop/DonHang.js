import React, { Component } from 'react'
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import Header from './Header';
import { connect } from "react-redux";
import {
  actShopGetProductRequest,
  actDSShopGetRequest,
  inforshop,
} from "./../../action/ShopAction";

class DonHang extends Component{
    render(){
        return(
            <View>
                <Header a={this.props.myshop.inforShop} />
                <Text>Dơn</Text>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      myshop: state.myshop,
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ShopGetProduct: (id) => dispatch(actShopGetProductRequest(id)),
      GetDSShop: () => dispatch(actDSShopGetRequest()),
      GetInforShop:(u,ds)=>dispatch(inforshop(u,ds))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(DonHang);