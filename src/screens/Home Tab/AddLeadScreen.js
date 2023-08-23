import { View, Text, FlatList, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../components/Myinputs'
import submitReqData from '../../services/FormData'
import { Colors } from '../../contants'

const AddLeadScreen = ({navigation,  route: {
  params: { item },
},}) => {
  const [FormData, setFormData] = useState([])
  useEffect(() => {

    getFormData()

    // console.log("Update ",item)
    
  }, [])

  const getFormData=()=>{
    var myHeaders = new Headers();    
    var requestOptions = {
      method: item?'PUT':'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://dbh.erevive.cloud/api/method/frappe.desk.form.load.getdoctype?doctype=Lead", requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        let v= JSON.parse(result)
        // console.log(v.docs[0].fields)
        mapped_array = []
        v.docs[0].fields.forEach(a => {
          if(a.label=='WhatsApp'){
          console.log(a)
          }

          let fieldtype='text'
          let fieldvalue=null
          let keyboard =''
          if (a.fieldtype=="Data"){
            fieldtype='text'
            if (a.options =="Phone"){
              console.log('Phone Number')
              a.len=10
              keyboard='phone-pad'
            }
          }else if (a.fieldtype=="Attach Image"){
            fieldtype='image'
            fieldvalue =[]
          }
          else if (a.fieldtype=="Select"){
            fieldtype='select'
            fieldvalue =''
            // let mtext = prompt(a.options)
            a.options = a.options.toString().split("\n")
            // console.log(a.options.toString().split(" "))
          }
          

         if(a.reqd){
          if(a.label){

            if(item){
              for (let i in item.data) {
                if (i === a.fieldname) {
                  a.fieldvalue = item.data[i]
                  console.log(item.data[i])
                }
              }
            }
            
            mapped_array.push({label:a.label, 
              type:fieldtype,
              placeholder:a.label, 
              key:a.fieldname, 
              options:a.options,
              value:a.fieldvalue, 
              keyboard:keyboard})
  
           }

         }
          
        });
        setFormData(mapped_array)      
      })
      .catch(error => console.log('error', error));

  }

  const submitForm=()=>{
FormData.forEach(n=>{
  if(!n.value){
    Alert.alert("Please Enter Field", `${n.label} is required`)
  }
  return
})
    let req = submitReqData(FormData)
    if (item){
      req.name = item.data.name
    }
    console.log(req)


    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify(req);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://dbh.erevive.cloud/api/resource/Lead", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  }
  
  return (
    <View>
      {/* <Text>AddLeadScreen</Text> */}
      <FlatList
          data={FormData}
          numColumns={1}
          renderItem={({item}) => {
            return (
              <Pressable  style={{flex:1}}>
               <MYinputs item={item} />
              </Pressable>
            )
          }}
        />

        <Pressable onPressIn={()=>{
         
          submitForm()
        }}>

<View style={{backgroundColor:Colors.DEFAULT_BLUE, padding:15, margin:8,borderRadius:5}}>
  <Text style={{color:'white', fontSize:15, fontWeight:'700',textAlign:'center'}}>
    {item ? 'Update Now':'Save Now'}
  </Text>
            
            </View>

        </Pressable>
    </View>
  )
}

export default AddLeadScreen