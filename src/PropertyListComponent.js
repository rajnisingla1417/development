import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View, ActivityIndicator, FlatList,
    Text, Image, Alert, YellowBox, Button, ImageBackground,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { Dimensions } from 'react-native';

class LogoTitle extends Component {
    state = {
        search: '',
        value:'',
        isFetching: false,
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <Image source={require('../assets/listingicon.png')} style={{ width: 15, height: 20, marginRight: 10, resizeMode:'contain', }} />
                    <Text style={{ fontFamily: 'Avenir-Medium', fontSize: 15 }}>ALL LISTINGS</Text>
                    {/* <Image source={require('../assets/downArrow.png')} style={{ width: 17, height: 10, marginLeft: 5 }} /> */}
                </View>
            </View>
        );
    }
}

export default class PropertyListComponent extends Component {

    static navigationOptions = {
        headerTitle: <LogoTitle />,
        // headerLeft: (
        //     <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 20 }}>
        //         <TouchableWithoutFeedback>
        //             <Image source={require('../assets/Hamburger.png')} >

        //             </Image>
        //         </TouchableWithoutFeedback>
        //     </View>
        // ),
        headerStyle: { borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0 },
        headerBackTitle: " ",
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    GetItem(item) {
        this.props.navigation.navigate('Details', {
            listItem:item
        });
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    webCall = () => {
//https://app.risemarkets.io/Wooapi/ssyymcddUFopjn/getProperties
        return fetch('http://dev.w3ondemand.com/properties_development/Wooapi/ssyymcddUFopjn/getProperties')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.result,
                    isFetching:false
                }, function () {

                    if(this.state.value!=""){
                        this.setState({value:''})
                    }
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    onRefresh() {
        this.setState({ isFetching: true });
        this.webCall();
     }

    componentDidMount() {
        this.webCall();
    }

    render_FlatList_header = () => {
        var header_View = (
            <View>
                <View style={styles.BrowseTextView}>
                    <Text style={{ fontSize: 38, top: (Platform.OS === 'ios') ? 0 : 0, bottom: 0,
                        fontFamily: "Avenir-Heavy"

                    }}>Browse</Text>
                        <View style={{top: 0, right: 7,alignItems:'center',justifyContent:'center'}}>
                            <View style={styles.MapViewButton}>
                                <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} activeOpacity={.5}
                                onPress={() => { this.props.navigation.navigate('MapScreen', { responseJson: this.state.dataSource}) }}>
                                    <Text style={styles.mapViewButtonText}>
                                        MAP VIEW
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
             </View>
         );
        return header_View ;
    };

    searchFilterFunction = text => {
        this.setState({
          value: text
        });

        if(text==""){
            this.webCall();
        }else
        this.webCallforSearch(this.state.value);

      };

      webCallforSearch = (value) => {
                return fetch('http://dev.w3ondemand.com/properties_development/Wooapi/ssyymcddUFopjn/getProperties?search='+value)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            dataSource: responseJson.result
                        }, function () {
                            console.log("RESPONSE>>>",responseJson.result)
                            // In this block you can do something with new state.
                        });
                    })
                    .catch((error) => {
                        Alert.alert(error);
                    });
            }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={styles.MainContainer}>
               {/* <SearchBar
                        lightTheme
                        containerStyle={{
                            backgroundColor:'transparent',
                            borderTopWidth: 0,
                            borderBottomWidth: 0
                        }}
                        inputContainerStyle={{
                            height: 24,
                            borderRadius: 5,
                            backgroundColor: '#ededed'
                        }}
                        placeholder = "Search location"
                        inputStyle={{
                           fontFamily:"MyriadPro-Semibold",
                            fontSize: 15
                        }}
                        value={this.state.value}
                        onChangeText={text => this.searchFilterFunction(text)}
                />*/}
                <FlatList style={{marginTop: 15}}
                    data={this.state.dataSource}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    //ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10}}>
                            {/* <Image source={{ uri: item.flower_image_url }} style={styles.imageView} /> */}
                            <View style={styles.imageView} >
                                <TouchableOpacity activeOpacity={.5} onPress={this.GetItem.bind(this, item)}>
                                <ImageBackground onPress={this.GetItem.bind(this, item)}
                                        source={{ uri: item.image }}
                                        style={{ width: '100%', height: '100%' }}>
                                    <Image source={require('../assets/blackMask.png')}
                                            style={{width:'100%', height:108, top: styles.imageView.height - 108}}>
                                    </Image>
                                    <View style={{ position: 'absolute', left: 10, right: 10, bottom: 20}}>
                                        {item.street_number!="" ?
                                            <Text style={{ color: "#fff",
                                                fontFamily: "Avenir-Roman",
                                                fontSize: 16 }}>{item.street_number}</Text>
                                            :null}
                                            {item.city!="" ?
                                            <Text style={{ color: "#fff",
                                               fontFamily: "Avenir-Roman",
                                                fontSize: 16 }}>{item.city}, {item.state}, {item.country} {item.zip_code}</Text>
                                            :null}
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", marginTop: 10, marginBottom: 5, marginLeft: 5, marginRight: 5}}>
                                {/* <Text onPress={this.GetItem.bind(this, item.flower_name)} style={styles.textView} >{item.flower_name}</Text> */}
                                <View style={{ flexDirection: "row",alignItems:'center',justifyContent:'center' }}>
                                    <Text style={{
                                       fontFamily: "Roboto-Bold",
                                        fontSize: 16 }}>${item.equity_current_valuation}{item.equity_current_valuation_value}</Text>
                                    <Text style={{
                                        fontFamily: "Avenir-Roman",
                                        fontSize: 16 }}> for sale</Text>
                                </View>
                                <View style={styles.horizonatalSeparator}></View>
                                <Text style={{
                                    fontFamily: "Avenir-Roman",
                                    fontSize: 16 }}>{item.irr}% IRR</Text>
                                <View style={styles.horizonatalSeparator}></View>
                                <Text style={{
                                    fontFamily: "Avenir-Roman",
                                    fontSize: 16 }}>{item.category_name}</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.render_FlatList_header}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    horizonatalSeparator: {
        width: 2,
        height: 13,
        marginTop: 5,
        backgroundColor: "#A9A9A9"
    },
    BrowseTextView: {
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 0,
        marginRight: 10,
        height: 60,
        flexDirection: "row",

        justifyContent: "space-between"
    },

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        marginTop: (Platform.OS === 'ios') ? 10 : 10,
        flexDirection: "column"
    },

    imageView: {
        height: (Dimensions.get('window').width - 60) * 0.7,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.3
    },

    textView: {
        textAlignVertical: 'center',
        color: '#000',
        textAlign: "left"
    },

    MapViewButton: {
        height: 25,
        width: 90,
        top: 0,
        borderColor: "#6b08ff",
        borderWidth: 2,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center'
    },

    mapViewButtonText: {
        marginTop: Platform.OS === 'ios' ? 0 : 0,
        textAlign: "center",
        alignItems:'center',
        justifyContent:'center',

        color: '#6b08ff',
        fontFamily: "MyriadPro-Semibold",
        fontSize: 13
    }
});
