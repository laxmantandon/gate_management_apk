import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../tab screens/HomeScreen';
import InputScreen from '../FormScreens/InputScreen';
const Stack = createNativeStackNavigator();

const route = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='inputscreen' component={InputScreen} />

        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default route