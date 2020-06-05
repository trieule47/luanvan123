import React, { Component } from 'react'
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';


class ThongTinShop extends Component {
    render() {
        const { navigation, myshop } = this.props;
        return (
            <View>
                <Header a={myshop.inforShop} navigation={this.props.navigation} />
                <View>
                    <Text>Thông tin chi tiết shop của bạn</Text>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        myshop: state.myshop,
    };
};

export default connect(mapStateToProps, null)(ThongTinShop);