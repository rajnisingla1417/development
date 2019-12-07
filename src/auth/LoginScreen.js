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
import strings from '../utils/Strings';
import {isValidEmail} from '../utils/Validations';
import Loader from '../components/loader';
import {loginAPi, signupApi} from '../api/http';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 70;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        // headerRight: (
        //     <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 20}}>
        //         <TouchableWithoutFeedback>
        //             <Image source={require('../assets/share.png')} >

        //             </Image>
        //         </TouchableWithoutFeedback>
        //     </View>
        // ),
        headerStyle: { borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0  },
        headerTintColor: 'black',
        headerBackTitle: " "
    };
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading:false

        };

    }

    renderSignVpView() {

        return <ScrollView style={{flex: 1, marginBottom: 20}}>

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
            <TextInput
                ref={(input) => {
                    this.createPasswordTextInput = input;
                }}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(createPassword) => this.setState({createPassword})}
                value={this.state.createPassword}
                returnKeyType={'done'}

                blurOnSubmit={false}
            />
            <View style={styles.bottomLineView}/>

            <Text onPress={()=>this.props.navigation.navigate('ForgotPasswordScreen')}  style={{color: Colors.purple, fontFamily: 'Avenir-Heavy',width: '70%',alignSelf:'center', textAlign:'right',marginTop: 3}}>{strings.forgotPassword}</Text>


            <ButtonComponent txt={'Login'} btnPress={() => this.handleValidations()}/>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingBottom: 100}}>
                <Text style={{color: 'grey', fontFamily: 'Avenir-Heavy', marginTop: 3}}>{strings.donthaveaccount}</Text>
                <Text style={{color: Colors.purple, fontSize: 16, fontFamily: 'Avenir-Heavy'}}  onPress={() => this.props.navigation.goBack()}>{' Register Now'}</Text>

            </View>
        </ScrollView>;
    }

    render() {
        return <View style={styles.container}>

            <AuthHeader title={'Welcome !'}/>
            <Loader loading={this.state.loading}/>


            {(Platform.OS === 'ios') && <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                {this.renderSignVpView()}
            </KeyboardAvoidingView>}
            {
                !(Platform.OS === 'ios') && this.renderSignVpView()
            }


        </View>;
    }

    handleValidations() {
        const {email,createPassword}=this.state;
        if (!email.trim()){
            alert("Please enter email")
        }else if (!isValidEmail(email.trim())){
            alert("Please enter valid email")
        }else if (!createPassword.trim()){
            alert("Please enter password")
        }else {
            //alert("User login successfully")


            this.setState({loading:true})

            loginAPi( email, createPassword).then((result) => {
                this.setState({loading:false})

                if (result.status==200){
                    alert(result.message);
                    this.props.navigation.navigate('Details')
                }else {
                    alert(result.message)
                }



            }).catch((e) => {
                this.setState({loading:false})
                alert(JSON.stringify(e));
            });
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop:50
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
