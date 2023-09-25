import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Pressable } from 'react-native';
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
import LeadScreen from './src/screens/Home Tab/LeadScreen';
import AddLeadScreen from './src/screens/Home Tab/AddLeadScreen';
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
              <stack.Screen name="HomeDrawer" component={MainTabScreen} options={() => ({ headerShown: false })} />
              <stack.Screen name="Lead" component={LeadScreen} options={({ navigation }) => ({
                title: 'Lead',
                headerTitle:()=>{
                  return(
                  <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Lead</Text>
                  </View>
                  )
  
                  },
                  
                  headerRight: () => {
                  return (
                    <Pressable  onPressIn={() => { navigation.navigate('AddLead', Item = '') }} style={{ flexDirection: 'row' }}>
                      <View style={{ paddingHorizontal: 1 }}>
                        <Icon name="add-circle-outline" size={22} color={Colors.DEFAULT_BLUE} ></Icon>
                      </View>
                      <Text style={{color:Colors.DEFAULT_BLUE, fontSize:12, fontWeight:'bold'}}>New Lead</Text>

                    </Pressable>
                  )
                }

              })
              } />

{/* <stack.Screen name="DoctypeForm" component={DoctypeFormScreen} options={{ title: 'All Cart List' }} /> */}
{/* <stack.Screen name="DoctypeList" component={DoctypeListScreen} options={{ title: 'All Cart List' }} /> */}
<stack.Screen name="QrscannerScreeen" component={QrscannerScreeen} options={{ title: 'All Cart List' }} />

              <stack.Screen name="AddLead" component={AddLeadScreen} options={({ navigation, route: {
                params: { item },
              }
              }) => ({
                headerTitle:()=>{
                return(<View>
                    {item?(<View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Update Lead</Text>
                      <Text style={{fontSize:12, color:'grey'}}>{item.title}</Text>
                    </View>):(
                    <View>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Add New Lead</Text>
                  </View>)}

                  </View>
                )

                },
                headerRight: () => {
                  return (
                    <View>
                      {item?(
                       <View>
                         <Pressable 
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
                        </Pressable>
                        </View>
                      ):''}
                    </View>
                  )
                },
              })} />

              <stack.Screen name="OpportunityScreen" component={OpportunityScreen} options={({ navigation }) => ({
                // title: 'Opportunity', 
                 headerTitle:()=>{
                  return(
                  <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Opportunity</Text>
                  </View>
                  )
  
                  },
                
                headerRight: () => {
                  return (
                     <Pressable  onPressIn={() => { navigation.navigate('AddOpportunityScreen', Item = '') }} style={{ flexDirection: 'row' }}>
                     <View style={{ paddingHorizontal: 1 }}>
                       <Icon name="add-circle-outline" size={20} color={Colors.DEFAULT_BLUE} ></Icon>
                     </View>
                     <Text style={{color:Colors.DEFAULT_BLUE, fontSize:12, fontWeight:'bold'}}>New Opportunity</Text>
                   </Pressable>
                  )
                }

              })
              } />

              

              <stack.Screen name="AddOpportunityScreen" component={AddOpportunityScreen} options={({ navigation, route: {
                params: { item },
              }
              }) => ({
                title: 'Details Opportunity', 
             
                headerTitle:()=>{
                  return(<View>
                      {item?(<View>
                        <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}> {item.doctype=='Opportunity'?'Update Opportunity':`Add Opportunity From ${item.doctype}`}</Text>
                        <Text style={{fontSize:12, color:'grey'}}>{item.title}</Text>
                      </View>):(
                      <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Add New Opportunity</Text>
                    </View>)}
  
                    </View>
                  )
  
                  },
                  headerRight: () => {
                    return (
                      <View>
                        {/* {item?(
                          <Pressable 
                          onPressIn={() => { 
                            navigation.navigate('QrscannerScreeen', Item = {item}) 
                            // navigation.navigate('QuatationDetailsScreen', Item = {item}) 
                          }}
                           style={{ flexDirection: 'row' }}>
                            <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                              <Icon name="add-circle-outline" size={22} color={Colors.DEFAULT_BLUE} ></Icon>
                              <Text style={{ color: Colors.DEFAULT_BLUE,fontSize:13, fontWeight:'bold' }}> Quotation</Text>
                            </View>
                          </Pressable>
                        ):''} */}
                      </View>
                    )
                  },
              })
              } /> 

              <stack.Screen name="SalesInvoiceScreen" component={SalesInvoiceScreen} options={({ navigation }) => ({
                title: 'Sales Invoice', headerRight: () => {
                  return (
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ paddingHorizontal: 5 }}>
                        <Icon name="add-circle-outline" size={30} color={Colors.DEFAULT_BLUE}
                          onPressIn={() => { navigation.navigate('AddSalesInvoiceScreen', Item = '') }} ></Icon>
                      </View>

                    </View>
                  )
                }

              })
              } />

              <stack.Screen name="AddSalesInvoiceScreen" component={AddSalesInvoiceScreen} options={{ title: 'Sales Invoice Details' }} />




              <stack.Screen name="TaskScreen" component={TaskScreen} />
              <stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
              <stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />


              <stack.Screen name="QuatationScreen" component={QuotationScreen} options={({ navigation }) => ({
                // title: 'Opportunity', 
                 headerTitle:()=>{
                  return(
                  <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Quatation</Text>
                  </View>
                  )
  
                  },
                
                headerRight: () => {
                  return (
                     <Pressable  onPressIn={() => { navigation.navigate('QuatationDetailsScreen', Item = '') }} style={{ flexDirection: 'row' }}>
                     <View style={{ paddingHorizontal: 1 }}>
                       <Icon name="add-circle-outline" size={20} color={Colors.DEFAULT_BLUE} ></Icon>
                     </View>
                     <Text style={{color:Colors.DEFAULT_BLUE, fontSize:12, fontWeight:'bold'}}>New Quatation</Text>
                   </Pressable>
                  )
                }

              })
              } />
              <stack.Screen name="QuatationDetailsScreen" component={QuatationDetailsScreen} options={({ navigation, route: {
                params: { item },
              }
              }) => ({
                title: 'Details Quatation', 
             
                headerTitle:()=>{
                  return(<View>
                      {item?(<View>
                        <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}> {item.doctype=='Quotation'?'Update Quotation':`Add Quotation From ${item.doctype}`}</Text>
                        <Text style={{fontSize:12, color:'grey'}}>{item.title}</Text>
                      </View>):(
                      <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Add New Quotation</Text>
                    </View>)}
  
                    </View>
                  )
  
                  },
                  headerRight: () => {
                    return (
                      <View>
                        {item?(
                          <Pressable 
                          onPressIn={() => { 
                            // navigation.navigate('QrscannerScreeen', Item = {item}) 
                        }}
                           style={{ flexDirection: 'row' }}>
                            {/* <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                              <Icon name="add-circle-outline" size={22} color={Colors.DEFAULT_BLUE} ></Icon>
                              <Text style={{ color: Colors.DEFAULT_BLUE,fontSize:13, fontWeight:'bold' }}> Sales order</Text>
                            </View> */}
                          </Pressable>
                        ):''}
                      </View>
                    )
                  },
              })
              } />

