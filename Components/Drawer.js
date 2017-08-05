/**
 * Created by abdelmon on 8/2/2017.
 */
import React from 'react';
import {Button, Platform, ScrollView, StyleSheet} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import HomeComponent from './HomeComponent'
import RegisterationComponent from './RegisterationComponent'

import {Icon} from 'native-base';


const MyNavScreen = ({navigation, banner}) => (
    <ScrollView style={styles.container}>
        <Button
            onPress={() => navigation.navigate('DrawerOpen')}
            title="Open drawer"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back"/>
    </ScrollView>
);

const InboxScreen = ({navigation}) => (
    <MyNavScreen banner={'Inbox Screen'} navigation={navigation}/>
);
InboxScreen.navigationOptions = {
    drawerLabel: 'Inbox',
    drawerIcon: ({tintColor}) => (
        <Icon active name="logo-googleplus"/>

    ),
};


const DraftsScreen = ({navigation}) => (
    <MyNavScreen banner={'Drafts Screen'} navigation={navigation}/>
);
DraftsScreen.navigationOptions = {
    drawerLabel: 'Drafts',
    drawerIcon: ({tintColor}) => (
        <Icon active name="logo-googleplus"/>
    ),
};

const DrawerExample = DrawerNavigator(
    {
        Inbox: {
            path: '/',
            screen: RegisterationComponent,
        },
        Profile: {
            path: '/profile',
            screen: HomeComponent,
        },
    },
    {
        initialRouteName: 'Profile',
        contentOptions: {
            activeTintColor: '#e91e63',

        },
    }
);

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
});

export default DrawerExample;