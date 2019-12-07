import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import * as Styles from './Styles';
import creditCardType, {types as CardType} from 'credit-card-type';
import Stripe from 'react-native-stripe-api';


/**
 * This class is used to add new credit card, generate token from stripe ,send to server
 * and navigate to  either manage Payments Screen or Booking Screen.
 *
 * @author dipanshu jindal
 * @version 1.0
 *
 */

export default  class AddCardScreen extends Component {

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
        headerBackTitle: "Add Crds"
    };

    constructor(props) {
        super(props);


        this.state = {
            isLoading: false ,
            cardNumber: '' ,
            expiryDate: '' ,
            zipCode: '' ,
            cvv: '' ,
            text: '' ,
            expirationDateFocus: false ,
            cardNoFocus: false ,
            cvvFocus: false ,
            datetime: '' ,
            cardTypeImage: '' ,
            screenNumber: 0
        };
    }


      componentDidMount(): void {


    }

    /**
     * This method is used to check card type.
     * e.g card  type is VISA, Master or american express etc
     *
     * @param number :Input card number
     */

    detectCardType(number) {

        if (number.length < 1) return;
        let cardType = creditCardType(number).filter(function (card) {

            let cardTypes = card.type;
            let type = cardTypes[0].type;
            return card.type

        });
        console.log(cardType);

        if (cardType === undefined || cardType.length < 1) {
            this.setState({cardTypeImage: require("../../../assets/visa.png")})
            return
        }
        //alert("detect Card--" + JSON.stringify(cardType[0].type))
        switch (cardType[0].type) {
            case CardType.VISA:
                this.setState({cardTypeImage: require("./../../../assets/visa.png")})
                break;

            case CardType.MASTERCARD:
                this.setState({cardTypeImage: require("../../../assets/master_crd.png")})
                break;
            case CardType.AMERICAN_EXPRESS:
                this.setState({cardTypeImage: require("../../../assets/american_exp.png")})
                break;
            case CardType.DISCOVER:
                this.setState({cardTypeImage: require("../../../assets/discover.png")})
                break;
            case CardType.DINERS_CLUB:
                this.setState({cardTypeImage: require("../../../assets/diners_club.png")})
                break;
            case CardType.ELO:
                this.setState({cardTypeImage: require("../../../assets/elo.png")})
                break;
            case CardType.MAESTRO:
                this.setState({cardTypeImage: require("../../../assets/mastero.png")})
                break;
            case CardType.HIPERCARD:
                this.setState({cardTypeImage: require("../../../assets/hipercard.png")})
                break;
            case CardType.MIR:
                this.setState({cardTypeImage: require("../../../assets/mir.png")})
                break;
            case CardType.JCB:
                this.setState({cardTypeImage: require("../../../assets/jcb.png")})
                break;
            case CardType.UNIONPAY:
                this.setState({cardTypeImage: require("../../../assets/unipay.png")})
                break;

            default:
                this.setState({cardTypeImage: require("../../../assets/visa.png")})
                break;

        }

    }

    /**
     * This method is used to format the card number
     * e.g. ****-****-****-****
     *
     * @param text:Card Number
     */

    handleCardNumberText = (text) => {
        let textTemp = text;
        this.setState({
            cardNumber: textTemp.replace(/\s?/g , '').replace(/(\d{4})/g , '$1 ').trim()
        });

        this.detectCardType(text);
    };

    /**
     * This method is used to format the card expiry date
     * @param text:expiry date input
     */
    handleExpiryDateText = (text) => {
        let textTemp = text.trim();
        if (textTemp.length === 1) {
            let firstChar = parseInt(textTemp);
            if (firstChar !== 1 && firstChar !== 0) {
                textTemp = '0';
                this.setState({expiryDate: textTemp})
                return
            }

        } else if (textTemp.length === 2) {
            //debugger
            let secondChar = parseInt(textTemp.charAt(1))
            let secondChar_ = parseInt(textTemp.substring(0 , 2))
            if (secondChar_ > 12) {
                textTemp = textTemp.charAt(0) + 2 + "/"
            } else if (this.state.expiryDate.length === 1) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        this.setState({expiryDate: textTemp});
        //console.log("Expiry date--" + this.state.expiryDate)
    }

    /*
    * This method is used to generate token from stripe
    */

    async saveCardDetails() {
        const apiKey = 'sk_test_9VIHA5T2BWqKuxs7pQVvVjvu';
        const client = new Stripe(apiKey);
        let foo = this.state.expiryDate;
        let arr = foo.split("/");
        let expMonth = arr[0];
        let expYear = arr[1];

        //TODO change the static data
// Create a Stripe token with new card infos
        const token = await client.createToken({
            number: this.state.cardNumber ,
            exp_month: expMonth ,
            exp_year: expYear ,
            cvc: this.state.cvv ,
        })
        return token

    }

    /**
     * This method is used to handle card validations. Check User enters the card number or not
     *
     * @returns {Promise<void>}
     */
    async handleCardValidation() {
        if (this.state.cardNumber === '' || this.state.cardNumber === undefined) {
            alert("Please enter card number")
        } else if (this.state.cardNumber.length < 16) {
            alert("Please enter valid card number")
        } else if (this.state.expiryDate.length < 5) {
            alert("Please enter expiry date")
        } else if (this.state.cvv === '' || this.state.cvv === undefined) {
            alert("Please enter cvc number")
        } else if (this.state.cvv.length < 3) {
            alert("Please enter valid cvc number")
        } else {
            this.setState({isLoading: true})

            this.saveCardDetails().then((stripeToken) => {
                this.setState({isLoading: false})
                let errorCode = stripeToken.error
                if (errorCode !== undefined) {
                    alert(errorCode.message);
                } else {
                    alert(stripeToken.id);
                    return
                    let postData = {
                        "user_id": this.state.userId ,
                        "token": stripeToken.id
                    };
                    this.addCard(postData);

                }

            });

        }

    }

    /**
     * This method is used to add new card
     * @param postData :Card Details
     */
    async addCard(postData) {
        /*this.setState({isLoading: true});
        let data = await checkInactiveUser(this.state.userId);

        if (data.code === 204) {
            Utils.showInactiveAlert(Strings.inactiveUserMessage , this.props);
            this.setState({isLoading: false});
            return;
        } else if (data.code !== 200) {
          //  Utils.showNoInternetError(Strings.internetMessage);
            this.setState({isLoading: false});
            return;
        }

        fetch(Constant.SERVER_BASE_URL + 'api/v2/sabr_stagging_custom_apis/addCard' , {
            method: 'POST' ,
            headers: Constant.getHeaders() ,
            body: JSON.stringify(postData) ,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false})

                //alert(JSON.stringify(responseJson));

                debugger
                if (responseJson.status === '200') {
                    console.log(responseJson);
                    this.setState({isLoading: false});
                    // alert('Success', responseJson.message);
                    Preferences.setCardAdded(true)
                    this.showAlert('SABR' , 'Your card is added successfully')
                } else {
                    alert(responseJson.message);
                    //alert(JSON.stringify(responseJson))
                    this.setState({isLoading: false});
                }

            })
            .catch((error) => {
                alert(Strings.internetMessage);
                this.setState({isLoading: false})
            });*/
    }


    /** This method is used to handle Navigation and
     * check from the  which screen user is coming
     *
     * if screenNumber :1 user is coming from Booking Screen
     * else user is coming from Manage Payments Screen
     */
    handleNavigation() {
        let data = this.props.navigation.state.params;
        let screenNumber = data.screenNumber
        if (this.state.screenNumber === 1) {  // Booking Screen
            //alert("Booking SCreen--"+JSON.stringify(data.postData))
           // this.props.navigation.state.params.requestBooking(data.postData);
        } else {
           // this.props.navigation.state.params.getAllAddedCards();
        }

        this.props.navigation.goBack()
    }


    /**
     * This method is used to show the conformation popup after adding new card
     * and navigate to appropriate screen
     */
    showAlert(title , message) {
        Alert.alert(
            title ,
            message ,
            [
                {text: 'OK' , onPress: () => this.handleNavigation()} ,
            ] ,
            {cancelable: false}
        )
    }


    render() {
        return (
            <KeyboardAvoidingView style={Styles.mainContainer}
                                  keyboardVerticalOffset={Platform.select({ios: 0 , android: -500})}
                                  behavior="padding" enabled>
                <ScrollView>

                    <View>

                        {/***************** Header View Start **************/}


                        {/***************** Header View End **************/}


                        {/*<View style={Style.addCardView}>*/}
                        <View style={Styles.addCardView}>
                            <Text style={{marginTop: 20}}>Card Number</Text>

                            <View style={{flexDirection: 'row' , justifyContent: 'space-between' ,}}>

                                <TextInput
                                    keyboardType='numeric'
                                    maxLength={19}
                                    underlineColorAndroid="transparent"
                                    onFocus={() => this.setState({cardNoFocus: true})}
                                    onBlur={() => this.setState({cardNoFocus: false})}
                                    style={Styles.cardNumberView}
                                    returnKeyType='done'
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    onChangeText={this.handleCardNumberText}
                                    onSubmitEditing={() => {
                                        this.textInputExpiryDateRef.focus();
                                    }}

                                    value={this.state.cardNumber}/>

                                {this.state.cardNumber.length >= 1 && (
                                    <Image
                                        style={{height: 25 , width: 40 , alignSelf: 'center'}}
                                        source={this.state.cardTypeImage}
                                    />)
                                }


                            </View>
                            <View style={Styles.separatorView}/>


                            {/************** Expiry Date & CVV View Start  ****************/}
                            <View style={Styles.dateCvcParentView}>

                                {/************** Expiry Date View Start  ****************/}
                                <View style={Styles.expiryDateView}>
                                    <Text>Expiry Date</Text>
                                    <TextInput
                                        ref={ref => this.textInputExpiryDateRef = ref}
                                        onSubmitEditing={() => {
                                            this.textInputCVCRef.focus();
                                        }}
                                        keyboardType='numeric'
                                        maxLength={5}
                                        returnKeyType='done'
                                        underlineColorAndroid="transparent"
                                        onFocus={() => this.setState({expirationDateFocus: true})}
                                        onBlur={() => this.setState({expirationDateFocus: false})}
                                        style={Styles.expiryDateView}
                                        placeholder="MM/YY"
                                        clearTextOnFocus={true}
                                        onChangeText={(text) => this.handleExpiryDateText(text)}
                                        //onChangeText={this.handleExpiryDateText.bind(this)}
                                        value={this.state.expiryDate}
                                    />
                                    <View style={Styles.separatorView}/>
                                </View>
                                {/************** Expiry Date View End  ****************/}

                                {/************** CVC View Start  ****************/}

                                <View style={Styles.cvcView}>
                                    <Text>CVC</Text>
                                    <TextInput
                                        ref={ref => this.textInputCVCRef = ref}
                                        keyboardType='numeric'
                                        maxLength={4}
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        secureTextEntry={true}
                                        style={Styles.expiryDateView}
                                        placeholder="XXXX"
                                        returnKeyType='done'
                                        clearTextOnFocus={false}
                                        value={this.state.cvv}
                                        onChangeText={(text) => this.setState({cvv: text})}
                                    />
                                    <View style={Styles.separatorView}/>
                                </View>
                                {/************** CVC View End  ****************/}

                            </View>
                            {/************** Expiry Date & CVV View End  ****************/}

                            <TouchableWithoutFeedback onPress={() => this.handleCardValidation()}>
                                <View style={Styles.saveCardView}>
                                    <Text style={Styles.saveCardTextView}>SAVE CARD</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>

                    </View>
                </ScrollView>

                {this.state.isLoading && <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)' ,
                    flex: 1 ,
                    height: '100%' ,
                    width: '100%' ,
                    justifyContent: 'center' ,
                    alignItems: 'center' ,
                    position: 'absolute' ,
                    top: 0 ,
                    marginTop: 0 ,
                }}>
                    <View style={{
                        backgroundColor: 'white' ,
                        height: 110 ,
                        width: 250 ,
                        justifyContent: 'center' ,
                        alignItems: 'center' ,
                        alignContent: 'center' ,
                        borderRadius: 5
                    }}>
                        <ActivityIndicator size="large" color='#444444'/>
                        <Text style={{fontSize: 16 , color: '#444444' , marginTop: 16 , fontWeight: 'bold'}}>
                            {'Please wait... ' + ' '}
                        </Text>
                    </View>
                </View>
                }
            </KeyboardAvoidingView>

        )
    }

}

