import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header from "./Header";
import { connect } from "react-redux";
import {
  actShopGetProductRequest,
  actDSShopGetRequest,
  inforshop,
  actGetDonHang,
} from "./../../action/ShopAction";
import myshop from "../../reducers/search";

class DonHang extends Component {
  ComponentDidMount() {
    this.props.actGetDonHang(
      this.props.myshop.inforShop.id,
      this.props.user.token
    );
  }
  a() {
    this.props.actGetDonHang(
      this.props.myshop.inforShop.id,
      this.props.user.token
    );
  }
  render() {
    return (
      <View>
        <Header a={this.props.myshop.inforShop} />
        <Text>Đơn</Text>
        <TouchableOpacity onPress={() => this.a()}>
          <Text>update đơn</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.myshop.donhang}
          renderItem={({ item }) => (
            <Text>
              id:{item.id} {item.donhang_nguoi_nhan}{" "}
              {item.donhang_nguoi_nhan_email}{" "}
              {item.donhang_nguoi_nhan_dia_chi}{" "}
              {item.donhang_tong_tien}
              {" "}{item.hinhthucthanhtoan}
            </Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myshop: state.myshop,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShopGetProduct: (id) => dispatch(actShopGetProductRequest(id)),
    GetDSShop: () => dispatch(actDSShopGetRequest()),
    GetInforShop: (u, ds) => dispatch(inforshop(u, ds)),
    actGetDonHang: (id, token) => dispatch(actGetDonHang(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DonHang);