<stack.Screen name="SalesOrderScreen" component={SalesOrderScreen} options={({ navigation }) => ({
                 headerTitle:()=>{
                  return(
                  <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Sales Order</Text>
                  </View>
                  )
  
                  },
                
                headerRight: () => {
                  return (
                     <Pressable  onPressIn={() => { navigation.navigate('AddSalesOrderScreen', Item = '') }} style={{ flexDirection: 'row' }}>
                     <View style={{ paddingHorizontal: 1 }}>
                       <Icon name="add-circle-outline" size={20} color={Colors.DEFAULT_BLUE} ></Icon>
                     </View>
                     <Text style={{color:Colors.DEFAULT_BLUE, fontSize:12, fontWeight:'bold'}}>New Sales Order</Text>
                   </Pressable>
                  )
                }

              })
              } />
              <stack.Screen name="AddSalesOrderScreen" component={AddSalesOrderScreen} options={({ navigation, route: {
                params: { item },
              }
              }) => ({
                title: 'Details Sales Order', 
             
                headerTitle:()=>{
                  return(<View>
                      {item?(<View>
                        <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}> {item.doctype=='Sales Order'?'Update Quotation':`Add Sales Order From ${item.doctype}`}</Text>
                        <Text style={{fontSize:12, color:'grey'}}>{item.title}</Text>
                      </View>):(
                      <View>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Add New Sales Order</Text>
                    </View>)}
  
                    </View>
                  )
  
                  },
                  headerRight: () => {
                    return (
                      <View>
                        {item?(
                          <Pressable 
                          onPressIn={() => { 
                            // navigation.navigate('QrscannerScreeen', Item = {item}) 
                        }}
                           style={{ flexDirection: 'row' }}>
                            {/* <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                              <Icon name="add-circle-outline" size={22} color={Colors.DEFAULT_BLUE} ></Icon>
                              <Text style={{ color: Colors.DEFAULT_BLUE,fontSize:13, fontWeight:'bold' }}> Sales order</Text>
                            </View> */}
                          </Pressable>
                        ):''}
                      </View>
                    )
                  },
              })
              } />



              <stack.Screen name="SupportScreen" component={SupportScreen} />
              <stack.Screen name="NotificationScreen" component={NotificationScreen} />
              <stack.Screen name="SettingsScreen" component={SettingsScreen} />
              <stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
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
