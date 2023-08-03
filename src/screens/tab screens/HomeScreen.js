import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import mystyles from '../../css/mystyles'



const HomeScreen = () => {
  const [taskData, settaskData] = useState([{ title: 'My First Task', status: 'Completed', statuscolor: "navy", icon: 'camera' },
  { title: 'My Second Task', status: 'Pending', statuscolor: "orange", icon: 'camera' },
  { title: 'My Third Task', status: 'Overdue', statuscolor: "red", icon: 'camera' }
  ])
  const [ScreensData, setScreensData] = useState([{ title: 'Lead', status: 'Completed', icon: 'Leave', image: require('../../assets/img/attraction.png') },
  { title: 'Opportunity', status: 'Pending', icon: 'camera', image: require('../../assets/img/opportunity.png') },
  { title: 'quotation', status: 'Completed', icon: 'camera', image: require('../../assets/img/project-management.png') },
  { title: 'Sales Order', status: 'Completed', icon: 'camera', image: require('../../assets/img/order.png') },
  ])

  return (
    <SafeAreaView style={mystyles.container}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={'white'}
        showHideTransition={'fade'}
      />

      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[mystyles.title, { width: '85%' }]}>Isha Kitchen ( DBH )</Text>
          <View style={{ flex: 1, flexDirection: 'row', marginLeft: 'auto' }}>
            <Icon name='notifications-none' color="#929eb4" size={25} />
            <Icon name='help-outline' color="#45a1f3" size={25} />
          </View>
        </View>

        <View style={{ backgroundColor: 'white', padding: 15, marginVertical: 20, borderRadius: 25, elevation: 4 }}>

          <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }} >Good Evening,</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }} >Kamesh Kumar</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#929eb4', paddingTop: 8 }} >You Started Your Day at</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#45a1f3' }} >12:27PM</Text>


          <View
            style={{
              padding: 12, paddingHorizontal: 80, flexDirection: 'row', alignSelf: 'center',
              borderColor: 'red', borderWidth: 1, borderRadius: 25, margin: 10
            }}>
            <Icon name='settings-power' color="red" size={25} />
            <Text style={{ fontSize: 15, color: 'red', paddingHorizontal: 5, paddingTop: 1, textAlign: 'center', fontWeight: '600' }}>
              Check-Out
            </Text>

          </View>

        </View>



        <View>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ width: "80%", fontSize: 18, color: 'gray', fontWeight: 'bold' }}>
              Your Task
            </Text>

            <Text style={{ width: "20%", fontSize: 18, color: 'navy', fontWeight: 'bold' }}>
              View All
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={taskData}

            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: 'skyblue', width: 320, marginVertical: 10, elevation: 4, borderRadius: 25, marginRight: 15, }}>
                  <View style={{
                    paddingHorizontal: 15, paddingTop: 15,
                  }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                      <View style={{ padding: 5, backgroundColor: '#f4f7fc', borderRadius: 100 }}>
                        <Icon name="task" size={35} color={'navy'} />
                      </View>
                      <View style={{
                        backgroundColor: item.statuscolor, borderWidth: 0, padding: 3, paddingHorizontal: 15,
                        borderRadius: 25, marginLeft: 'auto', height: 25
                      }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 700, alignSelf: 'center' }}>{item.status}</Text>
                      </View>
                    </View>

                    <View>
                      <Text numberOfLines={2} style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>
                        {item.title} {item.title} {item.title} {item.title} </Text>
                      <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <Icon name="access-alarms" size={22} style={{ paddingTop: 2 }} />
                        <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>
                          00.00.00
                        </Text>

                      </View>
                    </View>

                  </View>

                  <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white', borderBottomStartRadius: 25, borderBottomRightRadius: 25 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Feather name="loader" color="gray" size={22} style={{ paddingHorizontal: 5 }} />
                      <MaterialCommunityIcons name="message-processing-outline" color="gray" size={25} style={{ paddingHorizontal: 5 }} />
                      <Text style={{ fontSize: 15, fontWeight: 600, color: 'black' }}>Laxman Tondan</Text>

                      <View style={{ marginLeft: 'auto', height: 30, width: 30, borderWidth: 0, borderColor: 'gray', borderRadius: 50 }}>
                        <Icon name="person-pin" color="gray" size={33} />
                      </View>

                    </View>
                  </View>

                </View>

              )
            }}

          />
        </View>




        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ width: "80%", fontSize: 18, color: 'gray', fontWeight: 'bold' }}>
              What would you like to do?
            </Text>
          </View>

          <FlatList
            data={ScreensData}
            numColumns={3}
            renderItem={({ item }) => {

              return (
                <View style={{ backgroundColor: 'white', flex: 1, margin: 5, marginTop: 10, padding: 5, elevation: 4, borderRadius: 18 }}>
                  <View style={{ padding: 10, paddingBottom: 1, alignItems: 'center', height: 50 }}>
                    {/* <Icon name="camera" size={30} /> */}
                    <Image source={item.image} style={{ width: 30, height: 30 }} />
                  </View>
                  <Text style={{ textAlign: 'center', fontWeight: '600' }}>{item.title}</Text>


                </View>
              )

            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen