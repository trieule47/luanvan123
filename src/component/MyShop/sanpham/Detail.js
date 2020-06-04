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
  actShopGetProductRequest,
  actDSShopGetRequest,
  inforshop,
  actInforShopRequest,
} from "./../../../action/ShopAction";

const url = "http://vaomua.club/public/user/image/images/";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    // console.log('myshop product: '+ JSON.stringify(this.props.myshop.sanphamshop));
    console.log("hggfggg :" + this.props.myshop.inforShop.id);
    this.props.ShopGetProduct(this.props.myshop.inforShop.id);
    console.log(
      "myshop product: " + JSON.stringify(this.props.myshop.sanphamshop)
    );
    this.setState({
      isLoading: false,
    });
    console.log("      A: " + JSON.stringify(this.props.b[0]));
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
    } = styles;
    const { navigation } = this.props;
    const { b } = this.props;
    
    if (this.state.isLoading == true)
      return <ActivityIndicator size="large" color="#0000ff" />;
    else
      return (
        <View style={body}>
          {/* <FlatList
            data={b}
            renderItem={({ item }) => (
              <TouchableOpacity style={productContainer} >
                <Image
                  source={{ uri: `${url}${item.sanpham_anh}` }}
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
          /> */}
          {this.props.b.map((e) => (
            <TouchableOpacity
              style={productContainer}
              key={e.id}
              onPress={() => {
                navigation.navigate("ChiTiet", {
                  product: e,
                });
              }}
            >
              <Image
                source={{ uri: `${url}${e.sanpham_anh}` }}
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
    ShopGetProduct: (id) => dispatch(actShopGetProductRequest(id)),
    GetDSShop: () => dispatch(actDSShopGetRequest()),
    GetInforShop: (u) => dispatch(actInforShopRequest(u)),
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
});
