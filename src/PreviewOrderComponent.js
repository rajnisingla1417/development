import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Button,
    Image,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    ToastAndroid
} from 'react-native';
import Slider from "react-native-slider";
import { Dimensions } from 'react-native';

export default class PreviewOrderComponent extends Component {

    static navigationOptions = {
        // headerRight: (
        //     <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 20 }}>
        //         <TouchableWithoutFeedback>
        //             <Image source={require('../assets/share.png')} >

        //             </Image>
        //         </TouchableWithoutFeedback>
        //     </View>
        // ),
        headerTintColor: 'black',
        headerBackTitle: " ",
        headerStyle: { borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0  }
    };

    constructor(props) {
        super(props);
        const item = this.props.navigation.getParam('listItem');
        this.state = {
            height: Dimensions.get('window').width - 30,
            age: 18,
            totalAvailableShares: item.web_shares_available, //Math.floor(2500 / item.price_per_share),
            value: Math.floor(item.web_shares_available) / 2,
            sliderText: (Platform.OS === 'ios') ? 175 : 160,
        };
    }

    componentDidMount(){
        const item = this.props.navigation.getParam('listItem');
        if(item.web_shares_available==""){
            this.setState({totalAvailableShares:0 , value : 0})
        }
    }

    _incrementCount() {
        let numberValue = Math.floor(this.state.value)
        const item = this.props.navigation.getParam('listItem');
        let totalUnits = this.state.totalAvailableShares
        if (numberValue < totalUnits) {
            let value = numberValue + 1
            this.setState({ value })
        }
    }

    _decrementCount() {
        let numberValue = Math.floor(this.state.value)
        if (numberValue > 0) {
            let value = numberValue - 1
            this.setState({ value })
        }
    }

