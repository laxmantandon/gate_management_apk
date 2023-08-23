

import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const userdata = () => {
    useEffect(() => {
        AsyncStorage.getItem('user_info').then((muser) =>{
            // console.log(muser) 
            // setuser(JSON.parse(muser))
        
            return JSON.parse(muser)
          })
    
      
    }, [])
    
    
  return (
    <View>
      <Text>userdata</Text>
    </View>
  )
}

export default userdata