import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SanPhamView from './SanPhamView';
import ChiTiet from './ChiTiet';
import SuaSanPham from './SuaSanPham';
import AddProduct from './AddProduct';
import ThongTinShop from './ThongTinShop';
import AddLoHang from './AddLoHang';
import DangKyShop from '../DangKyShop';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode ='none'>   
      <Stack.Screen name="SanPhamView" component={SanPhamView} />
      <Stack.Screen name="ChiTiet" component={ChiTiet} />
      <Stack.Screen name="SuaSanPham" component={SuaSanPham} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ThongTinShop" component={ThongTinShop} />
      <Stack.Screen name="ThemLoHang" component={AddLoHang} />
      <Stack.Screen name="DangKyShop" component={DangKyShop} />
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
