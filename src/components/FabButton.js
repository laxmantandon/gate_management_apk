import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../contants';

const FabButton = () => {
  return (
    <View style={{width: 128,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: Colors.LIGHT_BLUE,                                    
        position: 'absolute',                                          
        bottom: 20,                                                    
        right: 10,
        elevation: 10}}>

        
        <View  style={{ flexDirection:'row' ,color:Colors.DEFAULT_BLUE, position: 'absolute',                                          
        bottom: 5,                                                    
        right: 10,}}>
          <Icon name='add-circle-outline' size={42} style={{color:Colors.DEFAULT_BLUE,alignSelf:'center' }}/>
          <Text style={{fontSize:15,fontWeight:'bold', color:Colors.DEFAULT_BLUE,alignSelf:'center' }}>Start New</Text>
        </View>
       
    </View>
  )
}

export default FabButton