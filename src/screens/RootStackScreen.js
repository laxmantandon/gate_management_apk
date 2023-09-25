import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import ResetPasswordScreen from './ResetPasswordScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SignInScreen" component={SignInScreen} options={() => ({ headerShown: false })}/>
        <RootStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={() => ({ headerShown: false })}/>
        
    </RootStack.Navigator>
);

export default RootStackScreen;