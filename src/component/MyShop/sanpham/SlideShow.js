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

import littleIcon from "../../../media/temp/little.jpg";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
const url = "http://vaomua.club/public/user/image/images/";


class Category extends Component {
  
  render() {
    const { myshop } = this.props;
    // console.log(" slide: " + slide);
    const { wrapper, textStyle, imageStyle, cateTitle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={textStyle}>Danh sách sản phẩm</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Swiper width={imageWidth} height={imageHeight}>
            {myshop.slide_shop != [] ? myshop.slide_shop.map((e) => (
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
            )):<View><Text>0 san pham</Text></View>
          }
          </Swiper>
        </View>
      </View>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    myshop: state.myshop,
    user: state.user,
  };
};

export default connect(mapStateTopProps, null)(Category);

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
