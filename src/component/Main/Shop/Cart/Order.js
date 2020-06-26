import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  Picker,
} from "react-native";
import { connect } from "react-redux";
import sp1 from "../../.././../media/temp/sp1.jpeg";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import callApi from "../../../../network/apiCaller";
import {
  actRemoveFromCart,
  actRemoveFromCartRequest,
  actUpQuantityCart,
  actDownQuantityCart,
  actOrderRequest,
  //actGetCart,
  Chiacard,
} from "./../../../../action/CartAtion";
import { actGetTTShop, actAddProduct } from "./../../../../action/ShopAction";
const url = "http://vaomua.club/public/user/image/images/";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      httt: "COD",
    };
  }
  gotoDetail() {
    const { navigation } = this.props;
    navigation.push("ProductDetail");
  }
  showSubTotal = (price, quantity) => {
    return price * quantity;
  };

  showTotalAmount = (cart) => {
    //console.log("qty reset :  "+JSON.stringify(cart));
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

  thanhtoan(cart, id_user) {
    if(cart.length < 1){
      alert('Giỏ hàng trống');
    }
    else{
    this.props.Chiacard(this.props.cart.Cart);
    this.props.actOrderRequest(cart, id_user , this.state.httt);
    }
  }
  componentDidMount(){
    this.props.Chiacard(this.props.cart.Cart);
    //this.thanhtoan(cart.Cart);
  }
  updateHinhThucThanhToan = (key) => {
    this.setState({ httt: key });
    alert(this.state.httt);
 }

  render() {
    var { cart, user, shop } = this.props;
    console.log("CartView " + JSON.stringify(cart));
    const { navigation } = this.props;

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
      listproduct,
      picker,
    } = styles;
      return (
        <ImageBackground
          source={require("../../../Authentication/vaomua.png")}
          style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
        >
          <View style={wrapper}>
            {cart.Carts.map((a)=>
            <FlatList 
              data={a}
              ListHeaderComponent={()=><View style={listproduct}
              key={a[0].shop_id}><Text>{a[0].tenshop}</Text></View>}
              renderItem={({ item }) => (
                <View style={product} key={a[0].shop_id}>
                  <Image
                    source={{
                      uri:
                        item.sanpham_anh_app == null
                          ? `${url}${item.sanpham_anh}`
                          : item.sanpham_anh_app,
                    }}
                    style={productImage}
                  />
                  <View style={{flex:3}}>
                   
                    <Text >{item.sanpham_ten}</Text>
                    
                  
                      <Text >{a[0].shop_id}
                        Giá:
                        {(item.gia_tien * item.qty)
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        $
                      </Text>   
                      <Text >SL: {item.qty}</Text>       
                      <Text >Shop:{item.tenshop}</Text>
                    
                    <View style={productController}>
                      <TouchableOpacity style={showDetailContainer}
                          onPress={() => {
                            navigation.navigate("ProductDetail", {
                              product: item,
                            });
                          }}
                        >
                          
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            //</View>
            )}
            <View style={picker}>
              <Text style={{ flex: 1 }}>Nhà cung cấp </Text>
              <Picker
                style={{
                  flex: 3,
                  backgroundColor: "pink",
                  height: 45,
                  marginHorizontal: 20,
                  paddingLeft: 20,
                  borderRadius: 20,
                  marginBottom: 20,
                  borderColor: "#2ABB9C",
                  borderWidth: 1,
                }}
                selectedValue = {this.state.httt} onValueChange = {this.updateHinhThucThanhToan}>

                  <Picker.Item
                    label={"Trả tiền khi nhận hàng" }
                    value={"COD"}
                  />
                   <Picker.Item
                    label={"Chuyển khoản" }
                    value={"BANK"}
                  />
                  
              </Picker>
            </View>
            {/* <TouchableOpacity
              style={checkoutButton}
             // onPress={() => this.thanhtoan(cart, user.infoUser.id)}
             onPress={() => this.props.Chiacard(cart.Cart)}

            >
              <Text style={checkoutTitle}>
                Tổng tiền {this.showTotalAmount(cart.Cart)} VNĐ (Thanh toán ngay)
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={checkoutButton}
              onPress={() => this.thanhtoan(cart.Carts, user.infoUser.id)}
            >
              <Text style={checkoutTitle}>
                Đặt  (Thanh toán ngay)
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    myshop: state.myshop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveFromCart: (item) => dispatch(actRemoveFromCart(item)),
    // actRemoveFromCartRequest: (item, token) =>
    // dispatch(actRemoveFromCartRequest(item, token)),
    onUpdateQuantity: (item) => dispatch(actUpQuantityCart(item)),
    onDownQuantity: (item) => dispatch(actDownQuantityCart(item)),
    //  getcart:(token) =>dispatch(actGetCart(token)),
    actOrderRequest: (item, id_user) =>
      dispatch(actOrderRequest(item, id_user)),
    Chiacard: (item) =>dispatch(Chiacard(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

const { width } = Dimensions.get("window");
const imageWidth = width / 10;
const imageHeight = (imageWidth * 452) / 250;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection:"column",
    flex: 1,
    // backgroundColor: "#DFDFDF",
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: "green",
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
  listproduct: {
    //flexDirection: "row",
    backgroundColor: "grey",
    borderRadius: 10,
    shadowColor: "#3B5458",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  product: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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
    width:200,
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
  picker: {
    flexDirection: "row",
    height: 45,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "#2ABB9C",
    borderWidth: 1,
  },
});
