import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Platform,
    ToastAndroid
} from 'react-native';
import { Dimensions } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import MapView, { Marker, ProviderPropType, Callout }  from 'react-native-maps';
import PageControl from 'react-native-page-control';
import { StackActions } from "react-navigation";
import markerImg from '../assets/mapmarker.png';
import Carousel, { ParallaxImage }  from 'react-native-snap-carousel';
// import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';

const { width: screenWidth } = Dimensions.get('window')

export default class PropettyDetailComponent extends Component {

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
            position: 0,
            result: null,
        };
    }

    _renderItem({ item, index }, parallaxProps) {
        return (
            <View style={styles.item}>
                {/* <ParallaxImage
                    source={{ uri: item.url }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                /> */}
                <Image source={{ uri: item.url }} style={styles.image}>

                </Image>
            </View>
        );
    }

    render() {
        const item = this.props.navigation.getParam('listItem');
        console.log("ITEM",item)
        var images = []
        const listItems = item.multiple_image_array.map((image) =>
            images.push({
                "url" : image
            })
        );

        let marker;
        if (item.latitude != null) {
            marker = <Marker
                coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                }}
            />
        }

        let imagePicker;

        if (((Platform.OS === 'ios') === true)) {
            imagePicker = <Slideshow
                indicatorColor=""
                indicatorSelectedColor=""
                arrowSize={0}
                height={(Dimensions.get('window').width - 46) * 0.7}
                dataSource={images}
                onPositionChanged={position => {
                    this.setState({ position })
                }}
            />
        } else {
            imagePicker = <Carousel
                ref={c => { this.carousel = c; }}
                sliderWidth={screenWidth-0}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 0}
                data={images}
                renderItem={this._renderItem}
                hasParallaxImages={false}
                onSnapToItem={position => {
                    this.setState({ position })
                }}
            />
        }

        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {(item.city!="") ?
                        <Text style={styles.cityNameText}>{item.city}, {item.state}, {item.country} {item.zip_code}</Text>
                        : null}
                        {(item.street_number!="") ?
                        <Text style={styles.addressText}>{item.street_number}</Text>
                        : null}
                    </View>

                    <View style={styles.imageSliderContainer}>
                        {imagePicker}
                    </View>
                    <View style={styles.pagecontrol}>
                        <PageControl
                            style={{ position: 'absolute', left: 0, right: 0, bottom: 10, }}
                            numberOfPages={images.length}
                            currentPage={this.state.position}
                            hidesForSinglePage
                            pageIndicatorTintColor='black'
                            currentPageIndicatorTintColor='white'
                            indicatorStyle={{ borderRadius: 5 }}
                            currentIndicatorStyle={{ borderRadius: 5, borderColor: "#000", borderWidth: 1 }}
                            indicatorSize={{ width: 8, height: 8 }}
                            onPageIndicatorPress={this.onItemTap}
                        />
                    </View>
                    <View style={styles.view1}>
                        <View style={styles.sharedetails}>
                            <View
                             style={{alignItems: "center"}}
                             >
                                <View style={styles.horizontalView}>
                                    <Text style={styles.$}>$</Text>
                                    <Text style={styles.$price}>{item.equity_current_valuation}{item.equity_current_valuation_value}</Text>
                                </View>
                                <View style={styles.horizontalView}>
                                    <Text style={styles.totalDue}>Equity available </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.horizonatalSeparator}></View>
                        <View style={styles.sharedetails}>
                            <View
                            style={{alignItems : "center"}}
                            >
                                <Text style={styles.perShare}>Price per fraction</Text>
                                <Text style={styles.perSharePrice}>${item.price_per_share}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 200}}>

                        {(item.longitude !="" ) ?
                        <MapView
                            style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0, ...StyleSheet.absoluteFillObject }}
                            initialRegion={{
                                latitude: parseFloat(item.latitude),
                                longitude: parseFloat(item.longitude),
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        >
                            {marker}

                        </MapView>

                        :
                        <MapView
                        style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0, ...StyleSheet.absoluteFillObject }}

                    >


                    </MapView>
                        }
                        <Image source={require('../assets/shadow.png')}
                            style={{ marginLeft: -5, width: Dimensions.get('window').width + 20, height: 21, top: 0 }}></Image>
                    </View>
                    <View style={{  marginLeft: 10, marginRight: 10}}>
                        <View style={styles.BrowseTextView}>
                            <Text style={styles.overview}>Overview</Text>
                            <View style={{ top: 0, right: 20,alignItems:'center',justifyContent:'center' }}>
                                {(item.overview_pdf!="") ?
                                <View style={styles.MapViewButton}>
                                    <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={() => {
                                            if ((Platform.OS === 'ios') === true ) {
                                                this.props.navigation.navigate('PDFPreview', { pdf: item.overview_pdf })

                                            } else {
                                                this.props.navigation.navigate('PDFPreview', { pdf: item.overview_pdf })
                                            }
                                         }}>
                                        <Text style={{ marginTop: (Platform.OS === 'ios') ? 4 : 0, textAlign: "center",  color: "#6b08ff", fontFamily: "Avenir-Heavy" ,fontSize:14}}>More Info</Text>
                                    </TouchableOpacity>
                                </View>
                                :null}
                            </View>
                        </View>
                        <View styles={styles.verticalView}>
                            <View style={styles.apartmentContainer}>
                                <Text style={styles.apartment} underlayColor='#fff'>{item.category_name}</Text>
                            </View>
                            <View style={styles.detailsView}>
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
                                {/* <View style={styles.verticalDetails}>
                                    <View style={styles.propertyContainer}>

                                    </View>
                                     <View style={styles.propertyContainer} >
                                        <Text style={styles.propertyDetails}>UNITS: </Text>
                                        <Text style={styles.propertyDetailsValue}>{item.units}</Text>
                                    </View>
                                    <View style={styles.propertyContainer} >
                                        <Text style={styles.propertyDetails}>IRR: </Text>
                                        <Text style={styles.propertyDetailsValue}>{item.irr}</Text>
                                    </View>
                                </View> */}
                                {/* <View style={styles.verticalDetails}>
                                    <View style={styles.propertyContainer}>
                                        <Text style={styles.propertyDetails}>Valuation: </Text>
                                        <Text style={styles.propertyDetailsValue}>{item.assessment}%</Text>
                                    </View>
                                    <View style={styles.propertyContainer} >
                                        <Text style={styles.propertyDetails}>YEAR BUILT: </Text>
                                        <Text style={styles.propertyDetailsValue}>{item.year_built}</Text>
                                    </View>
                                    <View style={styles.propertyContainer} >
                                        <Text style={styles.propertyDetails}>APPR. RATE: </Text>
                                        <Text style={styles.propertyDetailsValue}>{item.appr_rate}</Text>
                                    </View>
                                </View> */}
                                {/* <View style={styles.verticalDetails}>
                                    <View style={styles.propertyContainer3}>
                                        <Text style={styles.propertyDetails}>Our score: </Text>
                                        <Text style={styles.scroeValue}>{item.our_score}</Text>
                                    </View>
                                </View> */}
                            </View>
                            {/* <View style={styles.propertyContainer3} >
                                <Text style={styles.propertyDetails}>NEIGHBORHOOD: </Text>
                                <Text style={styles.propertyDetailsValue}>{item.neighborhood}</Text>
                            </View> */}
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 0 }}>
                        <View style={styles.BrowseTextView}>
                            <Text style={styles.overview}>Description</Text>
                        </View>

                        <HTML html={item.web_description} baseFontStyle={{fontSize: 16,
                                fontFamily: "Roboto-Regular",
                                textAlign:'justify',
                                color: "#000",}} containerStyle={{marginLeft:20,marginRight:20,marginBottom:20,alignItems:'center',justifyContent:'center'}}/>


                        {/* <WebView
                        textZoom={0}
                         originWhitelist={['*']}
                          source={{ html:item.web_description }}
                          style={{flex:0}}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          startInLoadingState={true}
                            /> */}


                        {/* <Text style={styles.descriptionValue}>{item.web_description}</Text> */}
                    </View>
                </ScrollView>
                <View style={styles.seprator3} />
                <View style={{ height: 70}}>
                    <View style={{
                        marginTop: 16, marginBottom: 16, marginLeft: 16, marginRight: 16}}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('SignupScreen', { listItem: item }) }}>
                            <ImageBackground source={require('../assets/buttonBg.png')}
                                style={{ width: '100%', height: '100%' }}
                                imageStyle={{ borderRadius: 6 }}
                             >
                                <Text style={{ textAlign: "center", height: '100%', color: "#fff", marginTop: 10, fontFamily: "Roboto-Regular" }}>Purchase {item.street_number}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pagecontrol: {
        height: 30
    },
    seprator3: {
        height: 2,
        width: Dimensions.get('window').width,
        backgroundColor: "#e1e6e6"
    },
    view1: {
        height: 90,
        flex: 1,
        flexDirection: "row",
        left: 0,
        right: 0,
        marginTop: 10,
    },
     horizontalView: {
        flexDirection: "row"
    },
    $: {
        color: "#6a08fd",
        fontSize: 22,
        width: 15,
        fontFamily: "Roboto-Bold"
    },
    totalDue: {
        height: 30,
        fontSize: 16,
        fontFamily: "Roboto-Medium",
        left: 10
    },
    totalDuePrice: {
        left: 50,
        height: 30,
        fontSize: 11,
        color: "#6a08fd",
        fontWeight: 'bold',
    },
    shares:{
        left: 50,
        height: 30,
        fontSize: 11,
        fontWeight: 'bold',
    },
    $price: {
        color: "#6a08fd",
        fontSize: 45,

        top: 0,
        fontFamily: "Roboto-Bold",

    },
     horizonatalSeparator: {
        width: 1,
        height: 70,
        backgroundColor: "#e1e6e6"
    },
    sharedetails: {
        width: '50%',
        flex: 1,
        flexDirection: "column"
    },
    sharedetailsContents1: {
        left: 30
    },
    perShare: {
        fontFamily: "Roboto-Medium",
        fontSize: 16
    },
    propertyContainer: {
        flexDirection: "row",
        height: 25
    },
    propertyContainer3: {
        height: 20,
        marginTop: 90,
        flexDirection: "row",
        marginLeft: 20
    },
    propertyDetails: {
        fontSize: 14,
        fontFamily: "Roboto-Bold",
        height: 20,

    },
    propertyDetailsValue: {
        fontSize: 14,
        fontFamily: "Roboto-Regular",
        color: "#555",
    },
    descriptionValue: {
        fontSize: 16,
        fontFamily: "Avenir-Roman",
        textAlign:'justify',
        color: "#000",
        marginLeft: 20,
        marginRight: 20,
        marginBottom:20,
        top: 0
    },
    scroeValue: {
        fontSize: 14,
        fontFamily: "Roboto-Bold",
        color: "#6a08fd",
        width: 20,

    },
    perSharePrice: {
        color: "#6a08fd",
        fontFamily: "Roboto-Bold",
        fontSize: 34,
        fontWeight: '500',
        left: -25
    },
    imageSlider: {
        height: Dimensions.get('window').width - 30,
    },
    imageSliderContainer: {
        marginTop: 20,
        height: (Dimensions.get('window').width - 46) * 0.7,
        left: 30,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        alignItems:'center',justifyContent:'center',alignSelf:'center',marginLeft:30,marginRight:30
    },
    cityNameText: {
        left: 30,
        top: 10,
        fontSize: 16,
        paddingRight: 30,
        fontFamily: "Roboto-Medium"
    },
    addressText: {
        left: 30,
        marginTop: 15,
        fontSize: 37,
        width: Dimensions.get('window').width - 60,
        fontFamily: "Roboto-Bold",

    },
    verticalView: {
        flex: 1,
        flexDirection: "column",

    },
    verticalDetails: {
        flex: 1,
        flexDirection: "column",
    },
    detailsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        left: 20,
        width: Dimensions.get('window').width - 40,

        marginTop: 25
    },
    overview: {
        fontSize: 32,
        top: 0,
        bottom: 0,
        fontFamily: "Avenir-Heavy",
        left: 10,

    },
    apartmentContainer: {
        backgroundColor: "#e1e6e6",
        top: 5,
        bottom: 0,

        left: 20,
        width: 'auto',
        alignSelf: 'flex-start'
    },
    apartment: {
        fontSize: 12,
        marginLeft: 10,
        marginRight: 10,
        height: 30,
        top: 0,
        fontFamily: "Roboto-Bold",
        lineHeight: Platform.OS === 'ios' ? 28 : 30,
        overflow: 'hidden',
        textTransform: 'uppercase',
    },
    welcome: {
        flex: 1,
        margin: 20,
        backgroundColor: 'orange',
       // margin: 10,
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 70,
    },

    BrowseTextView: {
        marginLeft: 10,
        marginTop:5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center'
    },

    MapViewButton: {
        height: 30,
        width: 90,
        top: Platform.OS == "ios" ? 10 : 0,
        alignItems:'center',
        justifyContent:'center',
        borderColor: "#6b08ff",
        borderWidth: 2,
        backgroundColor: "#fff",
        borderRadius: 5
    },
    item: {
        width: screenWidth - 60,
        height: (Dimensions.get('window').width - 46) * 0.7
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: "contain"
    },
});
