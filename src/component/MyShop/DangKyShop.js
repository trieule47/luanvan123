import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import icBack from "../../media/appIcon/back_white.png";
import icLogo from "../../media/appIcon/ic_logo.png";
import * as RootNavigation from "../../navigation/RootNavigation";
import { connect } from "react-redux";
import { actShopSignUpRequest } from "../../action/ShopAction";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const ur = require("../Authentication/no-image.png");

class DangKyShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopInfor: {
        image_name: "",
        tenshop: "",
        dia_chi: "",
        sdt: "",
        email: "",
        shop_mo_ta: "",
        user_id: "",
      },
      hasPermission: " ",
      type: " ",
      sourceImage: " ",
    };
  }
  async componentDidMount() {
    // console.log(this.props.user.infoUser.email);
     this.setState({
         info: { ...this.state.info, email :this.props.user.infoUser.email },
       });
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

  // setType(){
  //   const { type } = this.state

  //   this.setState({type:
  //     type === Camera.Constants.Type.back
  //     ? Camera.Constants.Type.front
  //     : Camera.Constants.Type.back
  //   })
  // }
  // takePicture = async () => {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync( options)
  //       .then(data =>{ this.setState({sourceImage: JSON.stringify(data)})
  //        //,           console.log("data : "+"  "+ this.state.sourceImage)
  //       })
  //       .catch(error => console.log('eror', error));
  //     console.log('Exiting takePicture()');
  //   }
  // };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    this.setState({ sourceImage: result });
    this.setState({
      shopInfor: { ...this.state.shopInfor, image_name: result.base64 },
    });
    //console.log('data '+ JSON.stringify(this.state.info.anh_user) );
  };


  goBackToMain() {
    // const { navigation } = this.props;
    // navigation.navigate('Menu');
  }
  componentDidMount() {
    this.setState({
      shopInfor: {
        ...this.state.shopInfor,
        user_id: this.props.user.infoUser.id,
      },
    });
    if(this.props.user.infoUser.mo_shop == 1)
    {
      alert('tài khoản đã đăng ký shop trước đó');
     // RootNavigation.navigate('SanPhamView');
    }
  }
  ShopSignUpp() {
    console.log(JSON.stringify(this.state.shopInfor));
    if (
      this.state.shopInfor.tenshop == "" ||
      this.state.shopInfor.dia_chi == "" ||
      this.state.shopInfor.sdt == "" ||
      this.state.shopInfor.email == "" ||
      this.state.shopInfor.user_id == ""
    )
      alert("Vui lòng nhập đủ thông tin");
    else this.props.ShopSignUp(this.state.shopInfor, this.props.user.token);
  }
  render() {
    const {
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
    } = styles;

    return (
      <View style={container}>
        <View style={row1}>
          <TouchableOpacity onPress={() => RootNavigation.goBack()}>
            <Image source={icBack} style={iconStyle} />
          </TouchableOpacity>
          <Text style={titleStyle}>Nông sản</Text>
          <TouchableOpacity>
            <Image source={icLogo} style={iconStyle} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={title1Style}>
            {" "}
            ĐIỀN ĐẦY ĐỦ THÔNG TIN ĐƠN VỊ KINH DOANH{" "}
          </Text>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Image
                style={{ margin: 10, height: 100, width: 100 }}
                source={this.state.sourceImage != " " ? this.state.sourceImage : ur}
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
          <TextInput
            style={inputStyle}
            placeholder="Tên shop"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, tenshop: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Địa chỉ"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, dia_chi: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Số điện thoại"
            keyboardType="number-pad"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, sdt: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Địa chỉ email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, email: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Mô tả"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, shop_mo_ta: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="id user"
            value={JSON.stringify(this.props.user.infoUser.id)}
          />

          <TouchableOpacity
            style={bigButton}
            onPress={() => this.ShopSignUpp()}
          >
            <Text style={buttonText}>SIGN IN NOW</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    myshop: state.myshop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ShopSignUp: (infor, token) => {
      dispatch(actShopSignUpRequest(infor, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DangKyShop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3EBA77",
    padding: 20,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    alignItems: "center",
  },
  iconStyle: { width: 30, height: 30 },
  titleStyle: { color: "#FFF", fontSize: 30 },
  title1Style: { color: "#FFF", fontSize: 20, textAlign: "center" },
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
    height: 50,
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 30,
  },
  bigButton: {
    height: 50,
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
});
