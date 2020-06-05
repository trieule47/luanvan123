import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert,

} from "react-native";
import HTML from "react-native-render-html";
import { actAddProductRequest } from "./../../../action/ShopAction";
import { connect } from "react-redux";
import { TextInput } from "react-native-paper";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  
import * as RootNavigation from '../../../navigation/RootNavigation'

const icBack = require("../../../media/appIcon/back_white.png");
const icLogo = require("../../../media/appIcon/ic_logo.png");

const url = "http://vaomua.club/public/user/image/images/";
const ur = "https://aimacademy.vn/wp-content/uploads/2017/11/8-xu-huong-mobile-marketing-2018-1.png";
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: " ",
            type: " ",
            sourceImage: " ",
            sanPham: {
                shop_id: "",
                lohang_id: "",
                sanpham_ten: "",
                sanpham_anh: "download (23).jpg",
                sanpham_mo_ta: "",
                loaisanpham_id: "",
                donvitinh_id: "",
                gia_tien: "250000",
                phan_tram_km: "5",
                donvi_id: "1",
                active: "1",
                new: "1",
            },
        };
    }
    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({ text: "" });
    }
    clearAllTextInput() {
        this.clearText("txtshop_id");
        this.clearText("txtlohang_id");
        this.clearText("txtsanpham_te");
        this.clearText("txtsanpham_anh");
        this.clearText("txtsanpham_mo_ta");
        this.clearText("txtloaisanpham_id");
        this.clearText("txtdonvitinh_id");
        this.clearText("txtgia_tien");
        this.clearText("txtphan_tram_km");
    }

    goBack() {
        const { navigation } = this.props;
        navigation.navigate("SanPhamView");
    }
    goBackToMain() {
        const { navigation } = this.props;
        navigation.navigate("Menu");
    }

    ThemSanPham() {
        this.props.AddProduct(this.state.sanPham);
    }
    kiemTra() {
        this.setState({ sanPham: { ...this.state.sanPham, shop_id: this.props.myshop.inforShop.id }, });
        console.log('     ' + JSON.stringify(this.state.sanPham))
        if (
            this.state.sanPham.lohang_id == "" ||
            this.state.sanPham.sanpham_te == "" ||
            this.state.sanPham.sanpham_anh == "" ||
            this.state.sanPham.sanpham_mo_ta == "" ||
            this.state.sanPham.loaisanpham_id == "" ||
            this.state.sanPham.donvitinh_id == "" ||
            this.state.sanPham.gia_tien == "" ||
            this.state.sanPham.phan_tram_km == ""
        ) {
            Alert.alert("Vui lòng nhập đủ thông tin !");
        } else {
            this.ThemSanPham();
            //this.clearAllTextInput();
            Alert.alert("Thêm sản phẩm thành công !");
        }
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
        //console.log('data ' + JSON.stringify(result.base64));
    }

    render() {
        const { route, navigation } = this.props;
        const {
            bButton,
            row1,
            iconStyle,
            titleStyle,
            container,
            controlStyle,
            singInStyle,
            signUpStyle,
            inactiveStyle,
            activeStyle,
            inputStyle,
            bigButton,
            buttonText,
            title1Style,
        } = styles;
        const { hasPermission, type, sourceImage } = this.state;

        if (hasPermission === '') {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={container}>
                <View style={row1}>
                    {/* <TouchableOpacity onPress={() => RootNavigation.goBack()}> */}
                    <TouchableOpacity onPress={() => this.goBack()}>
                        <Image source={icBack} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Nông sản</Text>
                    <TouchableOpacity onPress={() => RootNavigation.navigate('Shop')} >
                        <Image source={icLogo} style={iconStyle} />
                    </TouchableOpacity>
                </View>
                <Text style={title1Style}>
                    Nhập thông tin sản phẩm
                    </Text>
                <ScrollView>
                    <View>


                        <TextInput
                            style={inputStyle}
                            placeholder="shop_id"
                            value={JSON.stringify(this.props.myshop.inforShop.id)}
                        />
                        <TextInput
                            style={inputStyle}
                            ref={"txtlohang_id"}
                            placeholder="lohang_id"
                            keyboardType="number-pad"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, lohang_id: text },
                                })
                            }
                        />
                        <TextInput
                            ref={"txtsanpham_ten"}
                            style={inputStyle}
                            placeholder="sanpham_ten"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, sanpham_ten: text },
                                })
                            }
                        />
                        <TextInput
                            ref={"txtsanpham_anh"}
                            style={inputStyle}
                            placeholder="sanpham_anh"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, sanpham_anh: text },
                                })
                            }
                        />
                        <View style={{flexDirection: 'row'}}>

                            <Image style={{ margin: 10, height: 100, width: 100 }} source={sourceImage !=" " ? sourceImage : ur } />
                            <TouchableOpacity
                                onPress={this.pickImage.bind(this)}
                                style={{
                                    alignSelf: "flex-end",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                }}
                            >
                                <Ionicons name="ios-photos" style={{ color: "#111", fontSize: 40 }} />
                            </TouchableOpacity>

                        </View>
                        <TextInput
                            ref={"txtsanpham_mo_ta"}
                            style={inputStyle}
                            placeholder="sanpham_mo_ta"
                            keyboardType="email-address"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, sanpham_mo_ta: text },
                                })
                            }
                        />
                        <TextInput
                            ref={"txtloaisanpham_id"}
                            style={inputStyle}
                            placeholder="loaisanpham_id"
                            keyboardType="number-pad"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, loaisanpham_id: text },
                                })
                            }
                        />
                        <TextInput
                            ref={"txtdonvitinh_id"}
                            style={inputStyle}
                            placeholder="donvitinh_id"
                            keyboardType="number-pad"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, donvitinh_id: text },
                                })
                            }
                        />
                        <TextInput
                            ref={"txtgia_tien"}
                            style={inputStyle}
                            placeholder="gia_tien"
                            keyboardType="number-pad"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, gia_tien: text },
                                })
                            }
                        />
                        <TextInput
                            ref={"txtphan_tram_km"}
                            style={inputStyle}
                            placeholder="phan_tram_km"
                            keyboardType="number-pad"
                            onChangeText={(text) =>
                                this.setState({
                                    sanPham: { ...this.state.sanPham, phan_tram_km: text },
                                })
                            }
                        />
                        <View style={bButton}>
                            <TouchableOpacity
                                style={bigButton}
                                onPress={() => this.kiemTra()}
                            >
                                <Text style={buttonText}>THÊM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={bigButton} onPress={() => this.goBack()} >
                                <Text style={buttonText} >
                                    HỦY
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddProduct: (infor) => {
            dispatch(actAddProductRequest(infor));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        myshop: state.myshop,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const { width } = Dimensions.get("window");
const swiperWidth = width - 40;
const swiperHeight = width / 1.8 - 30;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3EBA77",
    },
    row1: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 3,
        alignItems: "center",
    },
    iconStyle: { width: 30, height: 30 },
    titleStyle: { color: "#FFF", fontSize: 30 },
    title1Style: { color: "#FFF", fontSize: 20, textAlign: "center", marginBottom: 20 },
    controlStyle: {
        flexDirection: "row",
    },
    inactiveStyle: {
        color: "#D7D7D7",
    },
    activeStyle: {
        color: "#3EBA77",
    },
    inputStyle: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        marginBottom: 10,
        //borderRadius: 20,
        paddingLeft: 30,
        marginHorizontal: 20,
    },
    bButton: {
        flexDirection: "row",
        padding: 20,
    },
    bigButton: {
        flex: 1,
        height: 50,
        width: 100,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "400",
    },

    //111111111111111111
});
