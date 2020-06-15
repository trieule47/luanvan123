import React, { Component } from "react";
import {
<<<<<<< HEAD
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HTML from "react-native-render-html";
import {
  actAddToCart,
  actAddToCartRequest,
} from "../../../../action/CartAtion";
import { connect } from "react-redux";
=======
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity
} from 'react-native';
import HTML from 'react-native-render-html';
import { actAddToCart,actAddToCartRequest } from '../../../../action/CartAtion';
import { connect } from 'react-redux';
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570

import img1 from "../../../../media/temp/sp5.jpeg";
import img2 from "../../../../media/temp/sp4.jpeg";

const back = require("../../../../media/appIcon/back.png");
const cart = require("../../../../media/appIcon/cartfull.png");

const url = "http://vaomua.club/public/user/image/images/";

class ProductDetail extends Component {
<<<<<<< HEAD
  goBack() {
    const { navigation } = this.props;
    navigation.pop();
  }
  onAddToCart = (product) => {
    //   console.log('ProductDetail redux : ')
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU2ZDUxNGFjNTU1MmNmMTE5ZjMyOTc1YWQzZDJkYTE0NzM0NjAwNzkxMjNjZDU0MWQ5NTMxYmIwZGFkYWQwMGJhYTIxNWZmZWVlMzBjNjQxIn0.eyJhdWQiOiIxIiwianRpIjoiNTZkNTE0YWM1NTUyY2YxMTlmMzI5NzVhZDNkMmRhMTQ3MzQ2MDA3OTEyM2NkNTQxZDk1MzFiYjBkYWRhZDAwYmFhMjE1ZmZlZWUzMGM2NDEiLCJpYXQiOjE1OTE0NjIwNDEsIm5iZiI6MTU5MTQ2MjA0MSwiZXhwIjoxNjIyOTk4MDQxLCJzdWIiOiIxMDQiLCJzY29wZXMiOltdfQ.aFiTFN0vOCd2e1PnRcYLwGA4l3V14ucw1rHn554zJTNbgJbjLxFCN9NJ1g_NOZNziARIG_2ndFwAR9VgWkFc4hYmayWR-0TCehcD4o8tPnKW9Vd7IffJYKkR_2o7KWnLejMUF2qwNaKXf1eweYQ22am7rIM1-8KetMihyK8kBPUevsU7hz74bEz5aOn50DogLOepLDWmtDfqfxaJUlrA25F1C6SSaQFih5YLgjqVrcxzydVltCpbYx6HxvCkWokxPqFe8QjUJZKN4eCi7JlpvPeMeFTBQ-d90NIhZ61TWZwToBN_KzeUy_lwZs8-BFZLNMUr4l_fWzmLdOYN-9FLNjXSLpOg_z77n4urIwupSm1F-dAau_Aeq9TL8n1TOJpJ9lnaHHaB1EgmiPZ9dIHmESVTlClgX7nRVfkahy6xWzzL5WTlmWhV5eWqHs4OQ52zUwAWP8N1rNIyB8TGFTiqpk3SNBaQ_XvrhBB4lhtRKrmg5wir4e8Zb-mORRPtdveyfiNV9Ke6lSI8lSfRGqRVZcrXyKtEpi6wqQjliIMIR7fZ-z39ZipWlBP4ODTJBiW1ynSyAtapINOM29xu18GfUB5ymj7ND2YhLjluxYYGV1-EDN9b4AXYEHw-Jo_4-E0MrgLZUh9srdobjsiIDRtOqGxpQu4FQqXHEYWVAQ5ar_U";
    // this.props.onAddToCart(product,this.props.user.token);
    this.props.onAddToCart(product);
  };
  componentDidMount() {}
  render() {
    const { route } = this.props;

    const { product } = route.params;

    const {
      wrapper,
      cardStyle,
      header,
      footer,
      backStyle,
      imageContainer,
      cartStyle,
      textBlack,
      textSmoke,
      textHighlight,
      textMain,
      titleContainer,
      descContainer,
      productImageStyle,
      descStyle,
      txtMaterial,
      txtColor,
    } = styles;
    return (
      <View style={wrapper}>
        <View style={cardStyle}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
              <Image style={backStyle} source={back} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onAddToCart(product)}>
              <Image style={cartStyle} source={cart} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={imageContainer}>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  height: swiperHeight,
                }}
                horizontal
              >
                <Image
                  source={{
                    uri:
                      product.sanpham_anh_app == null
                        ? `${url}${product.sanpham_anh}`
                        : product.sanpham_anh_app,
                  }}
                  style={productImageStyle}
                />
              </View>
            </View>
            <View style={footer}>
              <View style={titleContainer}>
                <Text style={textMain}>
                  <Text style={textBlack}>
                    {product.sanpham_ten.toUpperCase()}
                  </Text>
                  <Text style={textHighlight}> / </Text>
                  <Text style={textSmoke}>
                    {product.gia_tien
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
                    VNĐ
                  </Text>
                </Text>
                <Text style={txtMaterial}>
                  Khuyến mãi: {product.phan_tram_km} %
                </Text>
              </View>
              <Text>Tên shop</Text>
              <View style={descContainer}>
                {/* <Text style={descStyle}>{product.sanpham_mo_ta}</Text> */}

                <HTML
                  html={product.sanpham_mo_ta}
                  imagesMaxWidth={Dimensions.get("window").width}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 15,
                  }}
                >
                  {/* <View style={{ flexDirection: 'row' }} >
                                        <Text style={txtColor}>{color}</Text>
                                        <View style={{ height: 15, width: 15, backgroundColor: 'black'.toLowerCase(), borderRadius: 15, marginLeft: 10, borderWidth: 1, borderColor: '#C21C70' }} />
                                    </View> */}
