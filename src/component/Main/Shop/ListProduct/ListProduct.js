import { ScrollView } from "react-native-gesture-handler";
import backList from "../../../../media/appIcon/backList.png";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { actAllProductsRequest } from "../../../../action/CategoryAction";
import { actLoadMoreRequest } from "../../../../action/CategoryAction";actGetTTShop
import { actGetTTShop } from "../../../../action/ShopAction";

const sp1 =
  "http://vaomua.club/public/user/image/images//mon-ngon-tu-nam-kim-cham.jpg";
const url = "http://vaomua.club/public/user/image/images/";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_loaisp: "",
    };
  }
  goBack() {
    const { navigation } = this.props;
    navigation.pop();
  }
  gotoDetail() {
    const { navigation } = this.props;
    navigation.push("ProductDetail");
  }
  componentDidMount() {
    this.props.GetProduct();
  }
  render() {
    const {
      container,
      header,
      wrapper,
      backStyle,
      titleStye,
      productContainer,
      productInfo,
      productImage,
      lastRowInfo,
      txtName,
      txtPrice,
      txtMaterial,
      txtColor,
      txtShowDetail,
      btnPlus,
    } = styles;
    const { category,myshop } = this.props;
    console.log("aaa " + JSON.stringify(category.sanphamshop));
    const { navigation } = this.props;
    return (
      <View style={container}>
        {/* <ScrollView > */}
        <View style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
              <Image source={backList} style={backStyle} />
            </TouchableOpacity>
            <Text style={titleStye}>NÔNG SẢN</Text>
            <View style={{ width: 30 }} />
          </View>
          <FlatList
            data={category.sanphamshop}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={productContainer}  onPress={() => {
                  navigation.navigate("ProductDetail", {
                    product: item,
                  });
                }}>
                  <Image
                    style={productImage}
                    source={{
                      uri:
                        item.sanpham_anh_app == null
                          ? `${url}${item.sanpham_anh}`
                          : item.sanpham_anh_app,
                    }}
                  />
                  <View style={productInfo}>
                    <Text style={txtName}>{item.sanpham_ten}</Text>
                    <Text style={txtPrice}>
                      Giá :{item.gia_tien
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
                      VNĐ
                    </Text>
                    <Text style={txtMaterial}>Giảm giá :{item.phan_tram_km} %</Text>
                    <View style={lastRowInfo}>
                     
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("ProductDetail", {
                            product: item,
                          });
                        }}
                      >
                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.actGetTTShop(item.shop_id)
                          ,
                          navigation.navigate("ShopDetail", {
                            shop: myshop.inforShopcard,
                          });
                        }}
                      >
                        <Text style={txtShowDetail}>SHOP</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={
              <View
                style={btnPlus}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.LoadMore(this.props.category.fisrt_page + 1);
                    console.log(
                      "San pham moi : " + JSON.stringify(category.sanphamshop)
                    );
                  }}
                >
                  <Text style={{ color: "#2CBE4E" }}>Xem thêm sản phẩm</Text>
                </TouchableOpacity>
              </View>
            }
          ></FlatList>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    myshop: state.myshop ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetProduct: () => dispatch(actAllProductsRequest()),
    LoadMore: (page) => {
      dispatch(actLoadMoreRequest(page));
    },
    actGetTTShop: (item) => dispatch(actGetTTShop(item)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DBDBD8",
    padding: 6,
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: "#FFF",
    shadowColor: "#2E272B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginBottom: 50,
  },
  backStyle: {
    width: 30,
    height: 30,
  },
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#D6D6D6",
  },
  titleStye: {
    color: "#34B089",
    fontSize: 20,
  },
  productImage: {
    width: 90,
    height: (90 * 452) / 361,
  },
  productInfo: {
    justifyContent: "space-between",
    marginLeft: 15,
    flex: 1,
  },
  lastRowInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtName: {
    color: "#BCBCBC",
    fontSize: 20,
    fontWeight: "400",
  },
  txtPrice: {
    color: "#34B089",
  },
  txtMaterial: {},
  txtColor: {},
  txtShowDetail: {
    color: "#34B089",
    fontSize: 11,
  },
  btnPlus:{
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2CBE4E",
    backgroundColor: "#FFF",
  },
});
