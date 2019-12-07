import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Platform, TouchableWithoutFeedback, Alert } from 'react-native';
import MapView, { Marker, ProviderPropType, Callout } from 'react-native-maps';
import markerImg from '../assets/mapmarker.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 70;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class MarkerTypes extends React.Component {

    static navigationOptions = {
        headerStyle: { borderBottomWidth: 0, marginTop: (Platform.OS === 'ios') ? 0 : 0  },
        headerTintColor: 'black',
        headerBackTitle: " "
    };

    constructor(props) {
        super(props);
        this.state = {
            marker1: true,
            marker2: false,
        };
    }

    render() {
        const items = this.props.navigation.getParam('responseJson');
        let lat = parseFloat(items[0].latitude)
        let long = parseFloat(items[0].longitude)
       
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    {items.map((marker, i) => (

                               <View>
                        { (marker.latitude !="") ?
                        <Marker
                            onPress={() => this.setState({ marker1: !this.state.marker1 })}
                            coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)
                            }}
                            centerOffset={{ x: -18, y: -60 }}
                        >
                            <Callout style={styles.customView}
                                onPress={() => { this.props.navigation.navigate('Details', { listItem: marker}) }}>
                                <View>
                                    {(Platform.OS === 'ios') ?
                                        <View>
                                            <Image resizeMode="cover" source={{ uri: marker.image }} style={{ width: "100%", height: "80%" }} />
                                            <Text>${marker.equity_current_valuation}{marker.equity_current_valuation_value}</Text>
                                            <Image resizeMode="cover" source={require('../assets/rating.png')} style={{ marginLeft: 90 }} />
                                        </View>
                                        :
                                        <View>
                                            <Text style={{ fontWeight: "bold" }}>{marker.city}, {marker.country} {marker.zip_code}, {marker.street_number}</Text>
                                            <Text>${marker.equity_current_valuation}{marker.equity_current_valuation_value}</Text>
                                            <Text>Score: {marker.our_score}</Text>
                                        </View>
                                    }
                                </View>
                            </Callout>
                        </Marker>

                        :null}
                        </View> 
                    ))}
                </MapView>
            </View>
        );
    }
}

MarkerTypes.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        marginLeft: 46,
        marginTop: 33,
        fontWeight: 'bold',
    },
    customView: {
        width: 140,
        height: (Platform.OS === 'ios') ? 140 : 95,
    },
});

export default MarkerTypes;
