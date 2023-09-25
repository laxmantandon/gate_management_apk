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
import SearchableDropDown from 'react-native-searchable-dropdown'
import Icon from 'react-native-vector-icons/Ionicons'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const AddSalesOrderScreen = ({ navigation, route: {
  params: { item },
}, }) => {
  const [FormData, setFormData] = useState([])
  const [loading, setloading] = useState(false)
  const [loading_text, setloading_text] = useState('')
  const [refreshing, setrefreshing] = useState(false)
  const [doc, setdoc] = useState()
  const [comment, setcomment] = useState('')
  const [isUpdate, setisUpdate] = useState(false)
  const [hideable, sethideable] = useState([])
  const [party_name, setparty_name] = useState({})

  useEffect(() => {
    getFormData()
    // if (item) {
    //   setisUpdate(true)
    // }
    // console.log("Update", item)
  }, [])

  const getFormData = () => {
    setloading_text('Loading Doctype Fields')
    setloading(true)
    frappe.get_doctype_fields('Sales Order').then((resp) => {
      let formd = getDoctypeFields(resp)

      if (item) {
        if(item.doctype=='Quotation'){
          console.log(item)

          getDefaultValues(formd)
          setFormData(formd)
          setloading(false)
          setloading_text()
        }else{
        setisUpdate(true)
        getFormAllData(formd)

        
        }

      } else {
        getDefaultValues(formd)
        setFormData(formd)
        setloading(false)
        setloading_text()
      }
      // console.log(FormData)
    })

  }

  const getDefaultValues = (formd) => {
    formd.forEach(a => {
      // console.log('Change Value',a)
      if (a.key == 'transaction_date') {
        a.value = moment().format('yy-MM-DD')
        // a.read_only=1
        // a.type='text'
      }

      if (a.key == 'items') {
        if(item){
        if(item.doctype=='Quotation'){
          a.value=item.doc.items
        }
      }
      }

      // if (a.key == 'selling_price_list') {
      //   if(item){
      //   if(item.doctype=='Quotation'){
      //     a.value=item.selling_price_list
      //   }
      // }
      // }

      if (a.key == 'customer') {
        if(item){
          if(item.doctype=='Quotation'){
            a.value=item.data.party_name
            
          }
        }
        if(a.value){
        a.read_only=1
        a.type='text'
        }else{
          a.type='searchable'
          a.options=[]
          a.link_doctype="Customer"
        }
      }

      if (a.key == 'selling_price_list') {
        a.value = 'Standard Buying'
        // a.read_only=1
        // a.type='text'
      }
      if (a.key == 'naming_series') {
        
        a.value = 'DBH-ORD-.YYYY.-'
        if(a.value){
        a.read_only=1
        a.type='text'
        }
        
      }
      

      
      if (a.key == 'order_type') {
        a.value = 'Sales'
        a.read_only = 1
        a.type = 'text'
      }

      if (a.key == 'company') {
        a.value = 'Dream Big Hospitality LLP'
        a.read_only = 1
        a.type = 'text'
      }

      if (a.key == 'currency') {
        a.value = 'INR'
        a.read_only = true
        a.type = 'text'
      }
      if (a.key == 'conversion_rate') {
        a.value = '1'
        a.read_only = 1
        a.type = 'text'
      }
      if (a.key == 'price_list_currency') {
        a.value = 'INR'
        a.read_only = 1
        a.type = 'text'
      }
      if (a.key == 'plc_conversion_rate') {
        a.value = '1'
        a.read_only = 1
        a.type = 'text'
      }
      if (a.key == 'status') {
        a.value = 'Draft'
        a.read_only = 1
        a.type = 'text'
      }

    });

  }

  const getFormAllData = (formd) => {
    // setloading(true)
    setloading_text('Getting Fields Values')
    frappe.get_doctype_fields_values('Sales Order', item.data.name).then((resp1) => {
      setdoc(resp1.docs[0])
      formd = SetFieldsValue(formd, resp1.docs[0])
      getDefaultValues(formd)
    })
    setFormData(formd)
    setloading(false)
    setloading_text()
    RefreshFlatlist()
  }

  const RefreshFlatlist = () => {
    setrefreshing(true)
    setTimeout(() => {
      setrefreshing(false)
    }, 500);

  }

  const submitForm = () => {
    // console.log('clicked')
    setloading(true)

    FormData.forEach(n => {
      if (!n.value) {
        Alert.alert("Please Enter Field", `${n.label} is required`)
      }
      return
    })
    let req = submitReqData(FormData)
    if (isUpdate) {
      req.name = item.data.name
      frappe.set_doc('Sales Order', req).then((result) => {
        // console.log('result',result)
        setloading(false)
        if (result.data) {
          ToastAndroid.showWithGravityAndOffset(
            'Succesfully Updated',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          navigation.goBack()
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Something Wrong',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch(e => {
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })

    } else {

      frappe.new_doc('Sales Order', req).then((result) => {
        // console.log('result',result)
        setloading(false)
        if (result.data) {
          ToastAndroid.showWithGravityAndOffset(
            'Succesfully Created',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          // navigation.goBack()
          navigation.navigate('SalesOrderScreen')
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Something Wrong',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );

        }
      }).catch(e => {
        ToastAndroid.showWithGravityAndOffset(
          'Something Wrong',
          ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
        );
      })

    }

  }

  // const AddComments = () => {
  //   if (!comment) {
  //     alert('Write something comment')
  //     return
  //   }
  //   // setloading(true)
  //   let comments = `<div class="ql-editor read-mode"><p>${comment}</p></div>`
  //   let req = {
  //     docs: doc,
  //     note: comments,
  //     method: 'add_note',
  //     args: { 'note': comments }
  //   }
  //   // console.log(req)
  //   frappe.add_comments(req).then((result) => {
  //     // console.log('result',result)
  //     setloading(false)
  //     if (result.docs) {
  //       getFormData()
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Succesfully Comment Added',
  //         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
  //       );
  //       // navigation.goBack()
  //       getFormData()
  //     } else {
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Something Wrong',
  //         ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
  //       );

  //     }
  //   }).catch(e => {
  //     setloading(false)
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Something Wrong',
  //       ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
  //     );
  //   })

  // }

  function getrefreshlist(){
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 100);
  }

  const getfiltersdata = (text,kitem, doctype) => {
    let req = {
      txt: text ? text : '',
      doctype: doctype,
      ignore_user_permissions: 0,
      reference_doctype: 'Sales Order'
      // filters: {"name":["in",["Customer","Lead","Prospect"]]}
    }
    frappe.search_links(req).then((result) => {
      // console.log(result)
      let party_ = party_name
      mapped = []
      if (result.results)
        result.results.forEach(a => {
          mapped.push({ 'id': a.value, 'name': a.description })
        });
      kitem.options = mapped
      console.log(kitem.options)
      getrefreshlist()

      // setparty_name(party_)

    })
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Frappe_Model loading={loading} text={loading_text} />
      {/* <Text>AddSalesOrderScreen</Text> */}

      {/* {isUpdate ? <Pressable onPress={() => {
        navigation.navigate('QrscannerScreeen', Item = { item })
      }} style={{ paddingVertical: 10 }} >
        <Text style={{ textAlign: 'center', color: Colors.DEFAULT_BLUE, fontWeight: 'bold' }}> + Make Sales Order</Text>
      </Pressable> : ''} */}


{FormData.map(item => {
  if(item.key=='customer'){
    if(item.value==''){
      type='searchable'
    options=[]
    link_doctype="Customer"
    }
  }
   return (
    <View style={{ flex: 1 }}>
      { item.type=='Items'?(<CartScreen item={item} />):(<MYinputs item={item} inputrefresh={getrefreshlist} />) }
    </View>
  )
})}
      {/* <FlatList
        onRefresh={() => {
        }}
        refreshing={refreshing}
        data={FormData}
        numColumns={1}
        renderItem={({ item }) => {
          
          return (
            <Pressable style={{ flex: 1 }}>
              { item.type=='Items'?(<CartScreen item={item} />):(<MYinputs item={item} inputrefresh={getrefreshlist} />) }
            </Pressable>
          )
        }}
      /> */}

      <Pressable onPress={() => {
        submitForm()
      }}>
        <View style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
            {isUpdate ? 'Update Now' : 'Save Now'}
          </Text>
        </View>
      </Pressable>

      {/* {isUpdate ? (
        <View>
          <Text style={{ fontSize: 15, fontWeight: 700, color: 'black', textAlign: 'center' }}>Comments</Text>
          <TextInput
            placeholder='add a comment'
            style={[mstyle.inputContainer, { paddingVertical: 6 }]}
            defaultValue=''
            onChangeText={(text) => {
              setcomment(text)
            }}
            numberOfLines={4}
          />
          <Pressable onPressIn={() => { AddComments() }}>
            <View style={{ borderColor: Colors.DEFAULT_BLUE, borderWidth: 1, color: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
              <Text style={{ color: Colors.DEFAULT_BLUE, fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
                Add Comment
              </Text>
            </View>
          </Pressable>

          {doc ? (<FlatList
            data={doc.notes}
            inverted
            renderItem={({ item }) => {
              // console.log(item)
              return (
                <View style={{ elevation: 4, paddingVertical: 1 }}>
                  <View style={{ borderColor: 'silver', borderWidth: .5, padding: 5, margin: 7, borderRadius: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: 'black', fontWeight: '700', fontSize: 14 }}> {item.added_by}</Text>
                    </View>
                    <HTMLView
                      value={item.note}
                      stylesheet={{
                        fontWeight: '300',
                        color: '#FF3366'
                      }}
                    />
                    <Text style={{ color: 'black', fontWeight: '400', fontSize: 12 }}> {moment(item.added_on).format('DD-MM-yy')} {moment(item.added_on).format('hh-mm a')} </Text>

                  </View>
                </View>
              )
            }}

          />) : null}
        </View>

      ) : null
      } */}




    </ScrollView>
  )
}

export default AddSalesOrderScreen