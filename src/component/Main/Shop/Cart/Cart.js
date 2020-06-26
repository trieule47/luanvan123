import React, { Component } from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

// component
import CardView from './CardView';
import Order from './Order';
import ProductDetail from '../ProductDetail/ProductDetail';
import Cards from './Card';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode ='none'>
       <Stack.Screen name="Cards" component={Cards} />
      <Stack.Screen name="CardView" component={CardView} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Order" component={Order} />
     
     
    </Stack.Navigator>
  );
}


export default class Card extends Component {

    openMenu() {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <MyStack />
        )
    }
}
