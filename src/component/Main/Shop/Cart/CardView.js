import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { connect } from "react-redux";
import sp1 from "../../.././../media/temp/sp1.jpeg";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import {
  actRemoveFromCart,
  actRemoveFromCartRequest,
  actUpQuantityCart,
  actDownQuantityCart,
  //actGetCart,
} from "./../../../../action/CartAtion";

const url = "http://vaomua.club/public/user/image/images/";

class CartView extends Component {
  gotoDetail() {
    const { navigation } = this.props;
    navigation.push("ProductDetail");
  }
  showSubTotal = (price, quantity) => {
    return price * quantity;
  };

  showTotalAmount = (cart) => {
    console.log(JSON.stringify(cart));
    var total = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        // total += cart[i].product.price * cart[i].quantity; bản đầu tiên
        total += cart[i].gia_tien * cart[i].qty;
      }
    }

    return total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  onRemoveFromCart = (item) => {
    this.props.onRemoveFromCart(item);
    // this.props.actRemoveFromCartRequest(item, this.props.user.token);
  };

  onUpdateQuantity = (item) => {
    this.props.onUpdateQuantity(item);
  };

  onDownQuantity = (item) => {
    this.props.onDownQuantity(item);
  };

  // componentDidMount(){
  //   this.props.getcart(this.props.user.token);
  // }

  render() {
    var { cart } = this.props;
    // console.log('CartView ' + JSON.stringify(cart) );
    const { navigation } = this.props;

<<<<<<< HEAD
    const {
      main,
      checkoutButton,
      checkoutTitle,
      wrapper,
      product,
      mainRight,
      productController,
      txtName,
      txtPrice,
      productImage,
      numberOfProduct,
      txtShowDetail,
      showDetailContainer,
    } = styles;

    return (
      <View style={wrapper}>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={product}>
              <Image
                source={{
                  uri:
                  item.sanpham_anh_app == null
                      ? `${url}${item.sanpham_anh}`
                      : item.sanpham_anh_app,
                }}
                style={productImage}
              />
              <View style={[mainRight]}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={txtName}>{item.sanpham_ten}</Text>
                  <TouchableOpacity onPress={() => this.onRemoveFromCart(item)}>
                    <Ionicons
                      name="ios-close-circle-outline"
                      color="black"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={txtPrice}>
                    {(item.gia_tien * item.qty)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                    $
                  </Text>
                </View>
                <View style={productController}>
                  <View style={numberOfProduct}>
                    <TouchableOpacity onPress={() => this.onDownQuantity(item)}>
                      <AntDesign name="minus" color="black" size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>{item.qty}</Text>
                    <TouchableOpacity
                      onPress={() => this.onUpdateQuantity(item)}
                    >
                      <AntDesign name="plus" color="black" size={30} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={showDetailContainer}>
                    <Text
                      style={txtShowDetail}
                      onPress={() => {
                        navigation.navigate("ProductDetail", {
                          product: item,
                        });
                      }}
                    >
                      SHOW DETAILS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
=======
    render() {
        var { cart } = this.props;
       // console.log('CartView ' + JSON.stringify(cart) );
        const { navigation } = this.props;

        const { main, checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;

        return (
            <View style={wrapper}>
                <FlatList
                    data={cart}
                    renderItem={({ item }) =>
                        <View style={product}>
                            <Image source={{ uri: `${url}${item.sanpham_anh}` }} style={productImage} />
                            <View style={[mainRight]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtName}>{item.sanpham_ten}</Text>
                                    <TouchableOpacity onPress={() => this.onRemoveFromCart(item)} >
                                        <Ionicons name="ios-close-circle-outline" color="black" size={30} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={txtPrice}>{(item.gia_tien * item.qty).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}$</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity onPress={() => this.onDownQuantity(item)} >
                                            <AntDesign name="minus" color="black" size={30} />
                                        </TouchableOpacity>
                                        <Text style={{fontSize: 20}}>{item.qty}</Text>
                                        <TouchableOpacity onPress={() => this.onUpdateQuantity(item)}>
                                            <AntDesign name="plus" color="black" size={30} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer}>
                                        <Text style={txtShowDetail} onPress={() => {
                                            navigation.navigate('ProductDetail', {
                                                product: item
                                            })
                                        }} >SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity style={checkoutButton}>
                    <Text style={checkoutTitle}>Tổng tiền {this.showTotalAmount(cart)} VNĐ (Thanh toán ngay)</Text>
                </TouchableOpacity>
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={checkoutButton}>
          <Text style={checkoutTitle}>
            Tổng tiền {this.showTotalAmount(cart)} VNĐ (Thanh toán ngay)
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveFromCart: (item) => dispatch(actRemoveFromCart(item)),
    // actRemoveFromCartRequest: (item, token) =>
    //    dispatch(actRemoveFromCartRequest(item, token)),
    onUpdateQuantity: (item) => dispatch(actUpQuantityCart(item)),
    onDownQuantity: (item) => dispatch(actDownQuantityCart(item)),
    //  getcart:(token) =>dispatch(actGetCart(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);

const { width } = Dimensions.get("window");
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#DFDFDF",
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: "#2ABB9C",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    width,
    backgroundColor: "#DFDFDF",
  },
  checkoutTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  product: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    shadowColor: "#3B5458",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: "center",
  },
  mainRight: {
    flex: 3,
    justifyContent: "space-between",
  },
  productController: {
    flexDirection: "row",
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txtName: {
    paddingLeft: 20,
    color: "#A7A7A7",
    fontSize: 20,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  txtPrice: {
    paddingLeft: 20,
    color: "#C21C70",
    fontSize: 20,
    fontWeight: "400",
  },
  txtShowDetail: {
    color: "#C21C70",
    fontSize: 10,
    fontWeight: "400",

    textAlign: "right",
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
