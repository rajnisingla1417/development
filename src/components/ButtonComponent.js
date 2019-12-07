import {ImageBackground, Text, StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import React from 'react';

export    const ButtonComponent = (props) => {

    return (
        <View style={styles.actionButtonView}>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity activeOpacity={.5}
                                  onPress={() => {props.btnPress()}}>
                    <ImageBackground source={require('../../assets/buttonBg.png')}
                                     style={styles.bottomButtonImage}
                                     imageStyle={{ borderRadius: 6 }}
                    >
                        <Text style={styles.bottomButtonText}>{props.txt} </Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    bottomButtonText: {
        marginTop: 15,
        paddingTop:Platform.OS==='ios'?2:0,
        fontFamily:'Roboto-Regular',
        textAlign: 'center',
        fontSize:16,
        height: '100%',
        color: '#fff',
        width: '100%',
    },
    bottomButtonImage: {
        width: '100%',
        //   height: '100%',
        marginHorizontal:20,
        alignSelf: 'center',
        justifyContent:'center'
    },
    bottomButtonContainer: {
        marginHorizontal: '15%',
        marginVertical:16
    },
    actionButtonView: {
        height: 50,
        //marginBottom:100,
        marginTop:20,

    }
})
