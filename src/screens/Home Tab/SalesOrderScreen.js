import { RefreshControl, View, Text, FlatList, SafeAreaView, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import mystyles from '../../css/mystyles'
import { Colors } from '../../contants'
import mstyle from '../../components/mstyle'
import FabButton from '../../components/FabButton'
import Icon from 'react-native-vector-icons/Ionicons';
import Frappe_Model from '../Frappe_Model'
import frappe from '../../services/frappe'


const SalesOrderScreen = ({ navigation, item }) => {
  const [ListData, setListData] = useState([])
  const [ScreensData, setScreensData] = useState([])
  const [responseData, setresponseData] = useState([])
  const [loading, setloading] = useState(false)
  const [start_limit, setstart_limit] = useState(0)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setstart_limit(0)
      getData()
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(item)


    getData()
  }, [])


  const getData = () => {
    
    setloading(true)
    frappe.get_list('Sales Order',filters={}, fields=["*"],start=start_limit).then((resp)=>{
      // console.log(resp)
      setloading(false)
      if(resp.data){
        setstart_limit(start_limit+21)
        mapped_array = start_limit?ListData:[]
      setresponseData(resp?.data)
      resp.data.forEach(a => {
        // console.log(a)
        mapped_array.push({data:a, doctype:'Sales Order', title: a.name, subtitle: `${a.customer_name}`, 
        date: a.modified, whatsapp: a.whatsapp_no?a.whatsapp:a.contact_mobile, call: a.contact_mobile })
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


  


  const searchFilterFunction = (text) => {
    setloading(true)
    frappe.get_list('Sales Order',filters={}, fields=["*"],start=start_limit).then((resp)=>{
      // console.log(resp)
      setloading(false)
      if(resp.data){
        setstart_limit(start_limit+21)
        mapped_array = ListData
      setresponseData(resp?.data)
      resp.data.forEach(a => {
        // console.log(a)
        mapped_array.push({data:a, doctype:'Sales Order', title: a.name, subtitle: `${a.first_name} ${a?.last_name ? a?.last_name : ''}`, 
        date: a.creation, whatsapp: a.whatsapp_no?a.whatsapp:a.mobile_no, call: a.mobile_no })
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


  return (
    <SafeAreaView>
            <Frappe_Model loading={loading} text={''} />

      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flexDirection: 'row' }}>
          <View style={[mstyle.inputContainer, { marginTop: 10, width: '83%', elevation: 2 }]}>
            <View style={mstyle.inputSubContainer}>
              <TextInput
                placeholder={'Type something'}
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                style={mstyle.inputText}
                onChangeText={text => {
                  searchFilterFunction(text)
                }}
              />
            </View>
          </View>

          <View style={{
            marginTop: 10, marginRight: 15, marginLeft: 'auto', backgroundColor: Colors.DEFAULT_BLUE, justifyContent: 'center',
            borderColor: 'gray', borderWidth: .5, borderRadius: 5, paddingHorizontal: 5
          }}>
            <Icon name="filter" size={25} color={"white"} />
          </View>
        </View>


        <FlatList
          data={ListData}
          // inverted
          numColumns={1}
          renderItem={(item) => {
            return (
              <Pressable onPress={() => { 
                navigation.navigate('AddSalesOrderScreen',item=item)
                 }}>
                <Card item={item} />
              </Pressable>
            )
          }}
          onEndReachedThreshold={0.2}
          onEndReached={()=>{getData()}}

          ListEmptyComponent={()=>{
            return(
              <View style={{marginBottom:50,marginTop:100, marginHorizontal:10}}>
                <Image source={require('../../assets/img/empty.jpg')} style={{ height:250, width:'100%'}}/>

                <Pressable style={{ borderRadius:12, padding:12, borderWidth:1, borderColor:Colors.DEFAULT_BLUE }}
                 onPress={()=>{
                  getData()
                }}>
                  <Text style={{fontSize:12, fontWeight:'bold', color:Colors.DEFAULT_BLUE, textAlign:'center'}}> Refresh Now</Text>

                </Pressable>
              </View>
            )
          }}
        />
      </ScrollView>
      {/* <Pressable onPress={() => { navigation.navigate('AddSalesOrder') }} >
        <FabButton />

      </Pressable> */}
    </SafeAreaView>
  )
}

export default SalesOrderScreen