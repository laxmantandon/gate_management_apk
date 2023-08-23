import { View, Text, FlatList, SafeAreaView, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import mystyles from '../../css/mystyles'
import { Colors } from '../../contants'
import mstyle from '../../components/mstyle'
import FabButton from '../../components/FabButton'
import Icon from 'react-native-vector-icons/Ionicons';


const LeadScreen = ({ navigation }) => {
  const [ListData, setListData] = useState([{ title: 'First Title', subtitle: 'Subtitle 001' }])
  const [ScreensData, setScreensData] = useState([])
  const [responseData, setresponseData] = useState([])
  useEffect(() => {
    getData()


  }, [])

  const getData = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://dbh.erevive.cloud/api/resource/Lead?fields=[\"*\"]&filter={'modified_by':'kamesh@erevive.in'}", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)

        let m = JSON.parse(result)
        // console.log(m.data)
        mapped_array = []
        setresponseData(m?.data)
        m.data.forEach(a => {
          // console.log(a)
          mapped_array.push({data:a, title: a.name, subtitle: `${a.first_name} ${a?.last_name ? a?.last_name : ''}`, date: a.creation, whatsapp: a.whatsapp_no, call: a.mobile_no })
        });
        setListData(mapped_array)



      })
      .catch(error => console.log('error', error));



  }


  const searchFilterFunction = () => {

  }


  return (
    <SafeAreaView>
      <ScrollView>
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
          numColumns={1}
          renderItem={(item) => {
            return (
              <Pressable onPress={() => { 
                navigation.navigate('AddLead',item=item)
                 }}>
                <Card item={item} />
              </Pressable>
            )
          }}
        />
      </ScrollView>
      {/* <Pressable onPress={() => { navigation.navigate('AddLead') }} >
        <FabButton />

      </Pressable> */}
    </SafeAreaView>
  )
}

export default LeadScreen