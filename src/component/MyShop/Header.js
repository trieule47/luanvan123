import React, { Component } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, Button } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import * as RootNavigation from '../../navigation/RootNavigation'
import icLogo from '../../media/appIcon/ic_logo.png';
import icback from '../../media/appIcon/back_white.png';

const { height } = Dimensions.get('window');
const url = "http://vaomua.club/public/user/image/images/";

export default class Header extends Component {
    render() {
        const { a, navigation } = this.props;
        const { wrapper, row1, textIput, iconStyle, titleStyle } = styles;
        return (
            <View style={{ wrapper, backgroundColor: '#34B089', padding: 10  }}>
                <View style={row1}>
                    <TouchableOpacity onPress={()=> RootNavigation.navigate('Shop')} >
                        <Image source={icback} style={iconStyle}  />
                    </TouchableOpacity>
                    <Text style = {titleStyle}>Nông sản</Text>
                    <TouchableOpacity>
                        <Image source={icLogo} style={iconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={row1}>
                <Text  style = {titleStyle}>{a.tenshop}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: { height: height / 8, backgroundColor: '#34B089', padding: 10, justifyContent:'space-around', flex: 1 },
    row1 : { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    textIput: { height: height/23 , backgroundColor: '#FFF', paddingLeft: 10, paddingVertical: 0  },
    iconStyle : { width: 25, height: 25 },
    titleStyle: { color: '#FFF', fontSize: 20, flexDirection: 'row', justifyContent: 'space-between', }
});

/* <TouchableOpacity
                onPress={this.props.onOpen}
                >
                    <Text>Open menu</Text>
                </TouchableOpacity> */