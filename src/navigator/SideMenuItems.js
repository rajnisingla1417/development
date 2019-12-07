import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/colors';

const SideMenuItems = (props) => {
    const [index, setIndex] = useState(0);
    return <View style={{flex: 1, margin: 20}}>
        <TouchableOpacity>
            <Image source={require('../../assets/location.png')}/>
        </TouchableOpacity>
        <View style={{flex:1}}>

            <TouchableOpacity style={styles.btnView} onPress={() => setIndex(0)}>
                <Text style={styles.titleText}>{'BROWSE'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.titleParentView, {marginTop: 30}]} onPress={() => {
                setIndex(1);
            }}>
                <Text style={index === 1 ? styles.purpleTitleText : styles.blackTitleText}>{'FAVORITES'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(2);
            }}>
                <Text style={index === 2 ? styles.purpleTitleText : styles.blackTitleText}>{'PORTFOLIO'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(3);
            }}>
                <Text style={index === 3 ? styles.purpleTitleText : styles.blackTitleText}>{'ISSUED PROPERTIES '}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(4);
            }}>
                <Text style={index === 4 ? styles.purpleTitleText : styles.blackTitleText}>{'LEGAL ENTITIES'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(5);
            }}>
                <Text style={index ===5? styles.purpleTitleText : styles.blackTitleText}>{'FAVORITES'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(6);
            }}>
                <Text style={index === 6 ? styles.purpleTitleText : styles.blackTitleText}>{'DEPOSIT FUNDS'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(7);
            }}>
                <Text style={index === 7 ? styles.purpleTitleText : styles.blackTitleText}>{'SETTINGS'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleParentView} onPress={() => {
                setIndex(8);
            }}>
                <Text style={index === 8 ? styles.purpleTitleText : styles.blackTitleText}>{'SEARCH'}</Text>
            </TouchableOpacity>

        </View>

        <View style={{width:'100%',bottom:0,position:'absolute'}}>
            <View style={{width:'50%',marginLeft:50,height:1,backgroundColor:'#C2c2c2',bottom:80,position:'absolute'}}/>
            <TouchableOpacity style={[styles.titleParentView,{position:'absolute',bottom:40}]} onPress={() => {
                setIndex(9);
            }}>
                <Text style={index === 9? styles.purpleTitleText : styles.blackTitleText}>{'REPORT A BUG'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.titleParentView,{position:'absolute',bottom:10}]} onPress={() => {
                setIndex(10);
            }}>
                <Text style={index === 10? styles.purpleTitleText : styles.blackTitleText}>{'SIGN OUT'}</Text>
            </TouchableOpacity>

        </View>
    </View>;


};

const styles = StyleSheet.create({

    btnView: {
        backgroundColor: Colors.purple,
        width: 100,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft:50

    },
    titleText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
    },
    blackTitleText: {
        color: 'black',
       textAlign: 'left',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginLeft:40
    },
    purpleTitleText: {
        color: Colors.purple,
        textAlign: 'left',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        marginLeft:40
    },

    titleParentView: {
        //   backgroundColor: 'red',
        width: '100%',
        margin: 10,
        justifyContent: 'center',
        //alignItems:'center'
    },
});

export default SideMenuItems;
