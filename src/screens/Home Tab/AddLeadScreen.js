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


const AddLeadScreen = ({ navigation, route: {
  params: { item },
}, }) => {
  const [FormData, setFormData] = useState([
    {label:'Vehicle Number', placeholder:'CG 04 HU 1245', key:'vehicle_number'},
    {label:'Entry Type', type:"select", options:['Pickup', 'Drop'], key:'type'},
    {label:'Notes', placeholder:'Add Notes', type:'textarea', key:'notes'},
    {label:'Add Bill images', value:[], type:'image', key:'images'},
  ])

  const [Form_DispatcherData, setForm_DispatcherData] = useState([
    {label:'party_name', placeholder:'', key:'party_name'},
    {label:'Invoice No.',   key:'reference_number'},
    {label:'Invoice Date', key:'invoice_date'},
    {label:'invoice_value', value:'', key:'invoice_value'},
    {label:'invoice_value', value:'', key:'item_group'},
    // {label:'invoice_value', value:'', key:'godown'},
    {label:'invoice_value', value:'', key:'transporter_name'},

    {label:'invoice_value', value:'', key:'lr_number'},
    {label:'invoice_value', value:'', key:'lr_date'},
    {label:'invoice_value', value:'', key:'packages'},
    {label:'invoice_value', value:'', key:'weight'},
    {label:'invoice_value', value:'', key:'lr_amount'},

  ])

  
  const [loading, setloading] = useState(false)
  const [loading_text, setloading_text] = useState('')
  const [refreshing, setrefreshing] = useState(false)
  const [doc, setdoc] = useState()
  const [comment, setcomment] = useState('')
  const [user_role, setuser_role] = useState('')
  useEffect(() => {
    getFormData()
    // console.log("Update", item)
  }, [])

  const getFormData = () => {
    setloading_text('Loading Doctype Fields')
    setloading(true)
    frappe.get_doctype_fields('Gate Entry').then((resp)=>{
      if(!item){

      
      FormData.forEach(a => {
        resp.docs[0].fields.forEach(b => {
          if(a.key==b.fieldname){
            b.reqd=1
          }
        });
      });
    }else{

      Form_DispatcherData.forEach(a => {
        resp.docs[0].fields.forEach(b => {
          if(a.key==b.fieldname){
            b.reqd=1
          }
        });
      });
    }
      let formd=getDoctypeFields(resp)
      formd.push({label:'Add Bill images', value:[], type:'image', key:'images'})

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
        frappe.get_doctype_fields_values('Gate Entry',item.data.name).then((resp1)=>{
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
let valid = true
    FormData.forEach(n => {
      if (!n.value) {
        valid= false
        setloading(false)
        Alert.alert("Please Enter Field", `${n.label} is required`)
      }
      return
    })
    let req = submitReqData(FormData)  
    // let number_ve =req.vehicle_number
    // req.vehicle_number = number_ve.toUpperCase()

if(valid){
    if (item) {
      req.name = item.data.name
      frappe.set_doc('Gate Entry',req).then((result)=>{
        console.log('result',result)
        setloading(false)
        if(result.data){
          if(req.images.length >=0){
            frappe.upload_file(req.images,'Gate Entry',result.data.name,0).then((res)=>{
              console.log('image uploaded',res)
              setloading(false)
              ToastAndroid.showWithGravityAndOffset(
                'Gate Entry Succesfully Updated',
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
              );
              navigation.goBack()
            })
          }else{
          ToastAndroid.showWithGravityAndOffset(
            'Succesfully Updated',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          navigation.goBack()
          }
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
      
req.in_time=moment(new Date()).format('yy-MM-DD')
      frappe.new_doc('Gate Entry',req).then((result)=>{
        console.log('result',result)
       
        if(result.data){
          if(req.images.length >=0){
            frappe.upload_file(req.images,'Gate Entry',result.data.name,0).then((res)=>{
              console.log('image uploaded',res)
              setloading(false)
              ToastAndroid.showWithGravityAndOffset(
                'Gate Entry Succesfully Created',
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
              );
              navigation.goBack()
            })
          }else{
            setloading(false)
            ToastAndroid.showWithGravityAndOffset(
              'Succesfully Created',
              ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
            navigation.goBack()
          }
         
        }else{
          setloading(false)
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
}
  }

  // const AddComments =()=>{
  //   if(!comment){
  //     alert('Write something comment')
  //     return
  //   }
  //   // setloading(true)
  //   let comments =`<div class="ql-editor read-mode"><p>${comment}</p></div>`
  //   let req={
  //     docs:doc,
  //     note:comments,
  //     method:'add_note',
  //     args:{'note':comments}
  //   }
  //   console.log(req)
  //   frappe.add_comments(req).then((result)=>{
  //     console.log('result',result)
  //     setloading(false)
  //     if(result.docs){
  //       getFormData()
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Succesfully Comment Added',
  //         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
  //       );
  //       // navigation.goBack()
  //       getFormData()
  //     }else{
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Something Wrong',
  //         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
  //       );

  //     }
  //   }).catch(e=>{
  //     setloading(false)
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Something Wrong',
  //       ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
  //     );
  //   })

  // }

  return (
    <ScrollView>
      <Frappe_Model loading={loading} text={loading_text} />
      {/* <Text>AddLeadScreen</Text> */}
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
              {/* <Text>value :-{item.value}</Text> */}
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

      




    </ScrollView>
  )
}

export default AddLeadScreen