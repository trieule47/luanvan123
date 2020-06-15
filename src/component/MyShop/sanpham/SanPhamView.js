import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Button,
} from "react-native";
import Swipeout from 'react-native-swipeout'
import Header from "../Header";
import Detail from "../sanpham/Detail";
import { connect } from "react-redux";
import {
    actAllInfoShopRequest,
    actLoadMoreShopRequest,
} from "../../../action/ShopAction";

//import Colection from "../../Main/Shop/Home/Category";
import SlideShow from "./SlideShow";
import { FlatList } from "react-native-gesture-handler";
const url = "http://vaomua.club/public/user/image/images/";


class SanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            page: 0,
        }

    }
    componentDidMount() {
        this.props.GetInforShop(this.props.user.infoUser.id, 1, this.props.user.token);
        this.setState({
            page: 1,
        })
        // console.log("ALO LAO " + this.props.user.infoUser.id);
    }

    render() {
        const { myshop, user } = this.props;
        const {
            container,
            titleContainer,
            title,
            btnThem1,
            btnThem,
        } = styles;
        const swiperSetting = {
            autoClose: true,
            onClose: (setId, rowId, direction) => {

            },
            onOpen: (setId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {
                        console.log("Xóa sp :  " + this.props.index);
                        
                    },
                    text: 'Xóa', type: 'delete'
                },
                {
                    onPress: () => {
                        console.log("Sửa");
                    },
                    text: 'Sửa', type: 'change', backgroundColor: '#2CBE4E'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        const { navigation } = this.props;
        return (
            <View>
                <Header a={myshop.inforShop} navigation={this.props.navigation} />
                <ScrollView style={{ marginBottom: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={btnThem} onPress={() => navigation.navigate('AddProduct')}>
                            <Text style={{ color: '#FFF', textAlign: 'center' }}>Thêm sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnThem1} onPress={() => navigation.navigate('ThongTinShop')}>
                            <Text style={{ color: '#FFF', textAlign: 'center' }}>Thông tin shop</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btnThem} onPress={() => navigation.navigate('ThemLoHang')}>
                            <Text style={{ color: '#FFF', textAlign: 'center' }}>Thêm lô hang</Text>
                        </TouchableOpacity>
                    </View>
                    <SlideShow />
                    <View style={{ marginBottom: 5 }}>
                        <FlatList
                            data={myshop.sanphamshop}
                            renderItem={({ item }) => {
                                return (
                                    <Swipeout {...swiperSetting}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("ChiTiet", {
                                                    product: item,
                                                });
                                            }}
                                        >
                                            <View style={{
                                                flex: 1,
                                                backgroundColor: '#FFF',
                                                flexDirection: 'row',
                                                borderWidth: 1,
                                                borderColor: '#EBEDF0',
                                                paddingTop: 10
                                            }}>
                                                <Image
                                                    source={{
                                                        uri: item.sanpham_anh_app == null ? `${url}${item.sanpham_anh}` : item.sanpham_anh_app,
                                                    }}
                                                    style={{ width: 100, height: 100, margin: 5, borderRadius: 10 }}
                                                >

                                                </Image>
                                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                        <Text style={styles.flatListItem}>{item.sanpham_ten.toUpperCase()}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                        <Text style={styles.flatListItem}>Giá : </Text>
                                                        <Text style={styles.flatListItem}>{item.gia_tien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                        <Text style={styles.flatListItem}>Đăng ngày : </Text>
                                                        <Text style={styles.flatListItem}>{item.created_at}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Swipeout>
                                )
                            }}
                            keyExtractor={item => item.id.toString()}

                        >
                        </FlatList>
                        <View style={{ flex: 1, padding: 10, alignContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2CBE4E', backgroundColor: '#FFF', }}>
                            <TouchableOpacity onPress={() => {

                                this.props.LoadMoreSanPhamShop(this.props.myshop.inforShop.id, this.props.myshop.fisrt_page + 1, this.props.user.token);
                                console.log("San pham moi : " + JSON.stringify(myshop.sanphamshop))

                            }}>
                                <Text style={{ color: '#2CBE4E' }}>Xem thêm sản phẩm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myshop: state.myshop,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetInforShop: (id_user, page, token) => dispatch(actAllInfoShopRequest(id_user, page, token)),
        LoadMoreSanPhamShop: (id_shop, page, token) => dispatch(actLoadMoreShopRequest(id_shop, page, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SanPham);

const { width } = Dimensions.get("window");
const productWidth = (width - 60) / 2;
const productImageHeight = (productWidth / 361) * 425;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        margin: 5,
        shadowColor: "#2E272B",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    titleContainer: {
        height: 50,
        justifyContent: "center",
        paddingLeft: 10,
    },
    title: {
        color: "#D3D3CF",
        fontSize: 20,
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    productContainer: {
        width: productWidth,
        shadowColor: "#2E272B",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingBottom: 10,
    },
    productImage: {
        width: productWidth,
        height: productImageHeight,
    },
    productName: {
        paddingLeft: 10,

        color: "#D3D3CF",
        fontWeight: "500",
        marginTop: 5,
    },
    productPrice: {
        paddingLeft: 10,

        color: "#662F90",
    },
    btnThem: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'justify',
        alignContent: 'space-between',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flex: 1,
        backgroundColor: '#2CBE4E',
        borderColor: '#FFF',
    },
    btnThem1: {
        height: 50,
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'justify',
        alignContent: 'space-between',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flex: 1,
        backgroundColor: '#2CBE4E',
        borderColor: '#FFF',
    },
    flatListItem: {
        fontSize: 16,
        color: '#61BA5C',
    },
});
