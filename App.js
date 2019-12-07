/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import PropertyListComponent from './src/PropertyListComponent';
import PropertyDetailComponent from './src/PropertyDetailComponent';
import PreviewOrderScreen from './src/PreviewOrderComponent';
import OrderScreen from './src/OrderFormComponent';
import MapScreen from './src/MapViewComponent';
import PDFPreview from './src/PdfPreviewScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignupScreen from './src/auth/SignupScreen';
import LoginScreen from './src/auth/LoginScreen';
import ForgotPasswordScreen from './src/auth/ForgotPasswordScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideMenuItems from './src/navigator/SideMenuItems';
import AddCardScreen from './src/screens/addcard/AddCardScreen';
// import * as Font from 'expo-font';

console.disableYellowBox = true;
const drawerNavigator=createDrawerNavigator({
    Home: {
        screen:PropertyListComponent,
    },

},
    {
        initialRouteName:'Home',
        contentComponent:SideMenuItems,
        header:'none'



    })

const AppNavigator = createStackNavigator(
    {
        Home: PropertyListComponent,
        drawer:drawerNavigator,
        SignupScreen: SignupScreen,
        LoginScreen: LoginScreen,
        ForgotPasswordScreen: ForgotPasswordScreen,
        Details: PropertyDetailComponent,
        PreviewOrder: PreviewOrderScreen,
        OrderScreen: OrderScreen,
        MapScreen: MapScreen,
        PDFPreview: PDFPreview,
        AddCardScreen:AddCardScreen
    },
    {
        initialRouteName: 'drawer',


    },
);

const AppContainer = createAppContainer(AppNavigator);


const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>

            </SafeAreaView>
            <AppContainer/>
        </>
    );
};


export default App;
