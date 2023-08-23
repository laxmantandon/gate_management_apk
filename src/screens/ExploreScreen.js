import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable, Modal, Alert, TouchableOpacity, Vibration, PermissionsAndroid } from 'react-native';
import { Colors } from '../contants';
import { shadow } from 'react-native-paper';
import MYinputs from '../components/Myinputs';
import submitReqData from '../services/FormData';
import ProductsScreen from '../components/ProductsScreen';
import Card from '../components/Card';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import ProductDetailsScreen from './ProductDetailsScreen';


const ExploreScreen = () => {
  const [cartList, setcartList] = useState([])
  const [cart, setcart] = useState({value:[]})
  const [cartCreated, setcartCreated] = useState(false)

  const [isModalOpen, setisModalOpen] = useState(false)
  const [iscartModalOpen, setiscartModalOpen] = useState(false)

  const [customer, setcustomer] = useState([])
  const [mobile_no, setmobile_no] = useState([])
  const [customerDetails, setcustomerDetails] = useState([
    { label: 'Customer Name', type: 'text', placeholder: 'Customer Name', key: 'customer_name', options: '', value:'', req:1 },
    { label: 'Mobile Number', type: 'text', placeholder: 'Mobile Number', key: 'mobile_no', options: '', value:'', req:1 , keyboard: 'phone-pad' },
    { label: 'Address', type: 'textarea', placeholder: 'Customer Name', key: 'address', options: '', value:'', req:0  },
  ])

  const [OpenScanner, setOpenScanner] = useState(false)
  const [ScannedProduct, setScannedProduct] = useState(false)


  useEffect(() => {
    getAllCartStorage()

  }, [])



  const createCartStorage = () => {
    customerDetails.forEach(a => {
      if(a.req){
        if(a.value==''){
          Alert.alert(`Please Enter ${a.label}`)
        }
      }
    });
    let cust=[{value:{}}]
    cust[0].value = submitReqData(customerDetails)

    cust[0].value.items = cart
    // console.log(cust)
    AsyncStorage.setItem('user_session', JSON.stringify(cust)).then(s => {
      AsyncStorage.getItem('user_session').then(e=>{
        // console.log(e)
        setcartCreated(true)
        setiscartModalOpen(true)
      })
    })
  }

  const createCartListStorage = () => {
    AsyncStorage.setItem('user_session', JSON.stringify(cart)).then(s => {

    })
  }

  const updateCartStorage = () => {
    AsyncStorage.setItem('user_session', JSON.stringify(cart)).then(s => {

    })
  }

  const getCartStorage = () => {
    AsyncStorage.setItem('user_session').then(s => {

    })
  }

  const SearchProductData=(e)=>{
    setOpenScanner(false)
    let text=e.data
    var myHeaders = new Headers();    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://dbh.erevive.cloud/api/resource/Item?filters={"item_code":"${text}"}&fields=["*"]`, requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        let v= JSON.parse(result)
        // console.log(v)
        let mapped_array = {}
        v.data.forEach(a => {
            // console.log(a)
            if (cartList){
              cartList.forEach(c => {
                if (c.item_code==a.item_code){
                  a.percent=c.percent
                  a.qty=c.qty

                }
              });
            }

            mapped_array={"image":`https://dbh.erevive.cloud/${a.image}`, "subtitle": `Price - ${a.standard_rate}`,
            "rate": a.standard_rate, "title": a.item_name, "description": a.description, "item_name": a.item_name, 
            "qty": 0, "status": 'Add to Cart', "percent": 0, "item_code": a.name }
        })
        setScannedProduct(mapped_array)

        
    })
}


  const getAllCartStorage = () => {
    // AsyncStorage.setItem('AllCart').then(s => {
    //   console.log(s)

    // })
  }



  return (
    <View style={styles.container}>
{OpenScanner?(
  <QRCodeScanner
  onRead={(e)=>{ SearchProductData(e) }}
  reactivate={true}
  showMarker={true}
  flashMode={RNCamera.Constants.FlashMode.auto}
  cameraContainerStyle={()=>{

  }}
  // ref={(node) => { this.scanner = node }}
  // topContent={
    // <Text style={styles.centerText} >
    //   Go to{' '}
    //   <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
    //   your computer and scan the QR code.
    // </Text>
  // }
  bottomContent={
    <TouchableOpacity onPress={()=>{
      // this.scanner.reactivate()
      // PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.VIBRATE,
      //   {
      //     title: 'Camera Permission',
      //     message: 'App needs permission for camera access',
      //   },
      // );

    }} style={styles.buttonTouchable}>
      <Text style={styles.buttonText}>OK. Got it!</Text>
    </TouchableOpacity>
  }
/>
):(
<View>
<ProductDetailsScreen item={ScannedProduct} />
<Pressable style={{backgroundColor:'blue'}} onPress={()=>{setOpenScanner(true)}}>
  <Text>Close</Text>
</Pressable>

</View>
)}



      {/* <FlatList
        data={cartList}
        renderItem={() => {
          return (
            <View>
              <Text> Add new cart</Text>
            </View>
          )
        }}

        ListEmptyComponent={() => {
          return (
            <Pressable onPress={() => { setisModalOpen(true) }} style={styles.cardContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cardText}> + Add New</Text>

              </View>
            </Pressable>
          )
        }}
      /> */}


      <Modal visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setisModalOpen(!isModalOpen);
        }}>
        <View style={{ backgroundColor: 'white', flex: 1, }}>
          {/* <View style={{flexDirection:'row',width:'100%'}}> */}
          {/* <View style={{width:'80%'}}> */}
          <Text style={{ fontSize: 18, color: 'black', fontWeight: '700', textAlign: 'center' }}>Create New Cart</Text>
          {/* </View> */}
          {/* <Pressable onPress={()=>{ setisModalOpen(false)}}>
                <Text style={{ fontSize: 18, color: 'red', fontWeight: '700', marginLeft:'auto' }}>Close</Text>
              </Pressable> */}
          {/* </View> */}

          <View>
            {cartCreated?(
            <FlatList
              data={cart.value}
              renderItem={( item ) => {
                return (
                  <View>
                    <Card item={item} />
                  </View>
                )
              }}
            />
            ):(
              <FlatList
              data={customerDetails}
              renderItem={({ item }) => {
                return (
                  <View>
                    <MYinputs item={item} />
                  </View>
                )
              }}
            />
            )}


            {/* <Pressable onPressIn={() => {
              createCartStorage()
            }}>
              <View style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>
                  Start New Cart
                </Text>
              </View>

            </Pressable> */}
            {cartCreated?(
                            <ProductsScreen item={cart} />

            ):(<Pressable onPressIn={() => {
              createCartStorage()
            }}>
              <View style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>
                  Start New Cart
                </Text>
              </View>

            </Pressable>)}

          </View>



        </View>
      </Modal>


    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
    // alignItems: 'center', 
    // justifyContent: 'center'
  },

  cardContainer: {
    marginTop: 10,
    width: '50%',
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderColor: Colors.DEFAULT_BLUE,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },

  cardText: {
    fontSize: 15,
    color: Colors.DEFAULT_BLUE,
    fontWeight: 'bold',
    elevation: 5
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }



});
