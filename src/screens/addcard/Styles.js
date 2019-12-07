import {StyleSheet, Platform, Dimensions} from 'react-native'
import {Colors} from '../../utils/colors';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;
module.exports = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: '#C5CAFF',
        //backgroundColor: 'white'
        //padding: 10
        //justifyContent: 'center',
    },
    headerTitleView: {
        margin: 10,
        fontSize: 20,
        color: 'black'
    },
    addCardView: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom:100,

        borderWidth: 0.5,
        borderColor: '#c6c6c6',
        borderRadius: 2,
        marginTop: 30, marginLeft: 10, marginRight: 10

    },

    dateCvcParentView: {
        flexDirection: 'row',
        marginTop: 20,


    },
    cardNumberView: {
        height: 40,
        width:width/2+30


    },
    separatorView: {
        height: 1,
        backgroundColor: 'gray'
    },
    expiryDateView: {
        flex: 2,
        height: 70,
        marginRight: 10,
    },

    cvcView: {
        flex: 2,
        height: 70,
        marginLeft: 10
    },
    zipCodeView: {
        height: 50,
        marginRight: 10,

    },
    saveCardView: {
        width: 150,
        height: 50,
        backgroundColor: Colors.purple,
        marginTop: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    saveCardTextView: {
        alignSelf: 'center', color: 'white',
        fontSize: 18,
    }

});
