import { RefreshControl, View, Text, FlatList, SafeAreaView, Pressable, Image, TextInput, ScrollView, ToastAndroid, StatusBar, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Card from '../../components/Card'
import mystyles from '../../css/mystyles'
import { Colors } from '../../contants'
import mstyle from '../../components/mstyle'
import FabButton from '../../components/FabButton'
import Icon from 'react-native-vector-icons/Ionicons';
import Frappe_Model from '../Frappe_Model'
import frappe from '../../services/frappe'
import AsyncStorage from '@react-native-community/async-storage'
import SearchBoxScreen from '../FormScreens/SearchBoxScreen'
import moment from 'moment'
import { AuthContext } from '../../components/context'


const GateEntryList = ({ navigation, doc_name}) => {
  const { signOut } = React.useContext(AuthContext);

  const [ListData, setListData] = useState([])
  const [ScreensData, setScreensData] = useState([])
  const [responseData, setresponseData] = useState([])
  const [loading, setloading] = useState(false)
  const [start_limit, setstart_limit] = useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setuser] = useState()
  const [user_role, setuser_role] = useState('gatekeeper')

  const [searchInput, setsearchInput] = useState({title:'', parent:'Gate Entry', link_doctype:'Gate Entry', options:[]})

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setstart_limit(0)
  //     getData()
  //     setRefreshing(false);
  //   }, 1000);
  // }, []);

  React.useCallback(() => {
    
      getData()
      
  }, []);
  useEffect(() => {
    // console.log(doc_name)
    getData()
    Checkuser()
    AsyncStorage.getItem('user_info').then((muser)=>{
      // console.log(muser)
      setuser(JSON.parse(muser))
    })
  }, [])

  const Checkuser = () => {
    setloading(true)
    frappe.session_user().then((result) => {
      // console.log(result)

      if (result.message) {
        let mpe =result.message
        console.log(mpe)
        if(mpe.includes('logistics')){
          setuser_role('logistics')
        }
        
        frappe.get_list('User', filters = { 'name': result.message }, fields = ["*"]).then((muser) => {
          // console.log(muser)
          // console.log(muser.data[0].roles)

          if (muser.data) {
            setloading(false)
            AsyncStorage.setItem('user_info', JSON.stringify(muser.data[0])).then((e) => {
              setuser(muser.data[0])
            })
          } else {
            setloading(false)
            AsyncStorage.clear()
            signOut()

            ToastAndroid.showWithGravityAndOffset(
              'Employee not found',
              ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
          }

        })
      } else {
        setloading(false)
        signOut()
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong Please Check',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }

    })



  }

  const getData = () => {
    setloading(true)
    frappe.get_list('Gate Entry',filters=[["Gate Entry","out_time","is","not set"]], fields=["*"],start=start_limit).then((resp)=>{
      // console.log(resp)
      setloading(false)
      if(resp.data){
        let mapped_array = []
        // if(ListData.length>50){
        //   setstart_limit(start_limit+51)
        //   mapped_array= ListData
        // }

      setresponseData(resp?.data)
      resp.data.forEach(a => {
        // console.log(a)
        mapped_array.push({data:a, doctype:'Gate Entry', title: a.name, subtitle:`Vehicle No. - ${a.vehicle_number} `, 
        date: a.creation, status:'In-Out Time', percent:`${moment(a.creation).format('hh:mm')} - ${a.out_time?moment(a.out_time).format('hh:mm'):'00:00'}`})
      });
      setListData(mapped_array)
      }else{
        // setListData([])
      }
    }).catch(error =>{
         setloading(false)
         console.log('error', error)
      });
  }

   function searchFilterFunction(){
    // setloading(true)
    console.log(searchInput)
    frappe.get_list('Gate Entry',filters={'name':searchInput.value}, fields=["*"],start=start_limit).then((resp)=>{
      console.log(resp)
      // setloading(false)
      if(resp.data){
        mapped_array = []
      setresponseData(resp?.data)
      resp.data.forEach(a => {
        // console.log(a)
        mapped_array.push({data:a, doctype:'Gate Entry', title: a.name, subtitle:`Vehicle No. - ${a.vehicle_number} `, 
        date: a.creation, status:'In-Out Time', percent:`${moment(a.creation).format('hh:mm')} - ${a.out_time?moment(a.out_time).format('hh:mm'):'00:00'}`})
      });
      setListData(mapped_array)
      }else{
        // setListData([])
      }

    }).catch(error =>{
        //  setloading(false)
         console.log('error', error)
      });
  }

  const CloseEntry=(g_item)=>{
    let req={
      name:g_item.data.name,
      out_time: moment(new Date()).format('yy-MM-DD HH:mm:ss')
    }
    console.log(req)
    frappe.set_doc('Gate Entry',req).then((result)=>{
      if(result.data){
        ToastAndroid.showWithGravityAndOffset(
          'Succesfully Updated',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }else{
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }

    }).catch((e)=>{
      ToastAndroid.showWithGravityAndOffset(
        'Something Wrong',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
    })
  }

  return (
    <SafeAreaView>
       <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={'white'}
        showHideTransition={'fade'}
      />
            <Frappe_Model loading={loading} text={''} />
            <View style={{padding:8, flexDirection:'row', borderBottomColor:'silver',borderBottomWidth:.5}}>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>Gate Entry</Text>
                           <Pressable
                      onPressIn={() => { 
                      Alert.alert('Confirm ','Do you want to logout',[
                        {
                          text: 'Cancel',
                          onPress: () => null,
                          style: 'cancel',
                        },
                        { text: 'LOG OUT', onPress: () =>{signOut()} },
                      ]); 
                    }} style={{ flexDirection: 'row', marginLeft:'auto' }}>
                      <View style={{ paddingHorizontal: 1 }}>
                        <Icon name="power-outline" size={25} color={Colors.DEFAULT_RED} style={{fontWeight:'bold'}}></Icon>
                      </View>
                      {/* <Text style={{color:Colors.DEFAULT_RED, fontSize:12, fontWeight:'bold'}}> Log Out</Text> */}

                    </Pressable>

                  </View>
      <ScrollView 
      refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getData} />
        }
        >
        {/* <View style={{ flexDirection: 'row' }}> */}
         
            <SearchBoxScreen item={searchInput} inputrefresh={searchFilterFunction} />
        

        <FlatList
        onRefresh={()=>{getData()}}
        refreshing={refreshing}
          data={ListData}
          style={{paddingBottom:100}}
          // inverted
          numColumns={1}
          renderItem={(item) => {
            return (
              <Pressable 
              onLongPress={()=>{
                if(!item.item.data.out_time ){
                Alert.alert('Confirm!', 'Do You Wants To Close Gate Entry',
                [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  { text: 'YES', onPress: () => CloseEntry(item.item) },
                ]);
              }
              }}
              
              
              
              onPressIn={() => { 
                console.log(user_role)
                if(!item.item.data.out_time && user_role=='logistics'){
                navigation.navigate('AddGateEntry',item=item)
                }
                 }}>
                <Card item={item} />
              </Pressable>
            )
          }}
          // onEndReachedThreshold={0.5}
          // onEndReached={searchInput.value?'': getData}

          ListEmptyComponent={()=>{
            return(
              <View style={{marginBottom:50,marginTop:100, marginHorizontal:10}}>
                <Image source={require('../../assets/img/empty.jpg')} style={{ height:250, width:'100%'}}/>

                <Pressable style={{ borderRadius:12, padding:12, borderWidth:1, borderColor:Colors.DEFAULT_BLUE }}
                 onPressIn={()=>{
                  getData()
                }}>
                  <Text style={{fontSize:12, fontWeight:'bold', color:Colors.DEFAULT_BLUE, textAlign:'center'}}> Refresh Now</Text>

                </Pressable>
              </View>
            )
          }}
        />
      </ScrollView>
      <Pressable onPressIn={() => { navigation.navigate('AddGateEntry',item={}) }} >
        <FabButton />

      </Pressable>
    </SafeAreaView>
  )
}

export default GateEntryList