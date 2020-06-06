import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

import littleIcon from '../../../../media/temp/little.jpg'
import { connect } from 'react-redux'
import { actFetchCategory } from '../../../../action/GategoryAction'
const { height, width } = Dimensions.get('window');
const url = 'http://vaomua.club/public/user/image/images/';
import { actFetchCategoryRequest } from '../../../../action/GategoryAction'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: ["https://icdn.dantri.com.vn/thumb_w/640/2017/photo-2-1507597840793.jpg",
                "https://cafefcdn.com/thumb_w/650/2018/8/24/photo1535115689291-15351156892912058800942.jpg",
                "https://namphuthai.vn/wp-content/uploads/2017/07/bao-quan-rau-sach.jpg"
            ]
        }
    }
    gotoListProduct() {
        const { navigation } = this.props;
        navigation.push('ListProduct');
    }
    // componentDidMount() {
    //     this.props.FetchCategory();
    // }
    render() {
        // console.log(" slide: " + slide);
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        const { slide } = this.state;
        return (
            <View style={wrapper} >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={textStyle}>Danh sách sản phẩm</Text>
                </View>
                <View style={{ flex: 3 }}>
                    <Swiper width={imageWidth} height={imageHeight} >
                        {slide.map(e => (
                            <TouchableOpacity onPress={this.gotoListProduct.bind(this)} key={e} >
                                <ImageBackground source={{ uri: e }} style={imageStyle}>
                                    {/* <Text style={cateTitle} >{e.id}</Text> */}
                                </ImageBackground>
                            </TouchableOpacity>

                        ))}
                    </Swiper>
                </View>
            </View>
        );
    }
}

// const mapStateTopProps = state => {
//     return {
//       slide: state.slide,
//     }
// }

// const mapDispatchToProps = dispatch => {

//   return {
//       FetchCategory: () => { dispatch(actFetchCategoryRequest()) },
//   }
// }
export default connect(null, null)(Category);

const imageWidth = width - 30;
const imageHeight = (imageWidth / 933) * 465

const styles = StyleSheet.create({
    wrapper: {
        height: height * 0.35,
        backgroundColor: '#FFF',
        margin: 5,
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
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'

    },
    cateTitle: {
        fontSize: 20,

        color: '#9A9A9A'
    },
});