import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../contants';

const FabButton = () => {
  return (
    <View style={{width: 128,  
        height: 50, 
        weight:50,  
        borderRadius: 30,            
        backgroundColor: Colors.DEFAULT_BLUE,                                    
        position: 'absolute',                                          
        bottom: 60,                                                    
        right: 15,
        elevation: 10}}>

        
        <View  style={{ flexDirection:'row' ,color:Colors.DEFAULT_BLUE, position: 'absolute', elevation:8, paddingBottom:2,                                        
        bottom: 5,                                                    
        right: 10,}}>
          <Icon name='add-circle-outline' size={35} style={{color:'white',alignSelf:'center' }}/>
          <Text style={{fontSize:15,fontWeight:'bold', color:'white',alignSelf:'center' }}>Start New</Text>
        </View>
       
    </View>
  )
}

export default FabButton