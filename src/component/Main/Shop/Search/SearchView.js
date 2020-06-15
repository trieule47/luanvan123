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
<<<<<<< HEAD
  FlatList,
=======
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
const Loai = [
  {
    title: " Nấm tươi",
    id: "2",
  },
  {
    title: " Rau sạch Đà Lạt",
    id: "3",
  },
  {
    title: " Rau hữu cơ",
    id: "4",
  },
  {
    title: " Hoa quả nhập khẩu",
    id: "7",
  },
  {
    title: " Hoa quả Việt Nam",
    id: "8",
  },
  {
    title: " Trái cây sấy",
    id: "9",
  },
  {
    title: " Gạo và các chế phẩm từ gạo",
    id: "10",
  },
];
const numColumns = 3;
class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      key: 3,
=======
      key: 1,
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
<<<<<<< HEAD
  Search(key) {
    this.setState({ key: key });
    this.search();
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity onPress={()=>{this.Search(item.id)}} style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      container,
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

=======
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

>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
    const { myshop, navigation } = this.props;
    return (
      <View style={wrapper}>
        <Header
          onOpen={() => {
            this.openMenu();
          }}
<<<<<<< HEAD
        >
        </Header>
        <FlatList
          data={formatData(Loai, numColumns)}
          style={container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
        {/* <View style={{ flexDirection: "column" }}>
          {Loai.map((e)=>(
            <TouchableOpacity onPress={()=>this.Search(e.id)}><Text>{e.title}</Text></TouchableOpacity>
          ))}
=======
        ></Header>
        <View style={{ flexDirection: "row" }}>
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
          <TextInput
            style={textIput}
            placeholder="Bạn muốn mua gì ?"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ key: text })}
          />
          <TouchableOpacity onPress={this.search.bind(this)}>
            <Text>search</Text>
          </TouchableOpacity>
<<<<<<< HEAD
        </View> */}
=======
        </View>
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
<<<<<<< HEAD
  container: {
    
    marginVertical: 5,
  },
  item: {
    backgroundColor: "#34B089",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 40, 
    borderRadius:10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
=======
>>>>>>> fad82dab7ae2a932f31487ebe42dcf3c79c42570
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
