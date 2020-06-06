import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SanPhamView from './SanPhamView';
import ChiTiet from './ChiTiet';
import sua from './sua';
import AddProduct from './AddProduct';
import ThongTinShop from '../ThongTinShop';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode ='none'>   
      <Stack.Screen name="SanPhamView" component={SanPhamView} />
      <Stack.Screen name="ChiTiet" component={ChiTiet} />
      <Stack.Screen name="sua" component={sua} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ThongTinShop" component={ThongTinShop} />
    </Stack.Navigator>
  );
}

export default class SanPham extends Component {

  openMenu() {
      this.props.navigation.openDrawer();
  }

  render() {
      return (
          <MyStack />
      )
  }
}