    render() {
        const item = this.props.navigation.getParam('listItem');

        console.log("ITEM",item);
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <View style={styles.topView}>
                        <Text style={styles.overview}>Preview Order</Text>
                        <View style={styles.propertyImg}>
                             <Image source={{ uri: item.image }} style={{width: "100%", height: "100%"}}/>
                        </View>
                    </View>
                    <View style={styles.addressView}>
                        {item.city!="" ?
                        <Text style={styles.cityNameText}>{item.city}, {item.state}</Text>
                        :null}
                        <Text style={styles.stateNameText}>{item.country} {item.zip_code}</Text>
                        <Text style={styles.addressText}>{item.street_number}</Text>
                        <View style={styles.seprator}></View>
                    </View>

                    <View style={{flex:1,flexDirection:'column'}} >

                        <View style={{flex:1,flexDirection:'column'}}>
                    <View style={styles.view1}>
                        <View style={styles.sharedetails}>
                            <View style={styles.horizontalView}>
                                <Text style={styles.$}>$</Text>
                                <Text style={styles.$price}>{Math.floor(this.state.value) * Math.floor(item.price_per_share)}</Text>
                            </View>
                            <View style={styles.horizontalView}>
                                <Text style={styles.totalDue}>Total due for </Text>
                                <Text style={styles.totalDuePrice}>{Math.floor(this.state.value)}</Text>
                                <Text style={styles.shares}> shares</Text>
                            </View>
                        </View>
                        <View style={styles.horizonatalSeparator}></View>
                        <View style={styles.sharedetails}>
                            <Text style={styles.perShare}>Per share</Text>
                            <Text style={styles.perSharePrice}>${item.price_per_share}</Text>
                        </View>
                    </View>
                    </View>

                    <View style={{flex:1,flexDirection:'column',marginTop:40,marginBottom:10}}>
                    <View style={styles.sliderValueView} pointerEvents="none">
                        <Text style={styles.sliderTextView}> Total shares: </Text>
                        <Text style={styles.sliderTextView}>{Math.floor(this.state.value)}</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                        <View style={styles.decreaseButtonContainer}>
                            <TouchableOpacity onPress={() => this._decrementCount()}>
                                <Text style={styles.minusButton}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sliderParent}>
                            <Slider
                                style={{ width: '100%' }}
                                trackStyle={customStyles4.track}
                                thumbStyle={customStyles4.thumb}
                                minimumTrackTintColor='#eaeaea'
                                minimumValue={0}
                                maximumValue={this.state.totalAvailableShares}
                                value={this.state.value}
                                onValueChange={value => this.setState({ value })}
                            />
                            {/* <View style={styles.sliderValueView} left={this.state.value * (Dimensions.get('window').width - this.state.sliderText) / 30} pointerEvents="none">
                                <Text style={styles.sliderTextView}>{Math.floor(this.state.value)}</Text>
                            </View> */}
                        </View>
                        <View style={styles.plusButtonContainer}>
                            <TouchableOpacity onPress={() => this._incrementCount()}>
                                <Text style={styles.plusButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                    <View style={styles.seprator2}>
                    </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View styles={styles.verticalView}>
                            <View style={styles.detailsView}>
                                <View style={styles.verticalDetails}>
                                    <View style={styles.verticalDetails}>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>Valuation: </Text>
                                            <Text style={styles.propertyDetailsValue}>${item.assessment}</Text>
                                        </View>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>IRR: </Text>
                                            <Text style={styles.propertyDetailsValue}>{item.irr}%</Text>
                                        </View>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>Units: </Text>
                                            <Text style={styles.propertyDetailsValue}>{item.units}</Text>
                                        </View>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>Sq. Footage: </Text>
                                            <Text style={styles.propertyDetailsValue}>{item.square_feet}</Text>
                                        </View>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>Year Built: </Text>
                                            <Text style={styles.propertyDetailsValue}>{item.year_built}</Text>
                                        </View>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>Neighborhood: </Text>
                                            <Text style={styles.propertyDetailsValue}>{item.neighborhood}</Text>
                                        </View>
                                        <View style={styles.propertyContainer}>
                                            <Text style={styles.propertyDetails}>Appr. Rate: </Text>
                                            <Text style={styles.propertyDetailsValue}>{item.appr_rate}%</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.seprator3} />
                <View style={styles.actionButtonView}>
                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity activeOpacity={.5}
                            onPress={() => {
                                 this.props.navigation.navigate('OrderScreen',
                                  { listItem: item,
                                    amountWishToInvest: Math.floor(this.state.value) * Math.floor(item.price_per_share) }) }}>
                            <ImageBackground source={require('../assets/buttonBg.png')}
                                style={styles.bottomButtonImage}
                                imageStyle={{ borderRadius: 6 }}
                            >
                                <Text style={styles.bottomButtonText}>Purchase {item.street_number}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    propertyContainer3: {
        height: 20,
        marginTop: 120,
        flexDirection: "row",
        marginLeft: 20
    },
    propertyDetailsValue: {
        fontSize: 14,
        fontFamily: "Roboto-Bold",
        color: "#555"
    },
    scroeValue: {
        fontSize: 14,
        fontFamily: "Roboto-Bold",
        color: "#6a08fd",

    },
    bottomButtonText: {
         marginTop: 10, textAlign: "center", height: '100%', color: "#fff"
    },
    bottomButtonImage: {
        width: '100%', height: '100%'
    },
    bottomButtonContainer: {
        margin:16
    },
    actionButtonView: {
        height: 70
    },
    plusButton: {
        fontSize: 25
    },
    plusButtonContainer: {
        width: 30,
        height: 40,
        alignItems: "center",
        marginTop: 20,
        fontWeight: 'bold'
    },
    sliderTextView: {
        fontSize: 15,
        color: "#000",
        fontFamily : "Roboto-Bold"
    },
    sliderValueView: {
        width: 130,
        marginTop: 20,

        marginLeft: (Dimensions.get('window').width - 130 ) / 2,
        flexDirection: "row",
    },
    minusButton: {
        fontSize: 30
    },
    sliderParent: {
        width: 220,
        marginTop: 20
    },
    propertyContainer: {
        flexDirection: "row",
        height: 25
    },
    decreaseButtonContainer: {
         width: 30,
         height: 40,
         alignItems: "center",
         marginTop: 20,
         justifyContent: 'center'
    },
    sliderContainer: {
        flexDirection: "row",
         justifyContent: "space-between",
         marginLeft: 15,
         marginRight: 15
    },
    addressView: {
         height: 120
    },
    mainContainer:{
         flex: 1,
         flexDirection: "column"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    propertyDetails: {
        fontSize: 14,
        fontFamily: "Roboto-Bold",
        height: 20
    },
    horizontalView: {
        flexDirection: "row"
    },
    $: {
        left: 30,
        color: "#6a08fd",
        fontSize: 21,
        width: 10,
        fontFamily: "Roboto-Bold",

    },
    totalDue: {
        left: 30,
        height: 30,
        fontSize: 11,
        fontFamily: "Roboto-Bold",

    },
    totalDuePrice: {
        left: 30,
        height: 30,
        fontSize: 11,
        color: "#6a08fd",
        fontFamily: "Roboto-Bold",

    },
    shares:{
        left: 30,
        height: 30,
        fontSize: 11,
        fontFamily: "Roboto-Bold",

    },
    $price: {
        color: "#6a08fd",
        fontSize: 42,
        left: 32,
        top: -5,
        fontFamily: "Roboto-Bold",

    },
    bottomView: {
        height: 220,
        marginLeft: 10,
        marginRight: 10
    },
    horizonatalSeparator: {
        width: 1,
        height: 70,
        backgroundColor: "#e1e6e6"
    },
    sharedetails: {
        width: '50%',

        flexDirection: "column"
    },
    sharedetailsContents1: {
        left: 30
    },
    perShare: {
        left: 30,
        color: "#6a08fd",
        fontFamily: "Roboto-Bold",
        fontSize: 16,

    },
    perSharePrice: {
        left: 30,
        fontFamily: "Roboto-Bold",
        fontSize: 18,

    },
    propertyImg: {
        height: 111,
        width: 160,
        left: Dimensions.get('window').width - 160 - 10,
        top: 40,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.3
    },
    seprator: {
        left: 30,
        height: 1,
        top: 30,
        width: Dimensions.get('window').width - 60,
        backgroundColor: "#e1e6e6"
    },
    seprator2: {
        marginTop:20,
        height: 8,
        width: Dimensions.get('window').width,
        backgroundColor: "#e1e6e6"
    },
    seprator3: {
        height: 2,
        width: Dimensions.get('window').width,
        backgroundColor: "#e1e6e6"
    },
    topView: {
        backgroundColor: "#eaeaea",
        height: 140,
    },
    view1: {
        flexDirection: "row",
        left: 0,
        right: 0,
        top: 50,
    },
    imageSlider: {
        height: Dimensions.get('window').width - 30,
    },
    imageSliderContainer: {
        height: Dimensions.get('window').width,
        left: 15,
        width: Dimensions.get('window').width - 30,
    },
    cityNameText: {
        left: 30,
        top: 25,
        fontSize: 12,
        paddingRight: 30,
        fontFamily: "Roboto-Bold",

    },
    stateNameText: {
        left: 30,
        top: 25,
        fontSize: 12,
        paddingRight: 30,
        fontFamily: "Roboto-Bold",

    },
    addressText: {
        left: 30,
        top: 35,
        fontSize: 30,
        width: Dimensions.get('window').width - 60,
        height: 100,
        fontFamily: "Roboto-Bold",

    },
    verticalView: {
        flex: 1,
        flexDirection: "column",
        height: '100%'
    },
    verticalDetails: {
        flexDirection: "column",
        flex: 1
    },
    detailsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        left: 20,
        width: Dimensions.get('window').width - 40,
        height: 100,
        top: 30
    },
    overview: {
        fontSize: 30,
        top: 27,
        bottom: 10,
        left: 30,
        fontFamily: "Roboto-Medium",
        fontWeight: "600"
    },
    welcome: {
        flex: 1,
       // margin: 20,
        backgroundColor: 'orange',
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 70,
    },

    BrowseTextView: {
        marginLeft: 10,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    MapViewButton: {
        height: 30,
        width: 75,
        top: 10,
        borderColor: "#435cfe",
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 5
    },

});

var customStyles4 = StyleSheet.create({
    track: {
        height: 20,
        borderRadius: 10,
        backgroundColor: "#eaeaea",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.15,
    },
    thumb: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.58,
        shadowRadius: 15,
        shadowOffset: {
            width: 0,
            height: 15,
        },
        borderRadius: 25,
        elevation: 24,
    }
});
