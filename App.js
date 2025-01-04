import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Pressable, Alert } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './src/screens/DrawerContent';

import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';

import { AuthContext } from './src/components/context';

import RootStackScreen from './src/screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeadScreen from './src/screens/Home Tab/GateEntryListScreen';
import AddGateEntryScreen from './src/screens/Home Tab/AddGateEntryScreen';
import { Colors } from './src/contants';
import OpportunityScreen from './src/screens/Home Tab/OpportunityScreen';
import AddOpportunityScreen from './src/screens/Home Tab/AddOpportunityScreen';
import SalesInvoiceScreen from './src/screens/Home Tab/SalesInvoiceScreen';
import AddSalesInvoiceScreen from './src/screens/Home Tab/AddSalesInvoiceScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import TaskScreen from './src/screens/Home Tab/TaskScreen';
import TaskDetailsScreen from './src/screens/Home Tab/TaskDetailsScreen';
import QrscannerScreeen from './src/screens/QrscannerScreeen';
import DoctypeFormScreen from './src/screens/Home Tab/DoctypeFormScreen';
import DoctypeListScreen from './src/screens/Home Tab/DoctypeListScreen';
import route from './src/screens/route/route';
import QuotationScreen from './src/screens/Home Tab/QuotationScreen';
import QuatationDetailsScreen from './src/screens/Home Tab/QuotationDetailsScreen';
import SalesOrderScreen from './src/screens/Home Tab/SalesOrderScreen';
import AddSalesOrderScreen from './src/screens/Home Tab/AddSalesOrderScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import frappe from './src/services/frappe';
import GateEntryList from './src/screens/Home Tab/GateEntryListScreen';
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Drawer = createDrawerNavigator();

const App = () => {


  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 
  // AsyncStorage.clear()

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <stack.Navigator >
              {/* <stack.Screen name="HomeDrawer" component={MainTabScreen} options={() => ({ headerShown: false })} /> */}
              <stack.Screen name="GateEntry" component={GateEntryList} options={({ navigation }) => ({
                headerShown:false,
                title: 'Gate Entry',
                headerTitle:()=>{
                  return(
                  <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Gate Entry</Text>
                  </View>
                  )
  
                  },
                  
                  headerRight: () => {
                  return (
                    <Pressable  onPressIn={() => { 
                      Alert.alert('Confirm!','Do you want to logout',[
                        {
                          text: 'Cancel',
                          onPress: () => null,
                          style: 'cancel',
                        },
                        { text: 'LOG OUT', onPress: () =>{()=>{} } },
                      ]); 
                    }} style={{ flexDirection: 'row' }}>
                      <View style={{ paddingHorizontal: 1 }}>
                        <Icon name="power-outline" size={25} color={Colors.DEFAULT_RED} style={{fontWeight:'bold'}}></Icon>
                      </View>
                      {/* <Text style={{color:Colors.DEFAULT_RED, fontSize:12, fontWeight:'bold'}}> Log Out</Text> */}

                    </Pressable>
                  )
                }

              })
              } />
              <stack.Screen name="AddGateEntry" component={AddGateEntryScreen} options={({ navigation, route: {
                params: { item },
              }
              }) => ({
                headerTitle:()=>{
                return(<View>
                    {item?(<View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Update Gate Entry</Text>
                      <Text style={{fontSize:12, color:'grey'}}>{item.title}</Text>
                    </View>):(
                    <View>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Add New Gate Entry</Text>
                  </View>)}

                  </View>
                )

                },
                headerRight: () => {
                  return (
                    <View>
                      {item?(
                       <View>
                         {/* <Pressable 
                        onPressIn={() => { 
                          // navigation.navigate('QrscannerScreeen', Item = {item})
                          navigation.navigate('AddOpportunityScreen', Item = {item})
                      
                      }}
                         style={{ flexDirection: 'row' }}>
                          <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Icon name="add-circle-outline" size={22} color={Colors.DEFAULT_BLUE} ></Icon>
                            <Text style={{ color: Colors.DEFAULT_BLUE,fontSize:13, fontWeight:'bold' }}> Opportunity</Text>
                          </View>
                        </Pressable>

                        <Pressable 
                        onPressIn={() => { 
                          navigation.navigate('QuatationDetailsScreen', Item = {item})
                          // navigation.navigate('AddOpportunityScreen', Item = {item})
                      
                      }}
                         style={{ flexDirection: 'row' }}>
                          <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                            <Icon name="add-circle-outline" size={22} color={Colors.DEFAULT_BLUE} ></Icon>
                            <Text style={{ color: Colors.DEFAULT_BLUE,fontSize:13, fontWeight:'bold' }}> Quotation</Text>
                          </View>
                        </Pressable> */}
                        </View>
                      ):''}
                    </View>
                  )
                },
              })} />

           
            </stack.Navigator>
          )
            :
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
