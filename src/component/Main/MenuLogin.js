import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Logo from '../../media/temp/profile.png';

import { connect } from 'react-redux';
import { actSignOut } from '../../action/UserAction';
import { actAddProductRequest } from '../../action/ShopAction';

const url = 'http://vaomua.club/public/user/image/images/';
const image = 'bg_3.jpg'
//const image = props.user.avatar;
//console.log( image );


function MenuLogin(props) {
  
  //console.log("image :"+ JSON.stringify(props.user.infoUser.avatar) );
  const name = props.user.infoUser.name;
  const avatar = props.user.infoUser.avatar;
  const request = () => {
    this.props.AddProduct(this.props.user.infoUser);
    console.log('user ' + JSON.stringify(this.props.user.infoUser))
  }
        return (
            <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                 source={{uri: `${url}${avatar}`}}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            label="Lịch sử giao dịch"
                            onPress={() => {props.navigation.navigate('OrderHistory')}}
                        />
                        
                        <DrawerItem 
                            label="Thay đổi thông tin"
                            onPress={() => {props.navigation.navigate('ChangeInfo')}}
                        />
                        <DrawerItem 
                            label="Đăng kí mở shop"
                            onPress={() => {
                             // this.request();
                              props.navigation.navigate('DangKyShop')}}
                        />
                        <DrawerItem 
                            label="Shop của tôi"
                            onPress={() => {props.navigation.navigate('MyShop')}}
                        />
                        <DrawerItem 
                            label="Đăng xuất"
                            onPress={() => {props.onSignOut()}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
        );
}

const mapStateTopProps = state => {
    return {
      user: state.user,
    }
}

const mapDispatchToProps = dispatch => {

  return {
      onSignOut: () => { dispatch(actSignOut()) },
      AddProduct: (infor) => {
        dispatch(actAddProductRequest(infor));
      },
  }
}
export default connect(mapStateTopProps,mapDispatchToProps)(MenuLogin);
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });