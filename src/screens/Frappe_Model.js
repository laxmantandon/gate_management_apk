import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import mystyles from '../css/mystyles'
import { Colors } from '../contants'

const Frappe_Model = ({loading, text}) => {
  return (
    <Modal transparent visible={loading}>
    <View style={mystyles.modalBackGround}>
    <View style={{}}>
        <View style={{backgroundColor:'white', padding:20, borderRadius:15}}>
         <Text style={{fontSize:15, color:'black'}}> {text?text:'Loading Please Wait'} </Text> 
         <ActivityIndicator size={'large'} color={Colors.GOOGLE_BLUE}/>

        </View>
        </View>
    </View>
  </Modal>
  )
}

export default Frappe_Model