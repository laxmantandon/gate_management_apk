import { View, Text, FlatList, Pressable, Alert, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../components/Myinputs'
import submitReqData from '../../services/FormData'
import { Colors } from '../../contants'
import TableInput from '../../components/TableInput'
import { TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ProductsScreen from '../../components/ProductsScreen'
import CartScreen from '../../components/CartScreen'

const AddSalesInvoiceScreen = ({navigation,  route: {
  params: { item },
},}) => {
  const [FormData, setFormData] = useState([])
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {

    getFormData()

    if(item){
      getDocData()
    }

    // console.log("Update ",item.data.name)
    
  }, [])

  const getDocData=()=>{
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://dbh.erevive.cloud/api/method/frappe.desk.form.load.getdoc?doctype=Sales%20Invoice&name=${item.data.name}`, requestOptions)
      .then(response => response.text())
      .then(result =>{
        let v= JSON.parse(result)
        mdat= v.docs[0]
        console.log(item.data.name,result)
        FormData.forEach(i => {
          console.log('mmmmmmmmmmm',i?.key)
          i.value=mdat[i.key]
          console.log(i.value)
          // if (i === a.fieldname) {
          //   a.fieldvalue = item.data[i]
          //   a.docname=a.name
          //   console.log('llllllllllllllllllllllllllllllllll',i)
          // }
        });
        setRefreshing(false)

      } )
      .catch(error => console.log('error', error));
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getFormData=()=>{
    var myHeaders = new Headers();    
    var requestOptions = {
      method: item?'PUT':'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://dbh.erevive.cloud/api/method/frappe.desk.form.load.getdoctype?doctype=Sales Order", requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        let v= JSON.parse(result)
        // console.log(v.docs[0].fields)
        mapped_array = []
        v.docs[0].fields.forEach(a => {
          if(a.label=='WhatsApp'){
          // console.log(a)
          }

          let fieldtype='text'
          let fieldvalue=null
          let keyboard =''
          let link_doctype = ''
          if (a.fieldtype=="Data"){
            fieldtype='text'
            if (a.options =="Phone"){
              // console.log('Phone Number')
              a.len=10
              keyboard='phone-pad'
            }
          }else if (a.fieldtype=="Attach Image"){
            fieldtype='image'
            a.fieldvalue =[]
          }else if (a.fieldtype =="Float" && a.options =="Int" ){
            console.log('Phone Number')
            // a.len=10
            keyboard='phone-pad'
          }
          else if (a.fieldtype=="Select"){
            fieldtype='select'
            a.fieldvalue =''
            // let mtext = prompt(a.options)
            a.options = a.options.toString().split("\n")
            // console.log(a.options.toString().split(" "))
          }

          else if (a.fieldtype=="Date"){
            fieldtype='date'
            a.fieldvalue =''
            // let mtext = prompt(a.options)
            // console.log(a.options.toString().split(" "))
          }

          else if (a.fieldtype=="Link"){
            fieldtype='select'
            a.fieldvalue =''
            link_doctype = a.options
            // let mtext = prompt(a.options)
            a.options = []
            // console.log(a.options.toString().split(" "))
          }

          else if (a.fieldtype=="Table"){
            if(a.label="Items"){
              fieldtype='Items'
              a.fieldvalue =[]

              if(item){
                for (let i in item.data) {
                  if (i === a.fieldname) {
                    a.fieldvalue = item.data[i]
                    a.docname=a.name
                    console.log('llllllllllllllllllllllllllllllllll',i)
                  }
                }
              }
              
              link_doctype = a.options
            }else{
            fieldtype='Table'
            a.fieldvalue =[]
            link_doctype = a.options
            console.log(a)
            }
          }
          

         if(a.reqd){
          if(a.label){
            if(item){
              for (let i in item.data) {
                if (i === a.fieldname) {
                  a.fieldvalue = item.data[i]
                  a.docname=a.name
                  // console.log('llllllllllllllllllllllllllllllllll',i)
                }
              }
            }
            let p = {docname:a?.name?a.name:'',label:a.label, type:fieldtype,placeholder:a.label, key:a.fieldname, options:a.options, value:a.fieldvalue, keyboard:keyboard}
            p.data=a
              if (link_doctype){
                p.link_doctype = link_doctype
              }
              if(a.read_only){
                p.read_only=a?.read_only
              }
            mapped_array.push(p)
  
           }

         }
          
        });
        // console.log(mapped_array)
        setFormData(mapped_array)      
      })
      .catch(error => console.log('error', error));

  }

  const submitForm=()=>{
// FormData.forEach(n=>{
//   if(!n.value){
//     Alert.alert("Please Enter Field", `${n.label} is required`)
//   }
//   return
// })
    let req = submitReqData(FormData)
    if (item){
      req.name = item?.data?.name
    }
    // console.log(req)


    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify(req);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
console.log(requestOptions)
fetch("https://dbh.erevive.cloud/api/resource/Sales Order", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  }
  
  return (
    <ScrollView  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      {/* <Text>AddSalesInvoiceScreen</Text> */}
      
      <FlatList
          data={FormData}
          numColumns={1}
          keyboardDismissMode="on-drag"
          renderItem={({item}) => {
            return (
              <View>
                <Text>{item.value}</Text>
                { item.type=='Items'?(<CartScreen item={item} />):(<MYinputs item={item} />) }
                {/* {item.type=='Table'?(<TableInput  item={item}/>):(<View>
                  {
                    item.type=='Items'?(<CartScreen item={item} />):(<MYinputs item={item} />)


                  }
                  
                   </View>
                   )} */}
              </View>
            )
          }}
        />
      <Pressable onPressIn={() => {
        submitForm()
      }} style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>


        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>
          {item ? 'Update Now' : 'Save Now'}
        </Text>
      </Pressable>
    </ScrollView>
  )
}

export default AddSalesInvoiceScreen