import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import mystyles from '../../css/mystyles'



const LoginScreen = ({navigation}) => {
  const [usr, setusr] = useState('')
  const [pwd, setpwd] = useState('')

  const  Login=()=>{

    navigation.navigate('TabScreen')
  }


  return (
    <SafeAreaView style={mystyles.container}>


      <View>

        <View style={{height:250}}>

        </View>


          <Text style={{fontSize:25, fontWeight:'600', color:'navy',textAlign:'center'}}> Let's Sign you in </Text>
          <Text style={{fontSize:15, fontWeight:'500', color:'gray',textAlign:'center'}}> Enter Below Details to continue.. </Text>

          <View style={{ margin:10,elevation:5}}>
            <TextInput
            placeholder='Username' 
            style={{borderWidth:1.5, borderColor:'gray', fontSize:15, fontWeight:'600',
                    borderRadius:15, padding:10, paddingHorizontal:20
                  }}
            onChange={(text)=>{ setusr(text)}}
            />
          </View>

          <View style={{ margin:10,marginTop:1 ,elevation:5}}>
            <TextInput
            placeholder='Password'
            placeholderTextColor={'gray'} 

            style={{borderWidth:1.5, borderColor:'gray', fontSize:15, fontWeight:'600',
                    borderRadius:15, padding:10, paddingHorizontal:20
                  }}

            onChange={(text)=>{ setpwd(text)}}

            />
          </View>



          <Pressable style={{ margin:10,marginTop:1 ,elevation:5}}
          onPressIn={()=>{
            Login()
          }}
          >
            <View
            style={{borderWidth:.2, borderColor:'gray', backgroundColor:'navy',
                    borderRadius:25, padding:15, paddingHorizontal:20
                  }}
            >
              <Text style={{color:'white', fontSize:15, fontWeight:'700', textAlign:'center'}}>Login</Text>

              </View>
          </Pressable>
      </View>
      

    </SafeAreaView>
  )
}

export default LoginScreen