=======
    goBack() {
        const { navigation } = this.props;
        navigation.pop();
    }
    onAddToCart = (product) => {
     //   console.log('ProductDetail redux : ')
     const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU2ZDUxNGFjNTU1MmNmMTE5ZjMyOTc1YWQzZDJkYTE0NzM0NjAwNzkxMjNjZDU0MWQ5NTMxYmIwZGFkYWQwMGJhYTIxNWZmZWVlMzBjNjQxIn0.eyJhdWQiOiIxIiwianRpIjoiNTZkNTE0YWM1NTUyY2YxMTlmMzI5NzVhZDNkMmRhMTQ3MzQ2MDA3OTEyM2NkNTQxZDk1MzFiYjBkYWRhZDAwYmFhMjE1ZmZlZWUzMGM2NDEiLCJpYXQiOjE1OTE0NjIwNDEsIm5iZiI6MTU5MTQ2MjA0MSwiZXhwIjoxNjIyOTk4MDQxLCJzdWIiOiIxMDQiLCJzY29wZXMiOltdfQ.aFiTFN0vOCd2e1PnRcYLwGA4l3V14ucw1rHn554zJTNbgJbjLxFCN9NJ1g_NOZNziARIG_2ndFwAR9VgWkFc4hYmayWR-0TCehcD4o8tPnKW9Vd7IffJYKkR_2o7KWnLejMUF2qwNaKXf1eweYQ22am7rIM1-8KetMihyK8kBPUevsU7hz74bEz5aOn50DogLOepLDWmtDfqfxaJUlrA25F1C6SSaQFih5YLgjqVrcxzydVltCpbYx6HxvCkWokxPqFe8QjUJZKN4eCi7JlpvPeMeFTBQ-d90NIhZ61TWZwToBN_KzeUy_lwZs8-BFZLNMUr4l_fWzmLdOYN-9FLNjXSLpOg_z77n4urIwupSm1F-dAau_Aeq9TL8n1TOJpJ9lnaHHaB1EgmiPZ9dIHmESVTlClgX7nRVfkahy6xWzzL5WTlmWhV5eWqHs4OQ52zUwAWP8N1rNIyB8TGFTiqpk3SNBaQ_XvrhBB4lhtRKrmg5wir4e8Zb-mORRPtdveyfiNV9Ke6lSI8lSfRGqRVZcrXyKtEpi6wqQjliIMIR7fZ-z39ZipWlBP4ODTJBiW1ynSyAtapINOM29xu18GfUB5ymj7ND2YhLjluxYYGV1-EDN9b4AXYEHw-Jo_4-E0MrgLZUh9srdobjsiIDRtOqGxpQu4FQqXHEYWVAQ5ar_U"
        this.props.onAddToCart(product,token);
    }
    componentDidMount(){
        
    }
    render() {
        const { route } = this.props;

        const { product } = route.params;

        const {
            wrapper, cardStyle, header,
            footer, backStyle,
            imageContainer, cartStyle, textBlack,
            textSmoke, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor
        } = styles;
        return (
            <View style={wrapper}>
                <View style={cardStyle}>
                    <View style={header}>
                            <TouchableOpacity onPress={this.goBack.bind(this)}>
                                <Image style={backStyle} source={back} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onAddToCart(product)}>
                                <Image style={cartStyle} source={cart} />
                            </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={imageContainer}>
                            <View style={{ flexDirection: 'row', padding: 10, height: swiperHeight }} horizontal >
                                    <Image source={{ uri: `${url}${product.sanpham_anh}` }} style={productImageStyle} />
                            </View>
                        </View>
                        <View style={footer}>
                            <View style={titleContainer}>
                                <Text style={textMain}>
                                    <Text style={textBlack}>{product.sanpham_ten.toUpperCase()}</Text>
                                    <Text style={textHighlight}> / </Text>
                                    <Text style={textSmoke}>{(product.gia_tien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VNĐ</Text>
                                </Text>
                                <Text style={txtMaterial}>Khuyến mãi: {product.phan_tram_km} %</Text>
                            </View>
                            <Text>Tên shop</Text>
                            <View style={descContainer}>
                                {/* <Text style={descStyle}>{product.sanpham_mo_ta}</Text> */}

                                <HTML html={product.sanpham_mo_ta} imagesMaxWidth={Dimensions.get('window').width} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                                    {/* <View style={{ flexDirection: 'row' }} >
                                        <Text style={txtColor}>{color}</Text>
                                        <View style={{ height: 15, width: 15, backgroundColor: 'black'.toLowerCase(), borderRadius: 15, marginLeft: 10, borderWidth: 1, borderColor: '#C21C70' }} />
                                    </View> */}
                                </View>
                            </View>
                        </View>
                </ScrollView>
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
<<<<<<< HEAD
const mapDispatchToProps = (dispatch) => {
  return {
    //onAddToCart: (product,token) => dispatch(actAddToCartRequest(product,token)),
    onAddToCart: (a) => dispatch(actAddToCart(a)),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const { width } = Dimensions.get("window");
const swiperWidth = width / 1.8 - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#D6D6D6",
  },
  cardStyle: {
    flex: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  cartStyle: {
    width: 25,
    height: 25,
  },
  backStyle: {
    width: 25,
    height: 25,
  },
  productStyle: {
    width: width / 2,
    height: width / 2,
  },
  footer: {
    flex: 6,
  },
  imageContainer: {
    flex: 6,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  textMain: {
    paddingLeft: 20,
    marginVertical: 10,
  },
  textBlack: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3F3F46",
  },
  textSmoke: {
    fontSize: 20,
    color: "#9A9A9A",
  },
  textHighlight: {
    fontSize: 20,
    color: "#7D59C8",
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: "#F6F6F6",
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  descContainer: {
    margin: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  descStyle: {
    color: "#AFAFAF",
  },
  linkStyle: {
    color: "#7D59C8",
  },
  productImageStyle: {
    width: swiperWidth,
    height: swiperHeight,
    marginHorizontal: 5,
  },
  mainRight: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingLeft: 20,
  },
  txtColor: {
    color: "#C21C70",
    fontSize: 15,
    fontWeight: "400",
  },
  txtMaterial: {
    color: "#C21C70",
    fontSize: 15,
    fontWeight: "400",
  },
});
=======
const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product,token) => dispatch(actAddToCartRequest(product,token)),
    }
}
export default connect(null, mapDispatchToProps)(ProductDetail);

const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 7,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:50,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 6
    },
    imageContainer: {
        flex: 6,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10
    },
    textBlack: {

        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46'
    },
    textSmoke: {

        fontSize: 20,
        color: '#9A9A9A'
    },
    textHighlight: {

        fontSize: 20,
        color: '#7D59C8'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',

    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',

    }
});
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
