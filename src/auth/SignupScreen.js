import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
    TextInput, ImageBackground, TouchableOpacity,
} from 'react-native';
import markerImg from '../../assets/mapmarker.png';
import {Colors} from '../utils/colors';
import {ButtonComponent} from '../components/ButtonComponent';
import AuthHeader from '../components/authHeader';
import {isValidEmail} from '../utils/Validations';
import {signupApi} from '../api/http';
import Loader from '../components/loader';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 70;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
import Passbase from "@passbase/button";

export default class SignupScreen extends React.Component {
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

        // 1 letter , 1 special character

        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            createPassword: '',
            confirmPassword: '',
            loading: false,
        };

    }

    renderSignVpView() {

        return <ScrollView style={{flex: 1, marginBottom: 20}}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={(firstName) => this.setState({firstName: firstName})}
                value={this.state.firstName}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                    this.lastNameTextInput.focus();
                }}
                blurOnSubmit={false}
            />
            <View style={styles.bottomLineView}/>
            <TextInput
                ref={(input) => {
                    this.lastNameTextInput = input;
                }}
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(lastName) => this.setState({lastName})}
                value={this.state.lastName}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                    this.emailTextInput.focus();
                }}
                blurOnSubmit={false}
            />
            <View style={styles.bottomLineView}/>
            <TextInput
                ref={(input) => {
                    this.emailTextInput = input;
                }}
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
            <TextInput
                ref={(input) => {
                    this.createPasswordTextInput = input;
                }}
                style={styles.input}
                placeholder="Create Password"
                secureTextEntry={true}
                onChangeText={(createPassword) => this.setState({createPassword})}
                value={this.state.createPassword}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                    this.confirmPasswordTextInput.focus();
                }}
                blurOnSubmit={false}
            />
            <View style={styles.bottomLineView}/>
            <TextInput
                ref={(input) => {
                    this.confirmPasswordTextInput = input;
                }}
                style={styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                value={this.state.confirmPassword}
                returnKeyType={'done'}


            />
            <View style={styles.bottomLineView}/>

            <ButtonComponent txt={'Create account'} btnPress={() => this.handleValidations()}/>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingBottom: 100}}>
                <Text style={{
                    color: 'grey',
                    fontFamily: 'Avenir-Heavy',
                    marginTop: 3,
                }}>{'Already have an account? '}</Text>
                <Text style={{color: Colors.purple, fontSize: 16, fontFamily: 'Avenir-Heavy'}}
                      onPress={() => this.props.navigation.navigate('LoginScreen')}>{'Sign in'}</Text>

            </View>
        </ScrollView>;
    }

    handleValidations() {
        const {firstName, lastName, email, createPassword, confirmPassword} = this.state;

        var mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

        if (!firstName.trim()) {
            alert('Please enter first name');
        } else if (!lastName.trim()) {
            alert('Please enter last name');
        } else if (!email.trim()) {
            alert('Please enter email');
        } else if (!isValidEmail(email.trim())) {
            alert('Please enter valid email');
        } else if (!createPassword.trim()) {
            alert('Please enter create password');
        } else if (createPassword.trim().length < 8 || createPassword.trim().length > 15) {
            alert('Password should be between 8-15 characters.');
        } else if (!mediumRegex.test(createPassword)) {
            alert('Please enter at-least one letter,one number and one special character.');
        } else if (!confirmPassword.trim()) {
            alert('Please enter confirm password');
        } else if (confirmPassword !== createPassword) {
            alert('Create Password does not match with confirm password');
        } else {
            // alert('User Created Successfully');
            this.setState({loading: true});

            signupApi(firstName, lastName, email, createPassword).then((result) => {
                this.setState({loading: false});
                if (result.status == 200) {
                    alert(result.message);
                    this.props.navigation.goBack()
                } else {
                    alert(JSON.stringify(result.message));
                }

            }).catch((e) => {
                this.setState({loading: false});
                alert(JSON.stringify(e));
            });

        }
    }

    render() {
        return <View style={styles.container}>

            <AuthHeader title={'Welcome!'}/>
            <Loader loading={this.state.loading}/>
            <VerifyButton
                apiKey={apiKey}
                onFinished={(error, authKey, additionalAttributes) => {}}
                additionalAttributes={{
                    customer_user_id: "",
                    another_attribute: ""
                }}
                prefillAttributes={{
                    email: "user@email.com",
                    country: "de"
                }}
                theme={{
                    accentColor: "#ff0000",
                    font: "Fira"
                }}
            />;

            {(Platform.OS === 'ios') && <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                {this.renderSignVpView()}
            </KeyboardAvoidingView>}
            {
                !(Platform.OS === 'ios') && this.renderSignVpView()
            }


        </View>;
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    logoStyle: {
        alignSelf: 'center',
        //  marginTop: 50,

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
