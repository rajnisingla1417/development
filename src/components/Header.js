import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native'

const Header = (props) => {
    return <View style={{
        height: 40,
        backgroundColor: 'white',
        elevation: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }}>

        <TouchableOpacity style={{marginLeft: 15}} onPress={() => props.leftButtonPressed()}>
            <Image source={require('../../assets/backIcon.png')} style={{tintColor:'grey'}}/>
        </TouchableOpacity>
        <Text style={{
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 'bold',

        }}>{props.title}</Text>
        <Text>{''}</Text>

    </View>
}


export default Header
