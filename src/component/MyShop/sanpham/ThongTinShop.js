import React, { Component } from "react";
import { View, Text, Image ,Dimensions,} from "react-native";
import { connect } from "react-redux";
import Header from "../Header";
import HTML from "react-native-render-html";
const ur = "http://vaomua.club/public/user/image/images/";

class ThongTinShop extends Component {
   
  render() {
    console.log(JSON.stringify(this.props.myshop.inforShop))
    const { navigation, myshop } = this.props;
    return (
      <View>
        <Header a={myshop.inforShop} navigation={this.props.navigation} />
        <View>
          <Text>Thông tin chi tiết shop của bạn</Text>
          <Image
            style={{ width: 100, height: 100, margin: 5, borderRadius: 10 }}
            source={{
              uri:
                myshop.inforShop.image_url
                  ? myshop.inforShop.image_url
                  : `${ur}${myshop.inforShop.image_name}`,
            }}
          />
          <Image source={myshop.inforShop.image_name} />
          <Text>Tên shop:{myshop.inforShop.tenshop}</Text>
          <Text>Địa chỉ: {myshop.inforShop.dia_chi}</Text>
          <Text>Số Điện Thoại: {myshop.inforShop.sdt}</Text>
          <Text>Email: {myshop.inforShop.email}</Text>
          <HTML
                html={myshop.inforShop.shop_mo_ta
                }
                imagesMaxWidth={Dimensions.get("window").width}
            />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myshop: state.myshop,
  };
};

export default connect(mapStateToProps, null)(ThongTinShop);
