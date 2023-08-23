import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
import QuatationScreen from './src/screens/Home Tab/QuatationScreen';
import QuatationDetailsScreen from './src/screens/Home Tab/QuatationDetailsScreen';
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

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
    switch( action.type ) {
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
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  const stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? (
        <stack.Navigator >
          <stack.Screen name="HomeDrawer" component={MainTabScreen} options={() => ({ headerShown: false })} />
          <stack.Screen name="Lead" component={LeadScreen} options={({navigation})=>({ title:'Lead', headerRight:()=>{
          return(
            <View style={{flexDirection:'row'}}>
              <View style={{paddingHorizontal:5}}> 
              <Icon name="add-circle-outline" size={30} color={Colors.DEFAULT_BLUE} 
                  onPress={() => {navigation.navigate('AddLead', Item='')}} ></Icon>
              </View>
              
            </View>
          ) 
          }
        
        })
        } />
          <stack.Screen name="AddLead" component={AddLeadScreen} options={{ title:'Add New Lead' }} />

          <stack.Screen name="OpportunityScreen" component={OpportunityScreen} options={({navigation})=>({ title:'Opportunity', headerRight:()=>{
          return(
            <View style={{flexDirection:'row'}}>
              <View style={{paddingHorizontal:5}}> 
              <Icon name="add-circle-outline" size={30} color={Colors.DEFAULT_BLUE} 
                  onPress={() => {navigation.navigate('AddOpportunityScreen', Item='')}} ></Icon>
              </View>
              
            </View>
          ) 
          }
        
        })
        } />

<stack.Screen name="AddOpportunityScreen" component={AddOpportunityScreen} options={{ title:'Add New Opportunity' }} />
<stack.Screen name="SalesInvoiceScreen" component={SalesInvoiceScreen} options={({navigation})=>({ title:'Sales Invoice', headerRight:()=>{
          return(
            <View style={{flexDirection:'row'}}>
              <View style={{paddingHorizontal:5}}> 
              <Icon name="add-circle-outline" size={30} color={Colors.DEFAULT_BLUE} 
                  onPress={() => {navigation.navigate('AddSalesInvoiceScreen', Item='')}} ></Icon>
              </View>
              
            </View>
          ) 
          }
        
        })
        } />

<stack.Screen name="AddSalesInvoiceScreen" component={AddSalesInvoiceScreen} options={{ title:'Sales Invoice Details' }} />




<stack.Screen name="TaskScreen" component={TaskScreen} />
<stack.Screen name="TaskDetails" component={TaskDetailsScreen} />


<stack.Screen name="QuatationScreen" component={QuatationScreen} />
<stack.Screen name="QuatationDetailsScreen" component={QuatationDetailsScreen} />



<stack.Screen name="SupportScreen" component={SupportScreen} />
          <stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </stack.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
