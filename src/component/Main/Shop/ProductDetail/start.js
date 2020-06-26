// import React, { Component } from 'react'
// import { Text, View ,StyleSheet,Image} from 'react-native'

// export default class start extends Component {
//     _rating(item) {
//         let rating = [];
//         for (var i = 0; i < item; i++) {
//           rating.push(
//             <Image
//               source={require('./star.png')}
//               style={{width: 15, height: 15, marginRight: 3}}
//               resizeMode="cover"
//             />,
//           );
//         }
//         return rating;
//       }
//     render() {
//         return (
//             <View>
//                 <View style={styles.rating}>{this._rating(4)}</View>
//             </View>
//         )
//     }
// }

// const styles=StyleSheet.create({
// rating: {
//     marginTop:5,
//     flexDirection:'row',
//   },
// })
'use strict';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from "react-native";
import React, {Component} from "react";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating ? this.props.rating : 4,
            max: this.props.max ? this.props.max : 5,
            iconWidth: this.props.iconWidth ? this.props.iconWidth : 36,
            iconHeight: this.props.iconHeight ? this.props.iconHeight : 36,
            iconSelected: this.props.iconSelected ? this.props.iconSelected : require('./star.png'),
            iconUnselected: this.props.iconUnselected ? this.props.iconUnselected : require('./star-512.webp'),
            editable: this.props.editable != null ? this.props.editable : true
        }
    }

    _onRate(rating) {
        this.setState({rating});
        if (this.props.onRate) {
            this.props.onRate(rating)
        }
    }

    render() {
        var icons = [];
        for (let i = 1; i <= this.state.max; i++) {
            icons.push(<TouchableWithoutFeedback
                disabled={!this.state.editable}
                key={i}
                style={{height:this.state.iconHeight,width:this.state.iconWidth}}
                onPress={()=>this._onRate(i)}
            >
                <Image style={{height:this.state.iconHeight,width:this.state.iconWidth}}
                       source={this.state.rating>=i?this.state.iconSelected:this.state.iconUnselected}/>
            </TouchableWithoutFeedback>)
        }
        return <View style={[this.props.style,{flexDirection:'row'}]}>
            {icons}
        </View>
    }
}

export default Rating;
