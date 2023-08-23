import { View, Text, Pressable, Alert, Modal, FlatList, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { Colors } from '../contants';
import mstyle from './mstyle';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


const ProductsScreen = ({ item,cart_productsList }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [productsList, setproductsList] = useState([])
    const [loading, setloading] = useState(false)
    const [cartList, setcartList] = useState([])
    const [OpenScanner, setOpenScanner] = useState(false)
    const [searchText, setsearchText] = useState('')

useEffect(() => {
  searchFilterFunction('')
    if(item?.value){
      setcartList(item?.value)
    }
}, [])

    const searchFilterFunction=(text)=>{
        var myHeaders = new Headers();    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`https://dbh.erevive.cloud/api/resource/Item?filters=[["Item","item_name","like","%${text}%"]]&fields=["*"]`, requestOptions)
          .then(response => response.text())
          .then(result =>{ 
            let v= JSON.parse(result)
            // console.log(v)
            mapped_array = []
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

                mapped_array.push({"image":`https://dbh.erevive.cloud/${a.image}`, "subtitle": `Price - ${a.standard_rate}`,"rate": a.standard_rate, "title": a.item_name, "description": a.description, "item_name": a.item_name, "qty": 0, "status": 'Add to Cart', "percent": 0, "item_code": a.name })
            })
            setproductsList(mapped_array)

            
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
          mapped_array = []
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

              mapped_array.push({"image":`https://dbh.erevive.cloud/${a.image}`, "subtitle": `Price - ${a.standard_rate}`,"rate": a.standard_rate, "title": a.item_name, "description": a.description, "item_name": a.item_name, "qty": 0, "status": 'Add to Cart', "percent": 0, "item_code": a.name })
          })
          setproductsList(mapped_array)

          
      })
  }

    const getData = () => {
      setTimeout(() => {
        setloading(false)
        clearTimeout();
      }, 100)
    }

    const addProductTocart = (product) => {
        setloading(true)
        let added = false;
        console.log(product)
        let cart = productsList
        
        for (let p of cart) {
          if (p.title === product.title) {
            p.qty += 1;
            p.percent += 1;
            added = true;
            break;
          }
        }

      
        if (!added) {
          product.qty = 1;
          ToastAndroid.showWithGravityAndOffset(
            'Product Added',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
          );
          cart.push(product);
          setproductsList(cart)
          // setdata(cart)
          // console.log(    cart.reduce((a, b) => a + (b['rate'] || 0), 0)      )
          // setselectedProducts(cart)
        }

        let s_item=[]
        for (let p of cart) {
          if (p.qty > 0) {
            s_item.push(p)
          }
        }
        setcartList(s_item)

        // console.log(item)
        item.value=s_item
        cart_productsList=s_item

    
        getData()
        // getSelectedproducts()
    
      }
    
      const removeProductTocart = (product) => {
        setloading(true)
    
        let cart = cartList
        for (let [index, p] of cart.entries()) {
          if (p.title === product.title) {
            if (p.qty == 2) {
              alert('Do you wants to remove')
            }
            p.qty -= 1;
            p.percent -= 1;
    
            if (p.qty < 1) {
              ToastAndroid.showWithGravityAndOffset(
                'Product qty Removed',
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
              );
              cart.splice(index, 1);
              setdata(cart)
              // setselectedProducts(cart)
            }
          }
        }
        // getData()
        // getSelectedproducts()
    
    
      }



    return (
        <View>
            {/* <Text>ProductsScreen</Text> */}
            <Pressable style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}
                onPress={() => {
                    setModalVisible(true)
                }} >
                <Text style={{ fontSize: 15, color: 'white',textAlign:'center',fontWeight:'bold' }}>Add New Item</Text>
            </Pressable>
            <Modal visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
          <View style={{ backgroundColor: 'white', flex: 1, }}>

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
    
              }} >
                <Text >OK. Got it!</Text>
              </TouchableOpacity>
            }
          />



           ):(
             <View>
             <Text style={{ fontSize: 18, color: 'black', fontWeight: '700', textAlign: 'center' }}>Get Product List</Text>

             <View style={{ flexDirection: 'row' }}>
               <View style={[mstyle.inputContainer, { marginTop: 10, width: '83%', elevation: 2 }]}>
                 <View style={mstyle.inputSubContainer}>
                   <TextInput
                     placeholder={'Type something'}
                     placeholderTextColor={Colors.DEFAULT_GREY}
                     selectionColor={Colors.DEFAULT_GREY}
                     style={mstyle.inputText}
                     onChangeText={text => {
                       searchFilterFunction(text)
                     }}
                   />
                 </View>
               </View>

               <Pressable onPress={() => { setOpenScanner(true) }}
                 style={{
                   marginTop: 10, marginRight: 15, marginLeft: 'auto', backgroundColor: Colors.DEFAULT_BLUE, justifyContent: 'center',
                   borderColor: 'gray', borderWidth: .5, borderRadius: 5, paddingHorizontal: 5
                 }}>
                 <Icon name="filter" size={25} color={"white"} />
               </Pressable>
             </View>

             <FlatList
               refreshing={loading}
               onRefresh={() => {
                 getData()
               }}
               data={productsList}
               numColumns={1}
               keyboardDismissMode="on-drag"
               renderItem={(item) => {
                 return (
                   <View>
                     <Pressable onPress={() => { addProductTocart(item.item) }}>
                       <Card item={item} />
                     </Pressable>

                   </View>
                 )
               }}
             />

             <Pressable
               onPressIn={() => {
                 // item?.value = cartList
                 setModalVisible(false)
               }}
               style={{ backgroundColor: Colors.DEFAULT_BLUE, padding: 15, margin: 8, borderRadius: 5 }}>
               <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>
                 Go To Cart
               </Text>
             </Pressable>


           </View>
           )}



                </View>
            </Modal>
        </View>
    )
}

export default ProductsScreen