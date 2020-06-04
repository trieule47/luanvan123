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

class DangKyShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopInfor: {
        avatar: "",
        c2: "",
        c7: "",
        c4: "",
        c5: "",
        c6: "",
        c7: "",
      },
    };
  }

  goBackToMain() {
    // const { navigation } = this.props;
    // navigation.navigate('Menu');
  }
  ShopSignUpp() {
    this.setState({
      shopInfor: { ...this.state.shopInfor, c7: this.props.user.infoUser.id },
    })

    this.props.ShopSignUp(this.state.shopInfor);
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

          <TextInput
            style={inputStyle}
            placeholder="Avatar shop"
            autoCapitalize="none"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, c1: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Tên shop"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, c2: text },
              })
            }

          />
          <TextInput
            style={inputStyle}
            placeholder="Địa chỉ"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, c3: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Số điện thoại"
            keyboardType="number-pad"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, c4: text },
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
                shopInfor: { ...this.state.shopInfor, c5: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="Mô tả"
            onChangeText={(text) =>
              this.setState({
                shopInfor: { ...this.state.shopInfor, c6: text },
              })
            }
          />
          <TextInput
            style={inputStyle}
            placeholder="id user"
            value={JSON.stringify(this.props.user.infoUser.id)}
          />
          
          <TouchableOpacity style={bigButton} onPress={() => this.ShopSignUpp()}>
            <Text style={buttonText}>SIGN IN NOW</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state =>{
  return{
    user: state.user,
    myshop: state.myshop,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ShopSignUp: (infor) => {
      dispatch(actShopSignUpRequest (infor));
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
