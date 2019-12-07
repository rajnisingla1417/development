import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors} from '../utils/colors';

const AuthHeader=(props)=>{
    return (<View>
        <Image source={require('../../assets/listingicon.png')} style={styles.logoStyle}/>

        <Text style={styles.titleTextStyle}>{props.title}</Text>

    </View>)

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    logoStyle: {
        alignSelf: 'center',
        marginTop: 50,

    }, titleTextStyle: {
        fontSize:32,
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'MyriadPro-Semibold',
    },
    input: {
        //margin: 15,
        height: 40,
        width: '70%',
        alignSelf: 'center',
        marginTop: 10,
    },
    bottomLineView: {
        height: 1,
        width: '70%',
        alignSelf: 'center',
        backgroundColor: Colors.purple,

    },

});

export default AuthHeader
