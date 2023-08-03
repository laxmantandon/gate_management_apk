import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import HomeScreen from './src/screens/tab screens/HomeScreen';
import LoginScreen from './src/screens/auth screens/LoginScreen';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}



function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}


function HomeScreen1({ navigation }) {

  const getloggeduser=()=>{
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://dbh.erevive.cloud/api/method/frappe.desk.form.load.getdoctype?doctype=Lead&with_parent=1&cached_timestamp=&_=1690975201324'
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
  }
  
  
  
  
  
  
  
  
    const login = () => {
  let data = JSON.stringify({
    "usr": "9685062116",
    "pwd": "Aakamesh@123"
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://dbh.erevive.cloud/api/method/login',
    headers: { 
      'Content-Type': 'application/json', 
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
  
  
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home scree </Text>
        <View>
          <Icon name='area-chart' color="green" size={20} />
          <Text>Enjoy Coding.</Text>
        </View>
        <View style={{ margin: 25 }}>
          <Button
            title="Login Frappe"
            onPress={() => { login() }}
          />
        </View>
  
  
  
        <View style={{ margin: 25 }}>
          <Button
            title="User Info "
            onPress={() => { getloggeduser() }}
          />
        </View>
  
  
  
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Home2" component={HomeScreen1} />
        <Tab.Screen name="Settings1" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}