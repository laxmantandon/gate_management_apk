import { View, Text, Modal, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import mystyles from '../css/mystyles'
import { Colors } from '../contants'
// import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';


const Frappe_MSG = ({visible, text}) => {
    const [showmodal, setshowmodal] = useState(visible)
    useEffect(() => {
        // NotificationSounds.getNotifications('notification').then(soundsList  => {
        //     console.warn('SOUNDS', JSON.stringify(soundsList));
        //     playSampleSound(soundsList[38])
        //     // stopSampleSound();
        //   });

        setTimeout(() => {
            setshowmodal(false)
        }, 50000);
      
    }, [])
    
  return (
    <Modal transparent visible={showmodal} onRequestClose={
        visible=false
    }>
    <Pressable onPress={()=>{setshowmodal(false)}} style={[mystyles.modalBackGround]}>
    <View style={{}}>
        <View style={{backgroundColor:Colors.DEFAULT_BLUE,top:50, padding:20, borderRadius:15,elevation:5}}>
         <Text style={{fontSize:15, color:'white'}}> {text?text:'Loading Please Wait'} </Text> 
        </View>
        </View>
    </Pressable>
  </Modal>
  )
}

export default Frappe_MSG