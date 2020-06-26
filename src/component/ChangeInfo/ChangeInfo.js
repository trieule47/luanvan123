import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import backSpecial from "../../media/appIcon/backs.png";
import { connect } from "react-redux";
import { actChangeInfoRequest } from "../../action/UserAction";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const ur = require("../Authentication/no-image.png");

class ChangeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        email: "",
        name: "",
        anh_user: "",
        password: "",
        diachi: "",
        sodienthoai: "",
      },
      hasPermission: " ",
      type: " ",
      sourceImage: " ",
    };
  }
  
  goBackToMain() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  onChangeInfo = (id, token) => {
   
   // console.log("b :" + JSON.stringify(this.state.info));
    this.props.onChangeInfo(id, this.state.info, token);
  };

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: "" });
  }

  clearAllTextInput() {
    this.clearText("txtName");
    this.clearText("txtAddress");
    this.clearText("txtPhone");
    this.clearText("txtPass");
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
      info: { ...this.state.info, anh_user: result.base64 },
    });
    //console.log('data '+ JSON.stringify(this.state.info.anh_user) );
  };

  render() {
    const {
      wrapper,
      header,
      headerTitle,
      backIconStyle,
      body,
      signInContainer,
      signInTextStyle,
      textInput,
    } = styles;

    const { user } = this.props;
    const { sourceImage } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={wrapper}>
          <View style={header}>
            <View />
            <Text style={headerTitle}>User Infomation</Text>
            <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
              <Image source={backSpecial} style={backIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={body}>
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
            
            <TextInput
              ref={"txtEmail"}
              style={textInput}
              value={this.props.user.infoUser.email}
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  info: {
                    ...this.state.info,
                    name: text,
                  },
                })
              }
            />

            <TextInput
              ref={"txtName"}
              style={textInput}
              placeholder="Enter your name"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  info: {
                    ...this.state.info,
                    name: text,
                  },
                })
              }
            />
            <TextInput
              ref={"txtAddress"}
              style={textInput}
              placeholder="Enter your address"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  info: {
                    ...this.state.info,
                    diachi: text,
                  },
                })
              }
            />
            <TextInput
              ref={"txtPhone"}
              style={textInput}
              placeholder="Enter your phone number"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(text) =>
                this.setState({
                  info: {
                    ...this.state.info,
                    sodienthoai: text,
                  },
                })
              }
            />
            <TextInput
              ref={"txtPass"}
              style={textInput}
              placeholder="Enter your password"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  info: {
                    ...this.state.info,
                    password: text,
                  },
                })
              }
            />
            <TouchableOpacity
              style={signInContainer}
              onPress={() => {
                this.onChangeInfo(user.infoUser.id, user.token);
                //this.clearAllTextInput();
               
              }}
            >
              <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeInfo: (id, info, token) => {
      dispatch(actChangeInfoRequest(id, info, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#fff" },
  header: {
    flex: 1,
    backgroundColor: "#2ABB9C",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  }, // eslint-disable-line
  headerTitle: { color: "#fff", fontSize: 20 },
  backIconStyle: { width: 30, height: 30 },
  body: {
    flex: 10,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    paddingTop: 30,
  },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",

    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "#2ABB9C",
    borderWidth: 1,
  },
  signInTextStyle: {
    color: "#FFF",
    fontWeight: "600",
    paddingHorizontal: 20,
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: "#2ABB9C",
    borderRadius: 20,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signInStyle: {
    flex: 3,
    marginTop: 50,
  },
});
