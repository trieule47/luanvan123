import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

// compent
import HomeView from './HomeView';
import ProductDetail from '../ProductDetail/ProductDetail';
import ListProduct from '../ListProduct/ListProduct';
import ShopDetail from '../ShopDetail/ShopDetail'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode ='none'>   
      <Stack.Screen name="HomeView" component={HomeView} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
    </Stack.Navigator>
  );
}


export default class Home extends Component {

    openMenu() {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <MyStack />
        )
    }
}
