import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Picker,
} from "react-native";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HTML from "react-native-render-html";
import {
  actAddProductRequest,
  actLoadMoreShopRequest,
  actGetLoHang,
  actGetLoaiSP,
  actGetDonViTinh,
} from "./../../../action/ShopAction";
import { connect } from "react-redux";
import { TextInput } from "react-native-paper";
import * as RootNavigation from "../../../navigation/RootNavigation";

const icBack = require("../../../media/appIcon/back_white.png");
const icLogo = require("../../../media/appIcon/ic_logo.png");

const url = "http://vaomua.club/public/user/image/images/";

const ur = require("../no-image.png");

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: " ",
      type: " ",
      sourceImage: " ",
      user: "",
      sanPham: {
        shop_id: "",
        lohang_id: "",
        sanpham_ten: "",
        sanpham_anh_app: "",
        sanpham_mo_ta: "",
        loaisanpham_id: "8",
        donvitinh_id: "1",
        gia_tien: "250000",
        phan_tram_km: "5",
        donvi_id: "2",
        active: "1",
        new: "1",
      },
    };
  }
  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: "" });
  }
  clearAllTextInput() {
    this.clearText("txtshop_id");
    this.clearText("txtlohang_id");
    this.clearText("txtsanpham_te");
    this.clearText("txtsanpham_anh_app");
    this.clearText("txtsanpham_mo_ta");
    this.clearText("txtloaisanpham_id");
    this.clearText("txtdonvitinh_id");
    this.clearText("txtgia_tien");
    this.clearText("txtphan_tram_km");
  }

  goBack() {
    const { navigation } = this.props;
    navigation.navigate("SanPhamView");
  }
  goBackToMain() {
    const { navigation } = this.props;
    navigation.navigate("Menu");
  }

  ThemSanPham() {
    this.props.AddProduct(
      this.state.sanPham,
      this.props.myshop.inforShop.id,
      this.props.user.token
    );
  }
  kiemTra() {
    this.setState({
      sanPham: {
        ...this.state.sanPham,
        shop_id: this.props.myshop.inforShop.id,
      },
    });
    if (
      this.state.sanPham.lohang_id == "" ||
      this.state.sanPham.sanpham_ten == "" ||
      this.state.sanPham.sanpham_anh_app == "" ||
      this.state.sanPham.sanpham_mo_ta == "" ||
      this.state.sanPham.loaisanpham_id == "" ||
      this.state.sanPham.donvitinh_id == "" ||
      this.state.sanPham.gia_tien == "" ||
      this.state.sanPham.phan_tram_km == ""
    ) {
      Alert.alert("Vui lòng nhập đủ thông tin !");
    } else {
      this.ThemSanPham();
      //this.clearAllTextInput();
    }
  }
  //////ttttttt
  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasPermission: status === "granted",
      type: Camera.Constants.Type.back,
    });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    this.setState({ sourceImage: result });
    this.setState({
      sanPham: { ...this.state.sanPham, sanpham_anh_app: result.base64 },
    });
  };
  componentDidMount() {
    this.props.GetLoaiSP();
    this.props.GetDonviTinh();
    this.props.GetLoHang(this.props.myshop.inforShop.id, this.props.user.token);
  }
  updateLohang = (id) => {
    this.setState({
      sanPham: { ...this.state.sanPham, lohang_id: id },
    });
  };
  updateLoai = (id) => {
    this.setState({
      sanPham: { ...this.state.sanPham, loaisanpham_id: id },
    });
  };
  updateDonVi = (id) => {
    this.setState({
      sanPham: { ...this.state.sanPham, donvitinh_id: id },
    });
  };
  render() {
    const { route, navigation, myshop } = this.props;
    const { hasPermission, type, sourceImage } = this.state;
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
    const {
      bButton,
      row1,
      iconStyle,
      titleStyle,
      container,
      controlStyle,
      singInStyle,
      signUpStyle,
      inactiveStyle,
      activeStyle,
      inputStyle,
      bigButton,
      buttonText,
      title1Style,
      picker,
      inputStyleMoTa,
    } = styles;
    return (
      <ScrollView style={container}>
        <View style={row1}>
          {/* <TouchableOpacity onPress={() => RootNavigation.goBack()}> */}
          <TouchableOpacity onPress={() => this.goBack()}>
            <Image source={icBack} style={iconStyle} />
          </TouchableOpacity>
          <Text style={titleStyle}>Nông sản</Text>
          <TouchableOpacity onPress={() => RootNavigation.navigate("Shop")}>
            <Image source={icLogo} style={iconStyle} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={title1Style}>
            {" "}
            ĐIỀN ĐẦY ĐỦ THÔNG TIN SẢN PHẨM MUỐN THÊM{" "}
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Image
              style={{ margin: 10, height: 100, width: 100 }}
              source={sourceImage != " " ? sourceImage : ur}
            />
            <TouchableOpacity
              onPress={this.pickImage.bind(this)}
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#111", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
          <View style={picker}>
            <Text style={{ flex: 1 }}>Lô Hàng </Text>
            <Picker
              style={{ flex: 3, backgroundColor: "pink" }}
              selectedValue={this.state.sanPham.lohang_id}
              onValueChange={this.updateLohang}
            >
              {myshop.lohang.map((e) => (
                <Picker.Item
                  label={"chọn lô hàng " + e.lohang_ky_hieu}
                  value={e.id}
                  key={e.id}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            ref={"txtsanpham_ten"}
            style={inputStyle}
            placeholder="sanpham_ten"
            onChangeText={(text) =>
              this.setState({
                sanPham: { ...this.state.sanPham, sanpham_ten: text },
              })
            }
          />
          <TextInput
            ref={"txtsanpham_mo_ta"}
            style={inputStyleMoTa}
            placeholder="sanpham_mo_ta"
            multiline={true}
            numberOfLines={3}
            onChangeText={(text) =>
              this.setState({
                sanPham: { ...this.state.sanPham, sanpham_mo_ta: text },
              })
            }
          />
          <View style={picker}>
            <Text style={{ flex: 1 }}>Loại sản phẩm </Text>
            <Picker
              style={{ flex: 3, backgroundColor: "pink" }}
              selectedValue={this.state.sanPham.loaisanpham_id}
              onValueChange={this.updateLoai}
            >
              {myshop.loaisanpham.map((e) => (
                <Picker.Item
                  label={"chọn loại " + e.loaisanpham_ten}
                  value={e.id}
                  key={e.id}
                />
              ))}
            </Picker>
          </View>
          <View style={picker}>
            <Text style={{ flex: 1 }}>Đơn vị tính </Text>
            <Picker
              style={{ flex: 3, backgroundColor: "pink" }}
              selectedValue={this.state.sanPham.donvitinh_id}
              onValueChange={this.updateDonVi}
            >
              {myshop.donvitinh.map((e) => (
                <Picker.Item
                  label={"chọn loại " + e.donvitinh_ten}
                  value={e.id}
                  key={e.id}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            ref={"txtgia_tien"}
            style={inputStyle}
            placeholder="gia_tien"
            keyboardType="number-pad"
            onChangeText={(text) =>
              this.setState({
                sanPham: { ...this.state.sanPham, gia_tien: text },
              })
            }
          />
          <TextInput
            ref={"txtphan_tram_km"}
            style={inputStyle}
            placeholder="phan_tram_km"
            keyboardType="number-pad"
            onChangeText={(text) =>
              this.setState({
                sanPham: { ...this.state.sanPham, phan_tram_km: text },
              })
            }
          />
          <View style={bButton}>
            <TouchableOpacity style={bigButton} onPress={() => this.kiemTra()}>
              <Text style={buttonText}>THÊM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={bigButton} onPress={() => this.goBack()}>
              <Text style={buttonText}>HỦY</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={title1Style}>
          <Text style={{ color: "yellow" }}>warnning </Text>
          HÃY ĐẢM BẢO ĐIỀN ĐẦY ĐỦ THÔNG TIN SẢN PHẨM MÀ BẠN MUỐN THÊM TRƯỚC KHI
          BẤM VÀO NÚT THÊM thanks you!
        </Text>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    AddProduct: (infor, id_shop, token) => {
      dispatch(actAddProductRequest(infor, id_shop, token));
    },
    GetLoHang: (id_shop, token) => {
      dispatch(actGetLoHang(id_shop, token));
    },
    GetLoaiSP: () => {
      dispatch(actGetLoaiSP());
    },
    GetDonviTinh: () => {
      dispatch(actGetDonViTinh());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    myshop: state.myshop,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const { width } = Dimensions.get("window");
const swiperWidth = width - 40;
const swiperHeight = width / 1.8 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3EBA77",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    alignItems: "center",
  },
  iconStyle: { width: 30, height: 30 },
  titleStyle: { color: "#FFF", fontSize: 30 },
  title1Style: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 50,
  },
  controlStyle: {
    flexDirection: "row",
  },
  inactiveStyle: {
    color: "#D7D7D7",
  },
  activeStyle: {
    color: "#3EBA77",
  },
  inputStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    marginBottom: 10,
    //borderRadius: 20,
    paddingLeft: 30,
    marginHorizontal: 20,
  },
  picker: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    marginBottom: 10,
    flexDirection: "row",
    paddingLeft: 30,
    marginHorizontal: 20,
  },
  inputStyleMoTa: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    paddingLeft: 30,
    marginHorizontal: 20,
  },
  bButton: {
    flexDirection: "row",
    padding: 20,
  },
  bigButton: {
    flex: 1,
    height: 50,
    width: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "400",
  },

  //111111111111111111
});
