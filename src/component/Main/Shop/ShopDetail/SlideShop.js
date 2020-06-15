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
<<<<<<< HEAD
import { getSlideShop } from "../../../../action/ColectionAction";
=======
import { getSlideShop } from "../../../../action/ShopAction";
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
const { height, width } = Dimensions.get("window");
const url = "http://vaomua.club/public/user/image/images/";


class SlideShop extends Component {
  componentDidMount(){
  //  console.log('shop_id : '+ this.props.id_shop);
    this.props.GetSlideShop(this.props.id_shop);
    //console.log('slide shop: '+ this.props.myshop.slide_shop);
  }
  render() {
<<<<<<< HEAD
    const { colection, id_shop } = this.props;
=======
    const { myshop, id_shop } = this.props;
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
     //console.log(" slide: " + JSON.stringify(myshop.slide_shop));
    const { wrapper, textStyle, imageStyle, cateTitle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={textStyle}>shop</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Swiper width={imageWidth} height={imageHeight}>
<<<<<<< HEAD
            { colection.slide_shops.map((e) => (
=======
            {myshop.slide_shop.map((e) => (
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
<<<<<<< HEAD
    colection: state.colection,
=======
    myshop: state.myshop,
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
