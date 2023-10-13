import { View, Text, Modal, Alert,StyleSheet, Pressable, FlatList, ScrollView, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../contants';
import mystyles from '../css/mystyles'
import MYinputs from './Myinputs';
import Card from './Card';
import submitReqData from '../services/FormData';

const TableInput = ({item}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCard, setModalVisibleCard] = useState(false);
  const [FormData, setFormData] = useState([])
    const [ChildData, setChildData] = useState([])

    useEffect(() => {
        getFormData()

    }, [])
    


    const getFormData=()=>{
        var myHeaders = new Headers();    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`https://erp.etplraipur.com/api/method/frappe.desk.form.load.getdoctype?doctype=${item?.link_doctype}`, requestOptions)
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
    
                // if(item){
                //   for (let i in item.data) {
                //     if (i === a.fieldname) {
                //       a.fieldvalue = item.data[i]
                //       // console.log(item.data[i])
                //     }
                //   }
                // }
                let p = {label:a.label, type:fieldtype,placeholder:a.label, key:a.fieldname, options:a.options, value:a.fieldvalue, keyboard:keyboard}
                
                  if (link_doctype){
                    p.link_doctype = link_doctype
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

      const save_new_record_in_table=()=>{
        let req = submitReqData(FormData)
        console.log(req)

      }

  return (
    <View style={[mystyles.inputContainer1, {
        backgroundColor: 'white', marginTop: 8
      }]}>

<View>
            <Text style={[mstyle.content, { fontWeight: '700',paddingLeft:7 }]}>{item.label}</Text>
        <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Open Table Form</Text>
        </Pressable>

</View>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCard}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleCard(!modalVisibleCard);
        }}>
        <SafeAreaView style={styles.centeredView}>
          <View style={{}}>

            <ScrollView
              directionalLockEnabled={true}
            // contentContainerStyle={styles.scrollModal}
            >
              <Text style={styles.modalText}>{item?.link_doctype}</Text>
              <FlatList
                style={{}}
                data={FormData}
                numColumns={1}
                renderItem={({ item }) => {
                  return (
                    <Pressable style={{ flex: 1 }}>
                      <MYinputs item={item} />

                    </Pressable>
                  )
                }}
              />


              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>{ save_new_record_in_table()
                 setModalVisibleCard(!modalVisibleCard) }}>
                <Text style={styles.textStyle}>Save New</Text>
              </Pressable>

            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.centeredView}>
          <View style={{}}>

            <ScrollView
              directionalLockEnabled={true}
            // contentContainerStyle={styles.scrollModal}
            >
              <Text style={styles.modalText}>{item?.link_doctype}</Text>
              <FlatList
                style={{}}
                data={ChildData}
                numColumns={1}
                renderItem={({ item }) => {
                  return (
                    <Pressable style={{ flex: 1 }}>
                      <Text>kj ashkdf jhajsk dfh jads</Text>
                      {/* <Card item={item} /> */}

                    </Pressable>
                  )
                }}
              />


              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>{

                // setModalVisible(!modalVisible)
                setModalVisibleCard(true)
                }}>
                <Text style={styles.textStyle}>Add New</Text>
              </Pressable>

              <Pressable
                style={[styles.button, {marginVertical:10,
                  backgroundColor: Colors.DEFAULT_RED,}]}
                onPress={() =>{

                // setModalVisible(!modalVisible)
                setModalVisibleCard(false)
                setModalVisible(false)
                }}>
                <Text style={styles.textStyle}> Go To Back </Text>
              </Pressable>

            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}



const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      marginTop: 10,
      backgroundColor:'white'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginVertical:10,
    },
    buttonOpen: {
      marginVertical:10,
      backgroundColor: Colors.DEFAULT_BLUE,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize:20,
      fontWeight:'700',
      color:Colors.DEFAULT_BLUE
    },
  });




export default TableInput