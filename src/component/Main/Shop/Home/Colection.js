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
const { height, width } = Dimensions.get("window");
const url = "http://vaomua.club/public/user/image/images/";

import { actGetDSShopRequest } from "../../../../action/ShopAction";

class Colection extends Component {
  componentDidMount() {
    this.props.GetDSShop();
  }
  render() {
    const { myshop } = this.props;
    const { navigation } = this.props;
    const { wrapper, textStyle, imageStyle, cateTitle } = styles;
    return (
      <View style={wrapper}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={textStyle}>Danh sách shop</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Swiper width={imageWidth} height={imageHeight}>
            {myshop.dsshop.map((e) => (
              <TouchableOpacity key={e.id}
              onPress={() => {
                navigation.navigate('ShopDetail', {
                    shop: e,
                })
            }}
              >
                <ImageBackground
                  source={{
                    uri: `${url}${e.image_name}`,
                  }}
                  style={imageStyle}
                >
                  <Text style={cateTitle}>{e.tenshop}</Text>
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
    GetDSShop: () => {
      dispatch(actGetDSShopRequest());
    },
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(Colection);

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
    fontSize: 30,
    fontWeight: 'bold',
    color: "#34B089",
  },
});
