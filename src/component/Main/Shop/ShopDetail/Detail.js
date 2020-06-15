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
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import {
  getDataShop,
  actLoadMoreRequest,
} from "../../../../action/ColectionAction";

const url = "http://vaomua.club/public/user/image/images/";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: this.props.colection.isLoading,
    });
    this.props.GetDataShop(this.props.id_shop, 1);
  }

  render() {
    const {
      container,
      titleContainer,
      title,
      body,
      productContainer,
      productImage,
      productName,
      productPrice,
      btnPlus,
    } = styles;
    const { navigation, colection } = this.props;
    const { id_shop } = this.props;
    //  console.log('san pham shop :' + JSON.stringify(myshop.sanphamshop));
    // console.log(' item '+ JSON.stringify(colection.slide_shop));
    if (this.state.isLoading == true)
      return <ActivityIndicator size="large" color="#0000ff" />;
    else
      return (
        <View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 25, color: "#AFAEAF" }}>
              Danh sách sản phẩm
            </Text>
          </View>
          <View style={body}>
            {/* <FlatList
              // numColumns={2}
              // contentContainerStyle={{
              //   alignSelf: 'flex-start'
              //   }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                            
              data={colection.sanphamshop}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={productContainer}
                  style={{marginHorizontal:10}}
                  key={item.id}
                  onPress={() => {
                    navigation.navigate("ChiTiet", {
                      product: item,
                    });
                  }}
                >
                  <Image
                    //2 nơi lưu ảnh nên phải làm thế này
                    source={{
                      uri:
                      item.sanpham_anh_app == null
                          ? `${url}${item.sanpham_anh}`
                          : item.sanpham_anh_app,
                    }}
                    style={productImage}
                  />
                  <Text style={productName}>{item.sanpham_ten.toUpperCase()}</Text>
                  <Text style={productPrice}>
                    {item.gia_tien
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                    VNĐ
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              ListFooterComponent={
                <View
                  style={btnPlus}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.LoadMore(this.props.colection.fisrt_page + 1);
                      console.log(
                        "San pham moi : " + JSON.stringify(colection.sanphamshop)
                      );
                    }}
                  >
                    <Text style={{ color: "#2CBE4E" }}>Xem thêm sản phẩm</Text>
                  </TouchableOpacity>
                </View>
              }
            /> */}
            { colection.sanphamshop.map((e) => (
              <TouchableOpacity
                style={productContainer}
                key={e.id}
                onPress={() => {
                  navigation.navigate("ProductDetail", {
                    product: e,
                  });
                }}
              >
                <Image
                  //2 nơi lưu ảnh nên phải làm thế này
                  source={{
                    uri:
                      e.sanpham_anh_app == null
                        ? `${url}${e.sanpham_anh}`
                        : e.sanpham_anh_app,
                  }}
                  style={productImage}
                />
                <Text style={productName}>{e.sanpham_ten.toUpperCase()}</Text>
                <Text style={productPrice}>
                  {e.gia_tien
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  VNĐ
                </Text>
              </TouchableOpacity>
            ))}
            
          </View>
          <View
                  style={btnPlus}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.LoadMore(id_shop,this.props.colection.fisrt_page + 1);
                      console.log(
                        "San pham moi : " + JSON.stringify(colection.sanphamshop)
                      );
                    }}
                  >
                    <Text style={{ color: "#2CBE4E" }}>Xem thêm sản phẩm</Text>
                  </TouchableOpacity>
                </View>
        </View>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    colection: state.colection,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDataShop: (id_shop, page) => dispatch(getDataShop(id_shop, page)),
    LoadMore: (id_shop,page) => {
      dispatch(actLoadMoreRequest(id_shop,page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

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
  btnPlus:{
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2CBE4E",
    backgroundColor: "#FFF",
  },
});
