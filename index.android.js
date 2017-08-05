/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Button} from 'native-base';
import axios from 'axios';
import {StackNavigator} from 'react-navigation';
import RegisterationComponent from './Components/RegisterationComponent';
import LoginComponent from './Components/LoginComponent';
import DrawerExample from './Components/Drawer';

export default class myrnapp extends Component {


    render() {

        const {navigate} = this.props.navigation;


        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const SimpleApp = StackNavigator({
    RegisterationPage: {screen: RegisterationComponent},
    LoginPage: {screen: LoginComponent},
    HomePage : {path:'home/:id',screen:DrawerExample}
}, {headerMode: 'screen'});


AppRegistry.registerComponent('myrnapp', () => SimpleApp);
