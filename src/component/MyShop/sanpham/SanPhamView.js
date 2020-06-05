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
} from "react-native";
import Header from "../Header";
import Detail from "../sanpham/Detail";
import { connect } from "react-redux";
import {
  actAllInfoShopRequest
} from "../../../action/ShopAction";

import Colection from "../../Main/Shop/Home/Category";

const url = "http://vaomua.club/public/user/image/images/";

class SanPham extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
    }
    
  }
  componentDidMount() {
    
    this.props.GetInforShop(this.props.user.infoUser.id);
    console.log("ALO LAO " + this.props.user.infoUser.id);
  }
  

  render() {
    const { myshop, user } = this.props;
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
        <Header a={myshop.inforShop}  navigation={this.props.navigation}/>
        <Colection/>
        <View style={container}>
          <View style={titleContainer}>
            <Text style={title}>My PRODUCT</Text>
          </View>
          <Detail b={myshop.sanphamshop} navigation={this.props.navigation} />
      </View>
      <TouchableOpacity onPress={()=> Alert.alert(JSON.stringify(myshop.inforShop))} >
          <Text> CC</Text>
      </TouchableOpacity>
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
    GetInforShop: (id_user) => dispatch(actAllInfoShopRequest(id_user)),
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
