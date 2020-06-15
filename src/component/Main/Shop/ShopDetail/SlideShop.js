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
import { getSlideShop } from "../../../../action/ShopAction";
const { height, width } = Dimensions.get("window");
const url = "http://vaomua.club/public/user/image/images/";


class SlideShop extends Component {
  componentDidMount(){
  //  console.log('shop_id : '+ this.props.id_shop);
    this.props.GetSlideShop(this.props.id_shop);
    //console.log('slide shop: '+ this.props.myshop.slide_shop);
  }
  render() {
    const { myshop, id_shop } = this.props;
     //console.log(" slide: " + JSON.stringify(myshop.slide_shop));
    const { wrapper, textStyle, imageStyle, cateTitle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={textStyle}>shop</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Swiper width={imageWidth} height={imageHeight}>
            {myshop.slide_shop.map((e) => (
              <TouchableOpacity key={e.sanpham_anh_app}>
                <ImageBackground
                  source={{
                    uri:
                      e.sanpham_anh_app == null
                        ? `${url}${e.sanpham_anh}`
                        : e.sanpham_anh_app,
                  }}
                  style={imageStyle}
                >
                  <Text style={cateTitle} >{e.sanpham_ten}</Text>
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
    myshop: state.myshop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetSlideShop: (id_shop) => {
      dispatch(getSlideShop(id_shop));
    },
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(SlideShop);

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
