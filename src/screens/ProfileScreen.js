import React, { useContext ,useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Pressable, Image, ToastAndroid } from 'react-native';
import mstyle from '../components/mstyle';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../contants';
import { AuthContext } from '../components/context';
import frappe from '../services/frappe';
import Frappe_Model from './Frappe_Model';


const ProfileScreen = ({navigation}) => {
  const { signOut } = React.useContext(AuthContext);
  const [user, setuser] = useState()
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
    frappe.session_user().then((result)=>{
      console.log(result)

      if(result.message){
        frappe.get_list('Employee',filters={'user_id':result.message}, fields=["*"]).then((muser)=>{
          console.log(muser)

          if(muser.data){
            setloading(false)

            setuser(muser.data[0])
          }else{
            setloading(false)

            ToastAndroid.showWithGravityAndOffset(
              'Employee not found',
              ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
          }

        })
      }else{
        setloading(false)
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong Please Check',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      }

    })
  
   
  }, [])
  

    return (
      <SafeAreaView style={mstyle.container}>
       <View>
        <ScrollView style={{ }}>
          <Frappe_Model loading={loading} />
          <View style={{ flexDirection:'row',backgroundColor:'white',borderRadius:15, padding:15,margin:10,marginBottom:1, elevation:5}} >
                <View style={{borderRadius:100, height:70,width:70, backgroundColor:Colors.LIGHT_BLUE}}>
                      {/* <Icon name="person" size={50} /> */}
                      <Image source={{uri:`${frappe.base_url}${user?.image}`}} height={70} width={70}  />
                </View>
                <View style={{paddingHorizontal:10}}>
                      <Text numberOfLines={1} style={{fontSize:25, color:'black', fontWeight:'700'}}>{user?.employee_name}</Text>
                      <Text numberOfLines={1} style={{fontWeight:'600', fontSize:15}}>{user?.designation}</Text>
                </View>
          </View>


          <View style={{ backgroundColor:'white',borderRadius:15, padding:15,margin:10, elevation:5}} >

              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>Employee ID</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.name}</Text>
              </View>

              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>Date of Joining</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.date_of_joining}</Text>
              </View>
              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>Date of Birth</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.date_of_birth}</Text>
              </View>
              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>Gender</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.gender}</Text>
              </View>
              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>Email ID</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.user_id}</Text>
              </View>
              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>Mobile Number</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.cell_number}</Text>
              </View>
              <View style={{paddingHorizontal:4,paddingVertical:10, borderBottomColor:'silver',borderBottomWidth:.5}}>
                  {/* <Text style={{fontSize:'12', fontWeight:'600'}}> Employee ID</Text> */}
                  <Text style={{fontSize:12,color:'gray'}}>WhatsApp Number</Text>
                  <Text style={{fontSize:15,color:'black', fontWeight:'700'}}>{user?.cell_number}</Text>
              </View>
              
            
                
          </View>





            <Pressable
              onPress={()=>{navigation.navigate('ResetPasswordScreen')}}
             style={{ backgroundColor:'white', borderRadius: 15, padding: 12, margin: 10, marginBottom:1,marginTop:1, elevation: 5 }} >
              <View style={{ flexDirection:'row',padding: 1 }}>
                <Icon name='lock-open-outline' size={23} color={Colors.DEFAULT_BLUE} />
                <Text style={{ fontSize: 15, color:Colors.DEFAULT_BLUE, fontWeight: '700',paddingHorizontal:10 }}>Change Password</Text>
                <View style={{marginLeft:'auto'}}>
                      <Icon name='arrow-forward-sharp' size={23} color={Colors.DEFAULT_BLUE} />
                </View>
              </View>
            </Pressable>
{/* 
            <View style={{ backgroundColor:Colors.DEFAULT_BLUE, borderRadius: 15, padding: 12, margin: 10,marginTop:5, elevation: 5 }} >
              <View style={{ flexDirection:'row',padding: 1 }}>
                <Icon name='power' size={23} color="white" />
                <Text style={{ fontSize: 15, color: 'white', fontWeight: '700',paddingHorizontal:10 }}>HR-Raipur-00002</Text>
                <View style={{marginLeft:'auto'}}>
                      <Icon name='arrow-forward-outline' size={23} color="white" />
                </View>
              </View>
            </View> */}


            <Pressable onPressIn={()=>{signOut()}}
            style={{ backgroundColor:Colors.DEFAULT_RED, borderRadius: 15, padding: 12, margin: 10, elevation: 5 }} >
              <View style={{ flexDirection:'row',padding: 1 }}>
                <Icon name='power' size={23} color="white" />
                <Text style={{ fontSize: 15, color: 'white', fontWeight: '700',paddingHorizontal:10 }}>Sign Out</Text>
                <View style={{marginLeft:'auto'}}>
                      <Icon name='arrow-forward-outline' size={23} color="white" />
                </View>
              </View>
            </Pressable>
        </ScrollView>

       </View>
      </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
