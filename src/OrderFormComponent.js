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
    Alert,
    Platform
} from 'react-native';
import { ActivityIndicator } from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

Form.stylesheet.controlLabel.normal.fontFamily = 'Roboto-Bold';
Form.stylesheet.controlLabel.error.fontFamily = 'Roboto-Bold'; 
// Form.stylesheet.controlLabel.normal.fontWeight = "bold";
// Form.stylesheet.controlLabel.error.fontWeight = "bold";


// here we are: define your domain model
var Person = t.struct({
    FirstName: t.String,              // a required string
    LastName: t.String,  // an optional string t.maybe(t.String)
    Email: t.String,        // a email
    MobileNumber: t.Number,       // a email
    AmountYouWishToInvest: t.Number, // 
});

export default class PreviewOrderComponent extends Component {

    static navigationOptions = {
        headerStyle: { borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0  },
        headerTintColor: 'black',
        headerBackTitle: " ",
        title: "Investment Form"
    };

    options = {
        fields: {
            FirstName: {
                placeholder: 'First name'
            },
            LastName: {
                placeholder: 'Last name'
            },
            Email: {
                placeholder: 'someone@example.com',
                keyboardType: 'email-address'
            },
            MobileNumber: {
                placeholder: 'Mobile number',
                keyboardType: 'phone-pad'
            },
            AmountYouWishToInvest: {
                placeholder: 'Amount',
                label: 'Investment amount ($)'
            },
        }
    }; // optional rendering options (see documentation)

    constructor(props) {
        super(props);
        this.state = {
            showIndicator: false,
            value: {
                AmountYouWishToInvest: this.props.navigation.getParam('amountWishToInvest')
            }
        }
    }

    onPress = () =>  {
        var value = this.refs.form.getValue();
        const item = this.props.navigation.getParam('listItem');

        if (value) { 
            let formdata = new FormData();
            formdata.append("first_name", value.FirstName)
            formdata.append("last_name", value.LastName)
            formdata.append("email", value.Email)
            formdata.append("mobile", value.MobileNumber)
            formdata.append("amount_interested_to_invest", value.AmountYouWishToInvest)
            formdata.append("property_id", item.property_id)

            console.log("form data")
            console.log(formdata)
            
            let json = JSON.stringify({
                first_name: value.FirstName,
                last_name: value.LastName,
                email: value.Email,
                mobile: value.MobileNumber,
                amount_interested_to_invest: value.AmountYouWishToInvest,
                property_id: item.property_id
            })

            console.log(json)
            
            this.setState({
                showIndicator: true
            });

            fetch('http://dev.w3ondemand.com/properties_development/Wooapi/ssyymcddUFopjn/SendDeatilByEmail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: Platform.OS === 'ios' ? formdata :json,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log("response recieved")
                    console.log(responseJson)
                    this.setState({
                        showIndicator: false
                    }, function () {
                            Alert.alert('Thank you!', 'We will get back to you shortly.')
                    });
                })
                .catch((error) => {
                    console.log("response error")
                    this.setState({
                        showIndicator: false
                    });
                    Alert.alert("Error", "Something went wrong, pls try again");
                });;
        } else {
            Alert.alert("Error", 'Please verify all information and then submit.')
        }
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (this.state.showIndicator) {
            button = (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#6a08fd"/>
                </View>
            )
        } else {
            button = (
                <TouchableOpacity activeOpacity={.5} onPress={this.onPress}>
                    <ImageBackground 
                        source={require('../assets/buttonBg.png')} 
                        style={styles.bottomButtonImage}
                        imageStyle={{ borderRadius: 6 }}>
                        <Text style={styles.bottomButtonText}>Submit</Text>
                    </ImageBackground>
                </TouchableOpacity> 
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Form
                        ref="form"
                        type={Person}
                        options={this.options}
                        value={this.state.value}
                    />
                    <View style={styles.actionButtonView}>
                        <View style={styles.bottomButtonContainer}>
                            {button}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bottomButtonText: {
        marginTop: (Platform.OS == "ios") ? 10 : 10,
        textAlign: "center", 
        color: "#fff"
    },
    bottomButtonImage: {
        width: '100%', height: '100%'
    },
    bottomButtonContainer: {
        marginTop: 16, height: 40, marginLeft: 0, marginRight: 0
    },
    actionButtonView: {
        height: 70
    },
    container: {
        justifyContent: 'center',
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
        backgroundColor: '#ffffff',
    }
});