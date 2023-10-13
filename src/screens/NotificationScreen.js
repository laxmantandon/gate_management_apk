import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import frappe from '../services/frappe'
import Frappe_Model from './Frappe_Model'
import Card from '../components/Card'
import HTMLView from 'react-native-htmlview';
import { Colors } from '../contants'
import moment from 'moment'

const NotificationScreen = ({navigation}) => {
  const [loading, setloading] = useState(false)
  const [notifications, setnotifications] = useState()

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications=()=>{
    setloading(true)
    frappe.get_notifications().then((resp)=>{
      setloading(false)
      console.log('result',resp)
      if(resp.message){
        console.log(resp.message?.notification_logs)
        let mapped=[]
        resp.message?.notification_logs.forEach(a => {
          // let subject =  decodeURIComponent(a.subject)
          mapped.push({title:a.document_type, html:a.subject, data:a, subtitle:`${a.type} -(${a.document_name})`, datetime:a.creation, 
          icon:'notifications-outline', icon_color:Colors.DEFAULT_BLUE,})

        });
        setnotifications(mapped)


      }else{

      }

    }).catch((e)=>{
      console.log(e)
    })
  }
  

  return (
    <View>
      <Frappe_Model loading={loading} />
      <FlatList
      data={notifications}
      renderItem={(item)=>{
        return(
          <View style={{ elevation:1, padding:12, marginVertical:7}}>
            <HTMLView
                  value={item.item.html}
                  stylesheet={{
                    flexDirection:'row',
                    fontWeight: '300',
                    color: '#FF3366',
                    
                  }}
                />
                {/* <Text style={{color:'black'}}> 
                  <Text style={{fontWeight:'bold'}}>{item.item.data.from_user} </Text>  
                  assigned a new task for
                
                  <Text style={{fontWeight:'bold'}}> {item.item.data.for_user}</Text> </Text> */}
                <Text style={{ color:'black',fontWeight:'bold', fontSize:12}}> Created at {moment(item.item.datetime).format('DD MMM-yy hh:mm a')}</Text>
                <Pressable onPress={()=>{
                  console.log(item)
                  if(item.item.data?.document_type){
                    navigation.navigate(`${item.item?.data.document_type.replace(' ',"")}Screen`,item={item})
                    } }}>
                  <Card item={item} />
                </Pressable>
            </View>
        )
      }}
      />
    </View>
  )
}

export default NotificationScreen