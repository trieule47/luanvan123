import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from './Header';
export default class ShopDetail extends Component {
    render() {
        const {  navigation } = this.props;
        // const {  shop } = this.props.route.params;
        return (
            <View>
                <Header navigation={navigation}/>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
