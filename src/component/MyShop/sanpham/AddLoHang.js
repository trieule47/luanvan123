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
  Picker,
} from "react-native";
import backSpecial from "../../../media/appIcon/backs.png";
import { connect } from "react-redux";
import { actChangeInfoRequest } from "../../../action/UserAction";
import { actAddLoHang, actGetNhaCungCap } from "../../../action/ShopAction";

class AddLoHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lohang: {
        shop_id: "",
        lohang_ky_hieu: "",
        lohang_han_su_dung: "",
        lohang_gia_mua_vao: "",
        lohang_gia_ban_ra: "",
        lohang_so_luong_nhap: "",
        lohang_so_luong_da_ban: "",
        lohang_so_luong_doi_tra: "",
        lohang_so_luong_hien_tai: "",
        lohang_tinh_trang: "1",
        nhacungcap_id: "1",
      },
    };
  }

  goBackToMain() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: "" });
  }
  componentDidMount() {
    this.props.getNhaCungCap();
    const id = this.props.myshop.inforShop.id;
    this.setState({
      lohang: {
        ...this.state.lohang,
        shop_id: id,
      },
    });
  }
  clearAllTextInput() {
    this.clearText("lohang_ky_hieu");
    this.clearText("lohang_han_su_dung");
    this.clearText("lohang_gia_mua_vao");
    this.clearText("lohang_gia_ban_ra");
    this.clearText("lohang_so_luong_nhap");
    this.clearText("lohang_so_luong_da_ban");
    this.clearText("lohang_so_luong_doi_tra");
    this.clearText("lohang_so_luong_hien_tai");
    this.clearText("nhacungcap_id");
  }

  KiemTra() {
    const { lohang } = this.state;
    if (
      lohang.lohang_gia_ban_ra == "" ||
      lohang.lohang_gia_mua_vao == "" ||
      lohang.lohang_han_su_dung == "" ||
      lohang.lohang_ky_hieu == "" ||
      lohang.lohang_so_luong_da_ban == "" ||
      lohang.lohang_so_luong_doi_tra == "" ||
      lohang.lohang_so_luong_hien_tai == "" ||
      lohang.lohang_so_luong_nhap == "" ||
      lohang.nhacungcap_id == "" ||
      lohang.shop_id == ""
    )
      alert("vui lòng nhập đủ thông tin");
    else {
      this.props.addLoHang(lohang, this.props.user.token);
    }
  }
  updateNhaCungCap = (id) => {
    this.setState({
      lohang: { ...this.state.lohang, nhacungcap_id: id },
    });
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
      picker,
    } = styles;

    const { user, myshop } = this.props;
    const { sourceImage } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={wrapper}>
          <View style={header}>
            <View />
            <Text style={headerTitle}>LÔ HÀNG BÁN</Text>
            <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
              <Image source={backSpecial} style={backIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={body}>
            <TextInput
              ref={"lohang_ky_hieu"}
              style={textInput}
              autoCapitalize="characters"
              placeholder="Nhập ký hiệu lô hàng"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_ky_hieu: text,
                  },
                })
              }
            />

            <TextInput
              ref={"lohang_han_su_dung"}
              style={textInput}
              placeholder="Nhập hạn xử dụng"
              autoCapitalize="none"
              keyboardType="name-phone-pad"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_han_su_dung: text,
                  },
                })
              }
            />
            <TextInput
              ref={"lohang_gia_mua_vao"}
              style={textInput}
              placeholder="Nhập giá mua vào"
              keyboardType="numeric"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_gia_mua_vao: text,
                  },
                })
              }
            />
            <TextInput
              ref={"lohang_gia_ban_ra"}
              style={textInput}
              placeholder="Giá bán ra"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_gia_ban_ra: text,
                  },
                })
              }
            />
            <TextInput
              ref={"lohang_so_luong_nhap"}
              style={textInput}
              placeholder="Số lượng nhập"
              keyboardType="numeric"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_so_luong_nhap: text,
                  },
                })
              }
            />
            <TextInput
              ref={"lohang_so_luong_da_ban"}
              style={textInput}
              placeholder="Số lượng đã bán"
              keyboardType="numeric"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_so_luong_da_ban: text,
                  },
                })
              }
            />
            <TextInput
              ref={"lohang_so_luong_doi_tra"}
              style={textInput}
              placeholder="Số lượng đổi tra"
              keyboardType="numeric"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_so_luong_doi_tra: text,
                  },
                })
              }
            />
            <TextInput
              ref={"lohang_so_luong_hien_tai"}
              style={textInput}
              placeholder="Số lượng hiện tại"
              keyboardType="numeric"
              autoCapitalize="none"
              onChangeText={(text) =>
                this.setState({
                  lohang: {
                    ...this.state.lohang,
                    lohang_so_luong_hien_tai: text,
                  },
                })
              }
            />
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
                selectedValue={this.state.lohang.nhacungcap_id}
                onValueChange={this.updateNhaCungCap}
              >
                {myshop.nhacungcap.map((e) => (
                  <Picker.Item
                    label={"chọn " + e.nhacungcap_ten}
                    value={e.id}
                    key={e.id}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={signInContainer}
               onPress={this.KiemTra.bind(this)}
              // onPress={() =>
              //   console.log(JSON.stringify(this.state.lohang))
              // }
            >
              <Text style={signInTextStyle}>THÊM LÔ HÀNG</Text>
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
    myshop: state.myshop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeInfo: (id, info, token) => {
      dispatch(actChangeInfoRequest(id, info, token));
    },
    addLoHang: (data, token) => {
      dispatch(actAddLoHang(data, token));
    },
    getNhaCungCap: () => {
      dispatch(actGetNhaCungCap());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddLoHang);
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
