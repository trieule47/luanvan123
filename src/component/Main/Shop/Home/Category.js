import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";

import littleIcon from "../../../../media/temp/little.jpg";
import { connect } from "react-redux";
import { actAllProductsRequest } from "../../../../action/CategoryAction";
const { height, width } = Dimensions.get("window");
//const url = 'http://vaomua.club/public/user/image/images/';
import { actFetchCategoryRequest } from "../../../../action/CategoryAction";
import { ScrollView } from "react-native-gesture-handler";


class Category extends Component {
  gotoListProduct() {
    const { navigation } = this.props;
    navigation.push("ListProduct");
  }
  componentDidMount() {
    this.props.FetchCategory(this.props.user.token);
  }
  render() {
    const { category } = this.props;
    // console.log(" slide: " + slide);
    const { wrapper, textStyle, imageStyle, cateTitle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={textStyle}>Danh sách sản phẩm</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Swiper width={imageWidth} height={imageHeight}>
            {category.slide.map((e) => (
              <TouchableOpacity
                onPress={this.gotoListProduct.bind(this)}
                key={e.sanpham_anh_app}
              >
                <ImageBackground
                  source={{
                    uri:
                      e.sanpham_anh_app == null
                        ? `${url}${e.sanpham_anh}`
                        : e.sanpham_anh_app,
                  }}
                  style={imageStyle}
                >
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

const mapStateTopProps = (state) => {
  return {
    category: state.category,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchCategory: (token) => {
      dispatch(actFetchCategoryRequest(token));
      dispatch(actAllProductsRequest());
    },
    GetProduct: () => dispatch(actAllProductsRequest()),
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(Category);

const imageWidth = width - 30;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.35,
    backgroundColor: "#FFF",
    margin: 5,
    shadowColor: "#2E272B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10,
    paddingTop: 0,
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: 25,
    color: "#AFAEAF",
  },
  imageStyle: {
    height: imageHeight,
    width: imageWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  cateTitle: {
    fontSize: 20,

    color: "#9A9A9A",
  },
});
