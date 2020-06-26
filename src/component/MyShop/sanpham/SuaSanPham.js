import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity
} from 'react-native';
import HTML from 'react-native-render-html';
import { actAddToCart } from '../../../action/CartAtion';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
const ur = require("../no-image.png");
const back = require('../../../media/appIcon/back.png');
const cart = require('../../../media/appIcon/cartfull.png');

const url = 'http://vaomua.club/public/user/image/images/';

class Chitiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: " ",
            type: " ",
            sourceImage: " ",
            sanPham: {
                lohang_id: "",
                sanpham_ten: "",
                sanpham_anh_app: "",
                sanpham_mo_ta: "",
                loaisanpham_id: "",
                donvitinh_id: "",
                gia_tien: "",
                phan_tram_km: "",
               // donvi_id: "",
            },
        };
    }
    goBack() {
        const { navigation } = this.props;
        navigation.navigate("SanPhamView");
    }
    async componentDidMount() {
        this.getPermissionAsync()
    }

    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted', type: Camera.Constants.Type.back });
    }


    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
        });

        this.setState({ sourceImage: result });
        this.setState({
            sanPham: { ...this.state.sanPham, sanpham_anh_app: result.base64 },
        })
    }
    render() {
        const { route } = this.props;

        const { product } = route.params;
        const {
            header, backStyle, images
        } = styles;
        return (
            <ScrollView style={styles.container}>
                <View style={header} >
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={backStyle} source={back} />
                    </TouchableOpacity>
                </View>
                <View style={images}>
                    <Image
                        source={{
                            uri: product.sanpham_anh_app == null ? `${url}${product.sanpham_anh}` : product.sanpham_anh_app
                        }}
                        style={{ width: 200, height: 200, margin: 5, borderRadius: 10 }} />
                    <View>
                        <Image style={{ margin: 10, height: 100, width: 100 }} source={this.state.sourceImage != " " ? this.state.sourceImage : ur} />
                        <TouchableOpacity
                            onPress={this.pickImage.bind(this)}
                            style={{
                                alignSelf: "flex-end",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                        >
                            <Text>Chọn ảnh mới . </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                <Text>Tên sản phẩm</Text>
                    <TextInput
                        placeholder={product.sanpham_ten}
                        onChangeText={(text) =>
                            this.setState({
                                sanPham: { ...this.state.sanPham, sanpham_ten: text },
                            })
                        }
                    />
                    <Text>Giá tiền</Text>
                    <TextInput
                        placeholder={product.gia_tien}
                        onChangeText={(text) =>
                            this.setState({
                                sanPham: { ...this.state.sanPham, gia_tien: text },
                            })
                        }
                    />
                <Text>Mô tả sản phẩm</Text>
                <TextInput
                        style={{height: 200}}
                        onChangeText={(text) =>
                            this.setState({
                                sanPham: { ...this.state.sanPham, sanpham_mo_ta: text },
                            })
                        }
                        multiline={true}
                        underlineColorAndroid='transparent'
                        
                    />
                </View>
            </ScrollView>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => dispatch(actAddToCart(product, 1)),
    }
}
export default connect(null, mapDispatchToProps)(Chitiet);


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50
    },
    backStyle: {
        width: 45,
        height: 45
    },
    images: {
        textAlign: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    }



    // wrapper: {
    //     flex: 1,
    //     backgroundColor: '#D6D6D6',
    // },
    // cardStyle: {
    //     flex: 1,
    //     backgroundColor: '#FFFFFF',
    //     borderRadius: 5,
    //     marginHorizontal: 10,
    //     marginVertical: 10
    // },
    // header: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     flex: 1,
    //     paddingHorizontal: 15,
    //     paddingTop: 20
    // },
    // cartStyle: {
    //     width: 25,
    //     height: 25
    // },
    // backStyle: {
    //     width: 25,
    //     height: 25
    // },
    // productStyle: {
    //     width: width / 2,
    //     height: width / 2
    // },
    // footer: {
    //     flex: 6
    // },
    // imageContainer: {
    //     flex: 6,
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     marginHorizontal: 10
    // },
    // textMain: {
    //     paddingLeft: 20,
    //     marginVertical: 10
    // },
    // textBlack: {

    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: '#3F3F46'
    // },
    // textSmoke: {

    //     fontSize: 20,
    //     color: '#9A9A9A'
    // },
    // textHighlight: {

    //     fontSize: 20,
    //     color: '#7D59C8'
    // },
    // titleContainer: {
    //     borderBottomWidth: 1,
    //     borderColor: '#F6F6F6',
    //     marginHorizontal: 20,
    //     paddingBottom: 5
    // },
    // descContainer: {
    //     margin: 10,
    //     paddingTop: 10,
    //     paddingHorizontal: 10
    // },
    // descStyle: {
    //     color: '#AFAFAF'
    // },
    // linkStyle: {
    //     color: '#7D59C8'
    // },
    // productImageStyle: {
    //     width: swiperWidth,
    //     height: swiperHeight,
    //     marginHorizontal: 5
    // },
    // mainRight: {
    //     justifyContent: 'space-between',
    //     alignSelf: 'stretch',
    //     paddingLeft: 20
    // },
    // txtColor: {
    //     color: '#C21C70',
    //     fontSize: 15,
    //     fontWeight: '400',

    // },
    // txtMaterial: {
    //     color: '#C21C70',
    //     fontSize: 15,
    //     fontWeight: '400',

    // }
});