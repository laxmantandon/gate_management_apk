import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './tab screens/HomeScreen';
import LeadScreen from './Home Tab/LeadScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { Colors } from '../contants';
import CalenderScreen from './CalenderScreen';

const HomeStack = createNativeStackNavigator();
const CalenderStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({ navigation }) => (
  <Tab.Navigator
    initialRouteName="Hometab"
    activeColor="#1f65ff"
    inactiveColor="black"
    barStyle={{ backgroundColor: 'white', borderTopColor: Colors.LIGHT_BLUE, borderTopWidth: 1, height: 65 }}


  >
    <Tab.Screen
      name="Hometab"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, color }) => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon name={focused ? "home" : "home-outline"} color={focused ? color : "#111"} size={20} />
            </View>
          )
        },
      }}
    />
    <Tab.Screen
      name="Calendertab"
      component={CalenderStackScreen}
      options={{
        tabBarLabel: 'Calender',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ focused, color }) => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon name={focused ? "calendar-number" : "calendar-number-outline"} color={focused ? color : "#111"} size={20} />
            </View>
          )
        },
      }}
    />

    <Tab.Screen
      name="Exploretab"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({ focused, color }) => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon name={focused ? "aperture" : "aperture-outline"} color={focused ? color : "#111"} size={20} />
            </View>
          )
        },

      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ focused, color }) => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon name={focused ? "person" : "person-outline"} color={focused ? color : "#111"} size={20} />
            </View>
          )
        },

      }}
    />

  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: '#1f65ff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{
      title: 'DBH',
      // headerLeft: () => (
      //     <Icon name="menu" size={25} color={"#1f65ff"} 
      //     onPress={() => navigation.openDrawer()}></Icon>
      // ),

      headerRight: () => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingHorizontal: 5 }}>
              <Icon name="notifications-outline" size={22} color={"#1f65ff"}
                onPress={() => { navigation.navigate('NotificationScreen') }} ></Icon>
            </View>


            <Icon name="headset-outline" size={22} color={"#1f65ff"}
              onPress={() => { navigation.navigate('SupportScreen') }}></Icon>
          </View>
        )
      }
    }} />


  </HomeStack.Navigator>
);

const CalenderStackScreen = ({ navigation }) => (
  <CalenderStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#1f65ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <CalenderStack.Screen name="CalenderScreen" component={CalenderScreen} options={{
      headerShown:false,
     
    }} />
  </CalenderStack.Navigator>
);
