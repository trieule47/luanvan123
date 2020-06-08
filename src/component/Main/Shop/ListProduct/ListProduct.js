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
} from "react-native";
import { connect } from "react-redux";
import { actAllProductsRequest } from "./../../../../action/TopProductAction";

const sp1 =
  "http://vaomua.club/public/user/image/images//mon-ngon-tu-nam-kim-cham.jpg";
const url = "http://vaomua.club/public/user/image/images/";

class ListProduct extends Component {
  goBack() {
    const { navigation } = this.props;
    navigation.pop();
  }
  gotoDetail() {
    const { navigation } = this.props;
    navigation.push("ProductDetail");
  }
  componentDidMount() {
    this.props.GetProduct(1);
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
    } = styles;
    const { topproducts } = this.props;
    const { navigation } = this.props;
    return (
      <View style={container}>
        <ScrollView style={wrapper}>
            <View style={header}>
                <TouchableOpacity onPress={this.goBack.bind(this)} >
                    <Image source={backList} style={backStyle} />
                </TouchableOpacity>
                <Text style={titleStye}>NÔNG SẢN</Text>
                <View style={{ width: 30 }} />
            </View>
          {topproducts.allproduct.map((e) => (
            <View style={productContainer} key={e.id}>
              <Image
                style={productImage}
                source={{ uri: `${url}${e.sanpham_anh}` }}
              />
              <View style={productInfo}>
                <Text style={txtName}>{e.sanpham_ten}</Text>
                <Text style={txtPrice}>
                  {e.gia_tien
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
                  VNĐ
                </Text>
                <Text style={txtMaterial}>{e.phan_tram_km}</Text>
                <View style={lastRowInfo}>
                  <View
                    style={{
                      backgroundColor: "green",
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductDetail", {
                        product: e,
                      });
                    }}
                  >
                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductDetail", {
                        product: e,
                      });
                    }}
                  >
                    <Text style={txtShowDetail}>SHOP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                this.props.GetProduct(1)
              }
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 5,
                borderRadius: 5,
                margin: 4,
              }}
            >
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.GetProduct(2)
              }
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 5,
                borderRadius: 5,
                margin: 4,
              }}
            >
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.GetProduct(3)
              }
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 5,
                borderRadius: 5,
                margin: 4,
              }}
            >
              <Text>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.GetProduct(4)
              }
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 5,
                borderRadius: 5,
                margin: 4,
              }}
            >
              <Text>4</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={productContainer}>
                        <Image style={productImage} source={{uri: sp1}} />
                        <View style={productInfo}>
                            <Text style={txtName} >nấm kim châm</Text>
                            <Text style={txtPrice}>117$</Text>
                            <Text style={txtMaterial}>Material silk</Text>
                            <View style={lastRowInfo}>
                                <Text style={txtColor}> RoyalBlue</Text>
                                <View style={{ backgroundColor: 'cyan', height: 16, width: 16, borderRadius: 8 }} />
                                <TouchableOpacity onPress={this.gotoDetail.bind(this)} >
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            */}
                    
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topproducts: state.topproducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetProduct: (page) => dispatch(actAllProductsRequest(page)),
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
});
