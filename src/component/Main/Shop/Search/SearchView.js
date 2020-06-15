import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import Header from "../Header";
import { actSPTheoLoaiRequest } from "../../../../action/SearchAction";
import { connect } from "react-redux";

const url = "http://vaomua.club/public/user/image/images/";
const sp1 =
  "http://vaomua.club/public/user/image/images//mon-ngon-tu-nam-kim-cham.jpg";

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
    };
  }
  gotoDetail() {
    const { navigation } = this.props;
    navigation.push("ProductDetail");
  }
  openMenu() {
    this.props.navigation.openDrawer();
  }
  search() {
    this.props.GetSPTheoLoai(this.state.key, this.props.user.token);
  }
  render() {
    const {
      product,
      mainRight,
      txtMaterial,
      txtColor,
      txtName,
      txtPrice,
      productImage,
      txtShowDetail,
      showDetailContainer,
      wrapper,
      textIput,
    } = styles;

    const { myshop, navigation } = this.props;
    return (
      <View style={wrapper}>
        <Header
          onOpen={() => {
            this.openMenu();
          }}
        ></Header>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={textIput}
            placeholder="Bạn muốn mua gì ?"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ key: text })}
          />
          <TouchableOpacity onPress={this.search.bind(this)}>
            <Text>search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {myshop.sanphamtheoloai.map((e) => (
            <TouchableOpacity
              style={product}
              key={e.id}
              onPress={() => {
                navigation.navigate("ProductDetail", {
                  product: e,
                });
              }}
            >
              <Image
                //2 nơi lưu ảnh nên phải làm thế này
                source={{
                  uri:
                    e.sanpham_anh_app == null
                      ? `${url}${e.sanpham_anh}`
                      : e.sanpham_anh_app,
                }}
                style={productImage}
              />
              <View style={mainRight}>
                <Text style={txtName}>{e.sanpham_ten.toUpperCase()}</Text>
                <Text style={txtPrice}>
                  {"Giá : "}
                  {e.gia_tien
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  {" vnd"}
                </Text>
                <Text style={txtMaterial}>
                  {"Khuyến mãi : " + e.phan_tram_km} %
                </Text>

                <TouchableOpacity style={showDetailContainer}>
                  <Text style={txtShowDetail}>SHOW DETAILS</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          {/* <View style={product}>
            <Image source={{ uri: sp1 }} style={productImage} />
            <View style={mainRight}>
              <Text style={txtName}>{toTitleCase("nấm kim châm")}</Text>
              <Text style={txtPrice}>100$</Text>
              <Text style={txtMaterial}>Material Fur</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={txtColor}>Color white</Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: "white",
                      borderRadius: 15,
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity style={showDetailContainer}>
                <Text style={txtShowDetail}>SHOW DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </ScrollView>
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

const mapDispatchToProps = (dispatch) => {
  return {
    GetSPTheoLoai: (key, token) => {
      dispatch(actSPTheoLoaiRequest(key, token));
    },
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(SearchView);

const { width } = Dimensions.get("window");
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F6F6F6",
    flex: 1,
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
  },
  txtPrice: {
    paddingLeft: 20,
    color: "#C21C70",
    fontSize: 15,
    fontWeight: "400",
  },
  txtColor: {
    paddingLeft: 20,
    color: "black",
    fontSize: 15,
    fontWeight: "400",
  },
  txtMaterial: {
    paddingLeft: 20,
    color: "black",
    fontSize: 15,
    fontWeight: "400",
  },
  txtShowDetail: {
    color: "#C21C70",
    fontSize: 10,
    fontWeight: "400",

    textAlign: "right",
  },
  showDetailContainer: {
    flexDirection: "row",
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 100,
  },
  textIput: {
    height: height / 23,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingVertical: 0,
  },
});
