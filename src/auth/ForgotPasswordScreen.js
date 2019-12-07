import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    Linking,

    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {ButtonComponent} from '../components/ButtonComponent';
import {Colors} from '../utils/colors';
import strings from '../utils/Strings';
import AuthHeader from '../components/authHeader';
import Header from '../components/Header';
import {isValidEmail, Validations} from '../utils/Validations';
import {postAPi, signupApi} from '../api/http';
import Loader from '../components/loader';

/**
 * This class is used to forgot the password and send the reset password link to registered  email Id
 *
 * @author dipanshu jindal
 * @version 1.0
 */

export default class ForgotPasswordScreen extends Component {

    static navigationOptions = {
        // headerRight: (
        //     <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 20}}>
        //         <TouchableWithoutFeedback>
        //             <Image source={require('../assets/share.png')} >

        //             </Image>
        //         </TouchableWithoutFeedback>
        //     </View>
        // ),
        headerStyle: {borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0},
        headerTintColor: 'black',
        headerBackTitle: ' ',
    };


    constructor(props) {
        super(props);
        this.state = {email: '', error: null, loading: false};
        this._isMounted = true;
    }

    componentDidMount() {

    }

    handleFirstConnectivityChange = (isConnected) => {
        console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
        if (this._isMounted) {
            this.setState({isInternetConnected: isConnected});
        }
    };

    componentWillUnmount() {

    }


    /**
     * This method is used to check user enters the email and also checks the email is valid or not
     * @returns {boolean} true if email is valid else false
     */
    isValid() {
        const {username} = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username.length === 0) {
            this.showAlert('Error', 'Please enter email', false);
            return false;
        } else if (reg.test(username) === false) {
            this.showAlert('Error', 'Please enter valid email', false);
            return false;
        }
        return true;
    }


    /**
     * This method is call on click of submit button and check the validations
     * and if it is valid,then call the forgot password api
     */
    onSubmit = () => {
        if (this.isValid()) {
            if (this.state.isInternetConnected) {
                this.setState({isLoading: true});
                this.doSubmit();
            } else {

            }
        }

    };

    /**
     * This method is used to call the forgot password api
     */

    /*doSubmit() {
        fetch(`${Constant.SERVER_BASE_URL}api/v2/sabr_stagging_custom_apis/resetPassword?email=${this.state.username}&api_key=${Constant.API_KEY}` , {
            method: 'GET' ,
            headers: Constant.getHeaders() ,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'success') {
                    this.setState({isLoading: false});
                    this.showAlert('Success' , responseJson.success.message , true);
                } else {
                    this.setState({isLoading: false});
                    this.showAlert('Error' , responseJson.error.message.toString() , false);
                }
            })
            .catch((error) => {
                this.setState({isLoading: false})
                this.showAlert('Error' , 'Something went wrong. please check your internet connection and try again!' , false);
            });
    }
*/

    /**
     * This method is used to sho popup dialog
     * @param title :title of popup
     * @param message: message of popup
     * @param isFinish: true if success and goBack to previous screen else false for error
     */
    showAlert(title, message, isFinish) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'OK', onPress: () => {
                        if (isFinish) {
                            this.props.logout();
                        }
                    },

                },
            ],
            {cancelable: false},
        );
    }

    renderSignVpView() {

        return <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                    this.createPasswordTextInput.focus();
                }}
                blurOnSubmit={false}
            />
            <View style={styles.bottomLineView}/>

            <ButtonComponent txt={'Forgot Password'} btnPress={() => this.handleValidations()}/>

        </ScrollView>;
    }

    render() {
        return <View style={styles.container}>
            <Loader loading={this.state.loading}/>

            {/* <View style={{backgroundColor:Colors.purple,height:1,width:'100%'}}/> */}
            <AuthHeader/>

            {(Platform.OS === 'ios') && <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                {this.renderSignVpView()}
            </KeyboardAvoidingView>}
            {
                !(Platform.OS === 'ios') && this.renderSignVpView()
            }


        </View>;
    }

    handleValidations() {
        const {email} = this.state;
        if (!email.trim()) {
            alert('Please enter email');
        } else if (!isValidEmail(email)) {
            alert('Please enter valid email');
        } else {
            this.setState({loading: true});
            let bb = JSON.stringify({
                email: email,
            });

            postAPi('forget-password', bb).then((result) => {
                this.setState({loading: false});

                if (result.status == 200) {
                    //   alert("Password has been send successfully.")
                    // alert("Password Reset link send  successfully")
                    this.openPasswordLink(result.message);
                    //  Linking.openURL(result.message).then(r => alert(r))

                    // alert(result.message);
                    //this.props.navigation.goBack()
                } else {
                    alert('Something went wrong.Please try again.');
                    //   alert(JSON.stringify(result.message));
                }

            }).catch((e) => {
                this.setState({loading: false});
                alert(JSON.stringify(e));
            });


        }


    }


    openPasswordLink(link) {
        Alert.alert(
            'Success',
            'Reset password link has been send successfully.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        Linking.openURL(link).then(r => alert(r));
                        this.props.navigation.goBack();
                    },
                },
            ],
            {cancelable: false},
        );

    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        //   marginTop:50,

    },
    logoStyle: {
        alignSelf: 'center',
        marginTop: 50,

    }, titleTextStyle: {
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'Avenir-Roman',
    },
    input: {
        //margin: 15,
        height: 40,
        width: '70%',
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'Avenir-Heavy',
    },
    bottomLineView: {
        height: 1,
        width: '70%',
        alignSelf: 'center',
        backgroundColor: Colors.purple,

    },

});
