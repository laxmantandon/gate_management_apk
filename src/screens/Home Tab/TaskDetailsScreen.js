import { View, Text, FlatList, Pressable, Alert, ToastAndroid, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../components/Myinputs'
import submitReqData from '../../services/FormData'
import { Colors } from '../../contants'
import Frappe_Model from '../Frappe_Model'
import Frappe_MSG from '../Frappe_MSG'
import frappe from '../../services/frappe'
import getDoctypeFields from '../../services/getDoctypeFields'
import SetFieldsValue from '../../services/SetFieldsValue'
import CartScreen from '../../components/CartScreen'
import mstyle from '../../components/mstyle'
import HTMLView from 'react-native-htmlview';
import moment from 'moment'


const TaskDetailsScreen = ({ navigation, route: {
  params: { item },
}, }) => {
  const [FormData, setFormData] = useState([])
  const [loading, setloading] = useState(false)
  const [loading_text, setloading_text] = useState('')
  const [refreshing, setrefreshing] = useState(false)
  const [doc, setdoc] = useState()
  const [comment, setcomment] = useState('')
  useEffect(() => {
    getFormData()
    console.log("Update", item)
  }, [])

  const getFormData = () => {
    setloading_text('Loading Doctype Fields')
    setloading(true)
    frappe.get_doctype_fields('Task').then((resp)=>{
      let formd=getDoctypeFields(resp)
      if(item){
        getFormAllData(formd)
      }else{
          setFormData(formd)
          setloading(false)
          setloading_text()
      }
      // console.log(FormData)
    })

  }

  const getFormAllData=(formd)=>{
    // setloading(true)
    setloading_text('Getting Fields Values')
        frappe.get_doctype_fields_values('Task',item.data.name).then((resp1)=>{
          setdoc(resp1.docs[0])
          formd = SetFieldsValue(formd,resp1.docs[0])
        })
        setFormData(formd)
        setloading(false)
        setloading_text()
        RefreshFlatlist()
  }

  const RefreshFlatlist=()=>{
    setrefreshing(true)
    setTimeout(() => {
      setrefreshing(false)
    }, 500);

  }

  const submitForm = () => {
    console.log('clicked')
      setloading(true)

    FormData.forEach(n => {
      if (!n.value) {
        Alert.alert("Please Enter Field", `${n.label} is required`)
      }
      return
    })
    let req = submitReqData(FormData)
    if (item) {
      req.name = item.data.name
      frappe.set_doc('Task',req).then((result)=>{
        console.log('result',result)
        setloading(false)
        if(result.data){
          ToastAndroid.showWithGravityAndOffset(
            'Succesfully Updated',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          navigation.goBack()
        }else{
          ToastAndroid.showWithGravityAndOffset(
            'Something Wrong',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch(e=>{
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })

    }else{
      frappe.new_doc('Task',req).then((result)=>{
        console.log('result',result)
        setloading(false)
        if(result.data){
          ToastAndroid.showWithGravityAndOffset(
            'Succesfully Created',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          navigation.goBack()
        }else{
          ToastAndroid.showWithGravityAndOffset(
            'Something Wrong',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch(e=>{
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })

    }
  
  }

  const AddComments =()=>{
    if(!comment){
      alert('Write something comment')
      return
    }
    // setloading(true)
    let comments =`<div class="ql-editor read-mode"><p>${comment}</p></div>`
    let req={
      docs:doc,
      note:comments,
      method:'add_note',
      args:{'note':comments}
    }
    console.log(req)
    frappe.add_comments(req).then((result)=>{
      console.log('result',result)
      setloading(false)
      if(result.docs){
        getFormData()
        ToastAndroid.showWithGravityAndOffset(
          'Succesfully Comment Added',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
        // navigation.goBack()
        getFormData()
      }else{
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );

      }
    }).catch(e=>{
      setloading(false)
      ToastAndroid.showWithGravityAndOffset(
        'Something Wrong',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
    })

  }

  return (
    <ScrollView>
      <Frappe_Model loading={loading} text={loading_text} />
      {/* <Text>TaskDetailsScreen</Text> */}
      <FlatList
       onRefresh={()=>{
      }}
      refreshing={refreshing}
        data={FormData}
        numColumns={1}
        renderItem={({ item }) => {
          if (item.key=='items'){
            console.log(item)
            if(item.value){
              item.value.forEach(a => {
                a.title= a.item_name
                a.status='Add to cart'
                a.percent=a.qty
                a.rate=a.rate
                a.subtitle = `Price - ${a.rate}`
              });
            }
          }
          return (
            <Pressable style={{ flex: 1  }}
           
            >
              {/* <Text>{item.type}</Text> */}
                              { item.type=='Items'?(<CartScreen item={item} />):(<MYinputs item={item} />) }

              {/* <MYinputs item={item} /> */}
            </Pressable>
          )
        }}
      />

      <Pressable onPressIn={() => {
        submitForm()
      }}>
        <View style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
            {item ? 'Update Now' : 'Save Now'}
          </Text>
        </View>
      </Pressable>

      {/* {item?(
        <View>
          <Text style={{fontSize:15, fontWeight:700, color:'black', textAlign:'center'}}>Comments</Text>
          <TextInput
            placeholder ='add a comment'
            style={[mstyle.inputContainer,{paddingVertical:6}]}
            defaultValue =''
            onChangeText={(text)=>{
              setcomment(text)
            }}
            numberOfLines={4}
           />
          <Pressable onPressIn={() => {AddComments() }}>
            <View style={{ borderColor: Colors.DEFAULT_BLUE, borderWidth:1, color:Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
              <Text style={{ color:Colors.DEFAULT_BLUE , fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
                Add Comment
              </Text>
            </View>
          </Pressable>

         {doc?( <FlatList
          data={doc.notes}
          inverted
          renderItem={({item})=>{
            console.log(item)
            return(
              <View style={{elevation:4, paddingVertical:1}}>
               <View style={{borderColor:'silver', borderWidth:.5,  padding:5, margin:7, borderRadius:8}}>
               <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black', fontWeight: '700',fontSize:14 }}> {item.added_by}</Text>
                </View>
                <HTMLView
                  value={item.note}
                  stylesheet={{
                    fontWeight: '300',
                    color: '#FF3366'
                  }}
                />
                <Text style={{ color: 'black', fontWeight: '400', fontSize:12 }}> {moment(item.added_on).format('DD-MM-yy')} {moment(item.added_on).format('hh-mm a')} </Text>

                </View>
              </View>
            )
          }}
          
          />):null}
        </View>

      ):null
      } */}




    </ScrollView>
  )
}

export default TaskDetailsScreen