import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
// Redux
import { actSignUpRequest } from "../../action/SignUpAction";
import { actSignInRequest } from "../../action/UserAction";

import { connect } from "react-redux";

import icBack from "../../media/appIcon/back_white.png";
import icLogo from "../../media/appIcon/ic_logo.png";
import { TouchableHighlight } from "react-native-gesture-handler";

import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ur = require("./no-image.png");

class Authantication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      info: {
        email: "",
        name: "",
        anh_user: "",
        password: "",
        diachi: "",
        sodienthoai: "",
      },
      repassword: "",
      info_SignIn: {
        email: "",
        password: "",
      },
      hasPermission: " ",
      type: " ",
      sourceImage: " ",
    };
  }
  signIn() {
    this.setState({ isSignIn: true });
  }
  signUp() {
    this.setState({ isSignIn: false });
  }

  goBackToMain() {
    const { navigation } = this.props;
    navigation.navigate("Menu");
  }

  onSignUp = (info) => {
    console.log("Action sign-u");

    this.props.onSignUp(info);
    
  };

  onSignIn = () => {
    console.log("Action sign-in");

    const a = {
      password: "123456",
      email: "test@1234.com",
    };
    this.props.onSignIn(a);
    //this.props.onSignIn(this.state.info_SignIn);
  };

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: "" });
  }

  clearAllTextInput() {
    this.clearText("txtEmail");
    this.clearText("txtName");
    this.clearText("txtAddress");
    this.clearText("txtPhone");
    this.clearText("txtPass");
    this.clearText("txtRePass");
  }

  async componentDidMount() {
    this.getPermissionAsync()
  } 

  getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted', type: Camera.Constants.Type.back});
  }

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

    this.setState({ sourceImage: result});
    this.setState({
      info: { ...this.state.info, anh_user : result.base64 },
    })
    //console.log('data '+ JSON.stringify(this.state.info.anh_user) );
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
    } = styles;

    const { signup, user } = this.props;
    const {hasPermission,type,sourceImage}= this.state;

    const signInJSX = (
      <View>
        <TextInput
          style={inputStyle}
          placeholder="Nhập Email hoặc Tên đăng nhập"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              info_SignIn: {
                ...this.state.info_SignIn,
                email: text,
              },
            });
          }}
          autoCapitalize="none"
        />
        <TextInput
          style={inputStyle}
          placeholder="Nhập mật khẩu của bạn"
          secureTextEntry
          onChangeText={(text) => {
            this.setState({
              info_SignIn: {
                ...this.state.info_SignIn,
                password: text,
              },
            });
          }}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={bigButton}
          onPress={() => {
            this.onSignIn(this.state.info_SignIn);
             }}
        >
          <Text style={buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );

    const signUpJSX = (
      <ScrollView>
        <TextInput
          style={inputStyle}
          ref={"txtEmail"}
          placeholder="Nhập địa chỉ Email của bạn"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              info: {
                ...this.state.info,
                email: text,
              },
            });
          }}
          autoCapitalize="none"
        />
        <TextInput
          style={inputStyle}
          ref={"txtName"}
          placeholder="Nhập tên của bạn"
          onChangeText={(text) => {
            this.setState({
              info: {
                ...this.state.info,
                name: text,
              },
            });
          }}
        />
        <View style={{flexDirection:'row', marginLeft: 10}}>
          <Image style={{ margin: 10 , height:100 , width:100 }} source={ sourceImage != " " ? sourceImage : ur} />
          <TouchableOpacity
          onPress={this.pickImage.bind(this)}
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Ionicons name="ios-photos" style={{ color: "#111", fontSize: 40 }} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={inputStyle}
          ref={"txtAddress"}
          placeholder="Nhập địa chỉ của bạn"
          onChangeText={(text) => {
            this.setState({
              info: {
                ...this.state.info,
                diachi: text,
              },
            });
          }}
        />
        <TextInput
          style={inputStyle}
          ref={"txtPhone"}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          onChangeText={(text) => {
            this.setState({
              info: {
                ...this.state.info,
                sodienthoai: text,
              },
            });
          }}
        />
        <TextInput
          style={inputStyle}
          ref={"txtPass"}
          placeholder="Nhập mật khẩu"
          onChangeText={(text) => {
            this.setState({
              info: {
                ...this.state.info,
                password: text,
              },
            });
          }}
        />
        <TextInput
          style={inputStyle}
          ref={"txtRePass"}
          placeholder="Nhập lại mật khẩu"
          onChangeText={(text) => {
            this.setState({
              repassword: text,
            });
          }}
        />
        <TouchableOpacity
          style={bigButton}
          onPress={() => {
            if (
              this.state.info.password !== this.state.repassword &&
              this.state.info.password.length < 6
            ) {
              Alert.alert("Mật khẩu nhập lại không đúng !");
            } else if (
              this.state.info.name == "" ||
              this.state.info.email == "" ||
              this.state.info.diachi == "" ||
              this.state.info.sodienthoai == ""
            ) {
              Alert.alert("Vui lòng nhập đủ thông tin !");
            } else {
              this.onSignUp(this.state.info);
              this.clearAllTextInput();
            }
          }}
        >
          <Text style={buttonText}>Đăng kí</Text>
        </TouchableOpacity>
      </ScrollView>
    );

    const { isSignIn } = this.state;
    //isSignIn == 'success'
    const mainJSX = isSignIn ? signInJSX : signUpJSX;
    return (
      <View style={container}>
        <View style={row1}>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={icBack} style={iconStyle} />
          </TouchableOpacity>
          <Text style={titleStyle}>Nông sản</Text>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={icLogo} style={iconStyle} />
          </TouchableOpacity>
        </View>
        {mainJSX}
        <View style={controlStyle}>
          <TouchableOpacity
            style={singInStyle}
            onPress={this.signIn.bind(this)}
          >
            <Text style={isSignIn ? activeStyle : inactiveStyle}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={signUpStyle}
            onPress={this.signUp.bind(this)}
          >
            <Text style={!isSignIn ? activeStyle : inactiveStyle}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signup: state.signup,
    user: state.user,
    myshop: state.myshop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (info) => {
      dispatch(actSignUpRequest(info));
    },
    onSignIn: (info) => {
      dispatch(actSignInRequest(info));
    }
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authantication);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3EBA77",
    padding: 20,
    justifyContent: "space-between",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    alignItems: "center",
  },
  iconStyle: { width: 30, height: 30 },
  titleStyle: { color: "#FFF", fontSize: 30 },
  controlStyle: {
    flexDirection: "row",
  },
  inactiveStyle: {
    color: "#D7D7D7",
  },
  activeStyle: {
    color: "#3EBA77",
  },
  singInStyle: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 1,
  },
  signUpStyle: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 1,
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