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
} from "react-native";
import Header from "../Header";
import Detail from "../sanpham/Detail";
import { connect } from "react-redux";
import {
  actShopGetProductRequest,
  actDSShopGetRequest,
  inforshop,
  actInforShopRequest,
} from "../../../action/ShopAction";

const url = "http://vaomua.club/public/user/image/images/";

class SanPham extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
    }
    
  }
  componentDidMount() {
   
    //this.props.GetDSShop();
    
    this.props.GetInforShop(this.props.user.infoUser);

    console.log('user infor: '+ JSON.stringify(this.props.myshop.inforShop));
   // console.log('shop infor: '+ JSON.stringify(this.props.myshop.dsshop));

    //this.props.ShopGetProduct(this.props.myshop.inforShop.id);
    // console.log('myshop product: '+ JSON.stringify(this.props.myshop.sanphamshop));
   
  }
  

  render() {
    const { myshop, user } = this.props;
  //  console.log("myshop:" + JSON.stringify(myshop));
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

    
    return (
      <ScrollView>
        <Header a={this.props.myshop.inforShop}  navigation={this.props.navigation}/>
        <View style={container}>
          <View style={titleContainer}>
            <Text style={title}>My PRODUCT</Text>
          </View>
          <Detail b={this.props.myshop.sanphamshop} navigation={this.props.navigation} />
      </View>
      </ScrollView>
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
    GetInforShop: (u) => dispatch(actInforShopRequest(u))
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
});
