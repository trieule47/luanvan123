import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import Header from './Header';
import SlideShop from './SlideShop';
import Detail from './Detail';

export default class ShopDetail extends Component {
    render() {
        const {
            container,
            titleContainer,
            title,
            body,
            productContainer,
            productImage,
            productName,
            productPrice,
          } = styles;

        const {  navigation } = this.props;
        const { shop } = this.props.route.params;
        //console.log('shop detail'+ JSON.stringify(shop));
        return (
            <View>
                <Header shop={shop.tenshop} navigation={navigation}/>
                <ScrollView style={{marginBottom: 80}}>
                    <Text style={container}>WELLCOME! Wellcome! </Text>
                    <SlideShop id_shop={shop.id} />
                    <View style={container}>
                        <Detail id_shop={shop.id} navigation={ this.props.navigation } />
                    </View>
                    
                </ScrollView>
            </View>
        )
    }
}


const { width } = Dimensions.get("window");
const productWidth = (width - 60) / 2;
const productImageHeight = (productWidth / 361) * 425;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    margin: 5,
    shadowColor: "#2E272B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  titleContainer: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
  },
  title: {
    color: "#D3D3CF",
    fontSize: 20,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  productContainer: {
    width: productWidth,
    shadowColor: "#2E272B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    paddingBottom: 10,
  },
  productImage: {
    width: productWidth,
    height: productImageHeight,
  },
  productName: {
    paddingLeft: 10,
    color: "#D3D3CF",
    fontWeight: "500",
    marginTop: 5,
  },
  productPrice: {
    paddingLeft: 10,

    color: "#662F90",
  },
});

