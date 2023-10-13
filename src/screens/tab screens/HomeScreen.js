import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, StatusBar, Image, Pressable, Alert, ActivityIndicator, Modal, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import mystyles from '../../css/mystyles'
import { AuthContext } from '../../components/context'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import { Colors } from '../../contants'
import Geolocation from '@react-native-community/geolocation';
import Frappe_Model from '../Frappe_Model'
import Frappe_MSG from '../Frappe_MSG'
import frappe from '../../services/frappe'





const HomeScreen = ({ navigation }) => {
  const [taskData, settaskData] = useState([])
  const [ScreensData, setScreensData] = useState([
    { title: 'Lead', status: 'Completed', icon: 'Leave', route: 'Lead', image: require('../../assets/img/attraction.png') },
    { title: 'Opportunity', status: 'Pending', icon: 'camera', route: 'OpportunityScreen', image: require('../../assets/img/opportunity.png') },
    { title: 'Quotation', status: 'Completed', icon: 'camera', route: 'QuatationScreen', image: require('../../assets/img/project-management.png') },
    { title: 'Sales Order', status: 'Completed', icon: 'camera', route: 'SalesOrderScreen', image: require('../../assets/img/order.png') },
  ])

  const { signOut } = React.useContext(AuthContext);
  const [session_started, setsession_started] = useState(false)
  const [session, setsession] = useState(0)
  const [sessionTimes, setsessionTimes] = useState(0)
  const [mylocation, setmylocation] = useState('')
  const [Greating_message, setGreating_message] = useState('')
  const currentHour = moment().format("HH");
  const [user, setuser] = useState()


  useEffect(() => {

    if (currentHour >= 3 && currentHour < 12) {
      setGreating_message("Good Morning")
    } else if (currentHour >= 12 && currentHour < 15) {
      setGreating_message("Good Afternoon")
    } else if (currentHour >= 15 && currentHour < 20) {
      setGreating_message("Good Evening")
    } else if (currentHour >= 20 || currentHour < 3) {
      setGreating_message("Good Night")
    } else {
      setGreating_message('Hello')
    }
    let mylocation = {}
    Geolocation.getCurrentPosition(info => {
      // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
      console.log(info.coords.longitude, info.coords.latitude)
      setmylocation(`${info.coords.longitude}, ${info.coords.latitude}`)

      // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + info.coords.latitude + ',' + info.coords.longitude + '&key=' + myApiKey)
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //       console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
      // })
    })


    Checkuser()
    getTaskData()
    AsyncStorage.getItem("user_session").then((value) => {
      // console.log('session', value)
      const a_session = JSON.parse(value)
      if (a_session) {
        setsession_started(true)
        setsession(a_session)
      } else {
        setsession_started(false)

      }
    })
    getcurrentTime()
  }, [])




  const getTaskData = () => {
    frappe.get_list('Task', filters = [["_assign", "like", "%erevive.in%"], { "status": "Open" }], fields = ["*"]).then((res) => {
      console.log(res)
      if (res.data) {
        settaskData(res.data)
      } else {

      }
    })


  }


  const getcurrentTime = () => {
    setTimeout(() => {
      AsyncStorage.getItem("user_session").then((value) => {
        // setsession(JSON.parse(value))
        let duration = moment.duration(moment(new Date()).diff(moment(JSON.parse(value)).add(1, 'second')))
        if (duration) {
          setsessionTimes(duration.asHours())
        }
      })
      getcurrentTime()

    }, 10000);
  }

  const Checkuser = () => {
    setloading(true)
    frappe.session_user().then((result) => {
      console.log(result)
      if (result.message) {
        frappe.get_list('Employee', filters = { 'user_id': result.message }, fields = ["*"]).then((muser) => {
          console.log(muser)

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

  const SessionToggle = () => {
    let m_text = session_started ? 'Start Day! ' : 'End Day!'
    let x_text = session_started ? 'Are you sure you want to Check Out?' : 'Are you sure you want to start Day?'
    Alert.alert(m_text, x_text, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => SessionSwitch() },
    ]);

  }

  const SessionSwitch = () => {
    let req = {
      'time': moment(new Date()).format('yy-MM-DD hh:mm:ss'),
      'skip_auto_attendance': 0,
      'log_type': session_started ? 'OUT' : 'IN',
      'employee': user.employee,
      'employee_name': user.employee_name,
      'device_id': mylocation
    }
    console.log(req)

    frappe.new_doc("Employee Checkin", req).then((resp) => {
      console.log('resp', resp)
      if (resp.data) {
        if (session_started) {
          AsyncStorage.removeItem('user_session')
          setsession(0)
          setsession_started(false)
        } else {
          let current_time = new Date()
          let stime = `${current_time.toISOString().split('T')[0]} ${current_time.toTimeString().slice(0, 5)}`
          AsyncStorage.setItem('user_session', JSON.stringify(stime)).then(s => {
            setsession_started(true)
            setsession(stime)
          })
        }

      }

    })




  }

  const [loading, setloading] = useState(false)
  return (
    <SafeAreaView style={mystyles.container}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={'white'}
        showHideTransition={'fade'}
      />
      {/* <Frappe_Model loading={loading} text={''}/> */}
      {/* <Frappe_MSG visible={true} text={'nklndskl dff kd fmd m'} /> */}

      <ScrollView>



        <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 20, borderRadius: 10, elevation: 4 }}>

          <Text style={{ fontSize: 12, fontWeight: '600', color: 'black' }} >
            {Greating_message}


            ,</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }} >{user?.employee_name}</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#929eb4', paddingTop: 10 }} >{session_started ? 'You Started Your Day at' : `Start Your Today's Session`} </Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }} ><MaterialCommunityIcons name={'map-marker-radius-outline'} size={15} /> {mylocation}</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1f65ff' }} >{session_started ? moment(session).format('d MMM hh:mm A') : ''}</Text>


          <Pressable onPress={() => {
            SessionToggle()
            // setloading(true)
          }}>
            <View

              style={{
                padding: 12, paddingHorizontal: 80, flexDirection: 'row', alignSelf: 'center',
                borderColor: session_started ? 'red' : Colors.DEFAULT_BLUE, borderWidth: 1, borderRadius: 25, margin: 7
              }}>
              <Icon name='settings-power' color={session_started ? 'red' : Colors.DEFAULT_BLUE} size={25} />
              <Text style={{
                fontSize: 15, color: session_started ? 'red' : Colors.DEFAULT_BLUE, paddingHorizontal: 5,
                paddingTop: 1, textAlign: 'center', fontWeight: '600'
              }}>
                {session_started ? 'Check-Out' : 'Check-In'}
              </Text>

            </View>
          </Pressable>

        </View>



       {taskData.length?(
         <View>
         <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingTop: 5 }}>
           <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold' }}>
             Your Task
           </Text>
           <Pressable style={{ marginLeft: 'auto' }} onPress={() => { navigation.navigate('TaskScreen') }}>
             <Text style={{ marginLeft: 'auto', fontSize: 16, color: '#1f65ff', fontWeight: 'bold' }}>
               View All
             </Text>
           </Pressable>

         </View>

         <FlatList
           horizontal={true}
           data={taskData}

           renderItem={({ item }) => {
             return (
               <Pressable
                 onPress={() => { navigation.navigate('TaskDetails', item = { item }) }}
                 style={{ backgroundColor: 'skyblue', width: 320, marginVertical: 10, elevation: 4, borderRadius: 10, marginRight: 15, }}>
                 <View style={{
                   paddingHorizontal: 15, paddingTop: 15,
                 }}>
                   <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                     <View style={{ padding: 5, backgroundColor: '#f4f7fc', borderRadius: 100 }}>
                       <Icon name="task" size={25} color={'#1f65ff'} />
                     </View>
                     <View style={{
                       backgroundColor: item.status ? 'navy' : 'blue', borderWidth: 0, padding: 3, paddingHorizontal: 15,
                       borderRadius: 10, marginLeft: 'auto', height: 25
                     }}>
                       <Text style={{ color: 'white', fontSize: 12, fontWeight: 700, alignSelf: 'center' }}>{item.status}</Text>
                     </View>
                   </View>

                   <View>
                     <Text numberOfLines={2} style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>
                       {item.subject} </Text>
                     <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                       <Icon name="access-alarms" size={18} style={{ color: 'black' }} />
                       <Text style={{ fontSize: 12, paddingHorizontal: 5, fontWeight: '600', color: 'black' }}>
                         {moment(item.creation).format('DD-MM-yyyy')}
                       </Text>

                     </View>
                   </View>

                 </View>

                 <View style={{
                   flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 15, backgroundColor: 'white',
                   borderBottomStartRadius: 10, borderBottomRightRadius: 10
                 }}>
                   <View style={{ flex: 1, flexDirection: 'row' }}>
                     <Feather name="loader" color="gray" size={20} style={{ paddingHorizontal: 5 }} />
                     <MaterialCommunityIcons name="message-processing-outline" color="gray"
                       size={20} style={{ paddingHorizontal: 5 }} />
                     <Text style={{ fontSize: 12, fontWeight: 600, color: 'black' }}>{item.owner}</Text>

                     <View style={{ marginLeft: 'auto', height: 20, width: 20, borderWidth: 0, borderColor: 'gray', borderRadius: 50 }}>
                       <Icon name="person-pin" color="gray" size={20} />
                     </View>

                   </View>
                 </View>

               </Pressable>

             )
           }}

         />
       </View>

       ):''}



        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, color: 'gray', fontWeight: 'bold' }}>
              What would you like to do?
            </Text>
          </View>

          <FlatList
            data={ScreensData}
            numColumns={4}
            renderItem={({ item }) => {

              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate(item.route)
                  }}
                  style={{ backgroundColor: 'white', flex: 1, marginVertical: 5, marginRight: 5, marginTop: 10, padding: 5, elevation: 4, borderRadius: 10 }}>
                  <View style={{ padding: 10, paddingBottom: 1, alignItems: 'center', height: 50 }}>
                    {/* <Icon name="camera" size={30} /> */}
                    <Image source={item.image} style={{ width: 30, height: 30 }} />
                  </View>
                  <Text style={{ textAlign: 'center', fontWeight: '600', color: 'navy', fontSize: 12 }}>{item.title}</Text>


                </Pressable>
              )

            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen