'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Button,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform
    
} from 'react-native';

import { WebView } from 'react-native-webview';

export default class PdfPreviewScreen extends Component {

    static navigationOptions = {
        headerStyle: { borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0 },
        headerTintColor: 'black',
    };

    constructor(props) {
        super(props);
    }
    
    render() {
        var pdf = this.props.navigation.getParam('pdf')
        
        if ((Platform.OS === 'ios') === false) {
            pdf = "https://drive.google.com/viewerng/viewer?embedded=true&url=" + this.props.navigation.getParam('pdf')
        }

        return (
            <View style={{flex:1}}>
            { (this.props.navigation.getParam('pdf')=="") ?

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#000',fontSize:22,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>Sorry! No PDF Available</Text>
            </View>
            :
            <WebView
                source={{ uri: pdf}}
                style={{ marginTop: 20 }}
            />
        }
        </View>
        );
    }
}
