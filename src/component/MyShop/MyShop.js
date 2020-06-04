import React, { Component } from 'react'
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import SanPham from './sanpham/SanPham';
import DonHang from './DonHang';

const Tab = createBottomTabNavigator();

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}


function CartIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} />;
}


function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Bài đăng') {
          iconName = focused ? 'ios-home' : 'ios-home';
        } else if (route.name === '') {
          return (
            <CartIconWithBadge
              name={
                focused
                  ? 'ios-cart'
                  : 'ios-cart'
              }
              size={size}
              color={color}
              badgeCount={cart.length}
            />
          );
        } else if (route.name === 'Đơn hàng') {
          iconName = focused ? 'ios-cart' : 'ios-cart';
        } else if (route.name === '') {
          iconName = focused ? 'ios-contact' : 'ios-contact';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#34B089',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Bài đăng" component={SanPham} />
      <Tab.Screen name="Đơn hàng" component={DonHang} />
    </Tab.Navigator>
  );
}


export default MyTabs;
