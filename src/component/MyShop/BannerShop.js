import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

import { connect } from 'react-redux'
const { height, width } = Dimensions.get('window');

class BannerShop extends Component {
   
    render() {
        // console.log(" slide: " + slide);
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        const { myshop } = this.props;
        return (

                <View style={{ flex: 3 }}>
                    <Swiper style={{height: 200}}  autoplay={true} >
                        {myshop.slide_shop.map(e => (
                            <TouchableOpacity key={e} >
                                <ImageBackground source={{ uri: e.sanpham_anh_app }} style={imageStyle}>
                                    {/* <Text style={cateTitle} >{e.id}</Text> */}
                                </ImageBackground>
                            </TouchableOpacity>

                        ))}
                    </Swiper>
                </View>

        );
    }
}

const mapStateTopProps = state => {
    return {
      myshop: state.myshop,
    }
}

const mapDispatchToProps = dispatch => {

  return {
      
  }
}
export default connect(mapStateTopProps, null)(BannerShop);



const styles = StyleSheet.create({
    wrapper: {
        height: height * 0.35,
        backgroundColor: '#FFF',
        margin: 0,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0,
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 25,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    cateTitle: {
        fontSize: 20,

        color: '#9A9A9A'
    },
});