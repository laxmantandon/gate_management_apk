import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, StyleSheet, FlatList, Pressable, Modal, Alert, TouchableOpacity, Vibration, PermissionsAndroid, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import { Colors } from '../contants';
import { shadow } from 'react-native-paper';
import MYinputs from '../components/Myinputs';
import submitReqData from '../services/FormData';
import ProductsScreen from '../components/ProductsScreen';
import Card from '../components/Card';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import ProductDetailsScreen from './ProductDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Frappe_Model from './Frappe_Model';
import moment from 'moment';



const QrscannerScreeen = ({navigation,route: {
    params: { item },
  }}) => {
  const [cartList, setcartList] = useState([])
  const [cart, setcart] = useState([])
  const [cartCreated, setcartCreated] = useState(false)
  const [showCartList, setshowCartList] = useState(true)
  const [current_storage, setcurrent_storage] = useState('')

  const [isModalOpen, setisModalOpen] = useState(false)
  const [iscartModalOpen, setiscartModalOpen] = useState(false)

  const [customer, setcustomer] = useState([])
  const [mobile_no, setmobile_no] = useState([])
  const [similarProducts, setsimilarProducts] = useState([])

  const [customerDetails, setcustomerDetails] = useState([
    { label: 'Customer Name', type: 'text', placeholder: 'Customer Name', key: 'customer_name', options: '', value: '', req: 1 },
    { label: 'Mobile Number', type: 'text', placeholder: 'Mobile Number', key: 'mobile_no', options: '', value: '', req: 1, keyboard: 'phone-pad' },
    { label: 'Address', type: 'textarea', placeholder: 'Customer Name', key: 'address', options: '', value: '', req: 0 },
  ])

  const [OpenScanner, setOpenScanner] = useState(false)
  const [ScannedProduct, setScannedProduct] = useState(false)
  const [loading, setloading] = useState(false)
  const [iscartlistRefreshing, setiscartlistRefreshing] = useState(false)
  const [iscartRefreshing, setiscartRefreshing] = useState(false)
  const [current_customer, setcurrent_customer] = useState('')

  const [docname, setdocname] = useState('')
  const [islead, setislead] = useState(false)
  const [lead, setlead] = useState('')
  const [lead_name, setlead_name] = useState('')


  

  useEffect(() => {
    
    setcurrent_customer(null)
    setcurrent_storage(null)
    setdocname('')
    if(item){
      // console.log('Create Quotation',item) 

        if (item.doctype=='Lead'){
          setlead('Lead')
          setlead_name(item.data.name)
          setloading(true)
          setislead(true)
          setdocname(item.data.name)
          setcurrent_customer('')
            customerDetails[0].value=`${item.data.first_name} ${item.data?.middle_name?item.data?.middle_name:''} ${item.data?.last_name?item.data?.last_name:''}`
            customerDetails[1].value=item?.data?.mobile_no
            console.log('Create oppurtunity',item)
            
            createCartStorage()
            setloading(false)

        }else if (item.doctype=='Opportunity'){
          setloading(true)

            console.log('Create Quotation',item) 
            setlead(item.doc.opportunity_from)
            setlead_name(item.doc.party_name)
            setdocname(item.name)
            setcurrent_customer(item.party_name)
            customerDetails[0].value=`${item.customer_name}`
            customerDetails[1].value=item?.contact_mobile
            mapped_array=[]

            if(item.doc.items){
              item.doc.items.forEach(a => {
                a.title= a.item_name
                a.status='Add to cart'
                a.percent=a.qty
                a.rate=a.base_rate
                a.subtitle = `Price - ${a.base_rate}`
                mapped_array.push(a)
              });
              // console.log(mapped_array)
              setcart(mapped_array)
              // console.log(cart)
              setloading(false)

            }
            createCartStorage()




            // createCartStorage()



        }else if (item.doctype=='Sales Order'){
            console.log('Sales Order',item.doctype)
        }
    }
    createCartListStorage()
    getAllCartStorage()

  }, [])


  const clearStorage=()=>{
    AsyncStorage.removeItem("AllCart").then(s => {
      let ab_cartlist= JSON.parse(s) 

    })

  }

  const createCartStorage = () => {
    setloading(true)

    AsyncStorage.getItem("AllCart").then(s => {
      console.log(JSON.parse(s))

      if (JSON.parse(s)){
        let ab_cartlist= JSON.parse(s)
        console.log(ab_cartlist.length)
                    customerDetails.forEach(a => {
                      if (a.req) {
                        if (a.value == '') {
                          Alert.alert(`Please Enter ${a.label}`)
                        }
                      }
                    });
                    let cust = [{ value: {} }]

                    cust[0].value = submitReqData(customerDetails)
                    cust[0].value.items = cart                    
                              // cust[0].value.items.name = `cust_cart${ab_cartlist.length}`
                              console.log(cust)
                    let newStorage=docname?docname:`cust_cart${ab_cartlist.length}`
                    if(!current_customer){
                      // createCustomer(cust[0].value)
                    }
                    
                    if (newStorage){
                      AsyncStorage.setItem(newStorage, JSON.stringify(cust)).then(s => {
                        AsyncStorage.getItem(newStorage).then(e => {
                          console.log(JSON.parse(e))
  
                          ab_cartlist.push({'name':newStorage})
                          AsyncStorage.setItem("AllCart", JSON.stringify(ab_cartlist))
                          
                          
                          if(item?.items){
                            
                          }else{
                            if(item.doc.items){

                            }else{
                              setcart([])
                            }
                            
                          }
                          setcurrent_storage(newStorage)
  
                          getAllCartStorage()
                          setisModalOpen(true)
                          setcartCreated(true)
  
                        })
                      })
                    }
        
        // setcartList(JSON.parse(s))
        // console.log('hai',s)


      }
    })

    setloading(false)

    
  }

  const createCartListStorage = () => {
    setiscartlistRefreshing(true)
    AsyncStorage.getItem("AllCart").then(s => {
      console.log(JSON.parse(s))

      if (JSON.parse(s)){
        // setcartList(s)
        let ab_cartlist= JSON.parse(s)
        ab_cartlist.forEach(citem => {
          if(citem.name !="cust_cart"){
          AsyncStorage.getItem(citem.name).then((rr)=>{
            if(JSON.parse(rr)){
              let re =JSON.parse(rr)
              citem.customer=re[0].value.customer_name
              citem.mobile_no=re[0].value.mobile_no
              // citem.items.name=citem.name
              // console.log(citem)
              
            }
            
          })
        }

          
        });
        setcartList(ab_cartlist)
        // console.log('hai',s)
        setiscartlistRefreshing(false)

      }else{
        let abc= []
        abc.push({name:'cust_cart'})
        AsyncStorage.setItem("AllCart",JSON.stringify(abc)).then(r=>{
          console.log('Created',r)

        })
        setiscartlistRefreshing(false)

      }
    })

  
  }

  const updateCartStorage = (mcart) => {
    console.log(mcart)
    console.log('storage name',current_storage)
    AsyncStorage.getItem(current_storage).then((r) => {
      console.log(r)
      console.log('storage get ho gya',current_storage)

      if (JSON.parse(r)) {
        let res = JSON.parse(r)
        res[0].value.items = mcart
        console.log('for update',res[0].value.items)
        AsyncStorage.removeItem(current_storage).then((ree)=>{
        //   console.log('storage delete ho gya',current_storage)

          AsyncStorage.setItem(current_storage, JSON.stringify(res)).then((uy)=>{
            console.log('create ho gya',JSON.parse(uy))
            AsyncStorage.getItem(current_storage).then((op)=>{
              let pp= JSON.parse(op)
              console.log('aa gya',pp[0].value.items)
            })
          })


          // AsyncStorage.

        })

      }
    })
  }


  const SearchProductData = (e) => {
    setOpenScanner(true)
    let text = e
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://erp.etplraipur.com/api/resource/Item?filters={"item_code":"${text}"}&fields=["*"]`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let v = JSON.parse(result)
        // console.log(v)
        let mapped_array = {}
        SimillerProducts(v.data[0].item_name)

        v.data.forEach(a => {
          // console.log(a)
          if (cartList) {
            cartList.forEach(c => {
              if (c.item_code == a.item_code) {
                a.percent = c.percent
                a.qty = c.qty

              }
            });
          }

          mapped_array = {
            "image": `https://erp.etplraipur.com/${a.image}`, "subtitle": `Price - ${a.dbh_mrp}`,
            "rate": a.dbh_mrp, "title": a.item_name, "description": a.description, "item_name": a.item_name,
            "qty": 0, "status": 'Add to Cart', "percent": 0, "item_code": a.name, 'mrp': a.dbh_mrp, 'sp': a.dbh_sp, 'dp': a.dbh_dp
          }
        })
        setScannedProduct(mapped_array)


      })
  }

  const SimillerProducts = (item_cate) => {
    // setOpenScanner(true)
    // let text=e.data
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://erp.etplraipur.com/api/resource/Item?fields=["*"]`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let v = JSON.parse(result)
        console.log(v)
        let mapped_array = []
        v.data.forEach(a => {
          mapped_array.push({
            "image": `https://erp.etplraipur.com/${a.image}`, "subtitle": `Price - ${a.dbh_mrp}`,
            "rate": a.dbh_mrp, "title": a.item_name, "description": a.description, "item_name": a.item_name,
            "qty": 0, "status": 'Add to Cart', "percent": 0, "item_code": a.name, 'mrp': a.dbh_mrp, 'sp': a.dbh_sp, 'dp': a.dbh_dp
          })
        })
        setsimilarProducts(mapped_array)
        // console.log('similler',similarProducts)


      })
  }


  const getAllCartStorage = () => {
    AsyncStorage.getItem("AllCart").then(s => {
      // if (s){
        // setcartList(s)
        // console.log(JSON.parse(s))
        setcartList(JSON.parse(s))
      // }

    })
  }
  const getData = (mcart) => {
    updateCartStorage(mcart)
    setTimeout(() => {
      setloading(false)
      clearTimeout();
    }, 100)
  }

  const addProductTocart = (product) => {
    setloading(true)
    let added = false;
    // console.log(product)
   
      let mcart = cart
    console.log(mcart)

    for (let p of mcart) {
      if (p.title === product.title) {
        p.qty += 1;
        p.percent += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qty = 1;
      product.percent = 1;
      ToastAndroid.showWithGravityAndOffset(
        'Product Added',
        ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
      );
      mcart.push(product);
      setcart(mcart)
    }
    getData(mcart)

    setisModalOpen(true)
    setcartCreated(true) 

  }

  const removeProductTocart = (product) => {
    setloading(true)

    let mcart = cart
    for (let [index, p] of mcart.entries()) {
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
          mcart.splice(index, 1);
          // item.value=mcart
          setcart(mcart)
         
        }
      }
    }
    getData(mcart)
  }


  const getCartRefresh = () => {
    setiscartRefreshing(true)
    console.log(cart)

    setTimeout(() => {
      setiscartRefreshing(false)
    }, 200);
  }

  const CreateOpp = () => {
    setloading(true)
    console.log(current_storage)
    AsyncStorage.getItem(current_storage).then((res_cart) => {
      let req = JSON.parse(res_cart)
      req[0].value.opportunity_from="Customer"
      if(!req[0].value.party_name){
        console.log(current_customer)
        if (!current_customer){
          createCustomer(req[0].value)
          req[0].value.party_name = current_customer
        }else{
          req[0].value.party_name = current_customer
        }
      }
      console.log(req)

      if (req){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(req[0].value);

        var requestOptions = {
          method: req[0].value?.name?'PUT':'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'  
        };
        console.log(requestOptions)

        fetch("https://erp.etplraipur.com/api/resource/Opportunity", requestOptions)
          .then(response => response.text())
          .then(result =>{ 
            setloading(false)
            let res = JSON.parse(result)
            console.log(result)
            if(res.data){
              req[0].value.name=res.data.name
              AsyncStorage.setItem(current_storage, JSON.stringify(req)).then((uy)=>{
                console.log('create ho gya',JSON.parse(uy))
                ToastAndroid.showWithGravityAndOffset(
                  'Opportunity Created',
                  ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
                );
                navigation.navigate('OpportunityScreen')


                // CreateQuotation()
               
              })

            }

          
          })
          .catch(error =>{
            setloading(false)
            console.log('error', error)
          });




      }
    })

  }


  const CreateQuotation=()=>{

    AsyncStorage.getItem(current_storage).then((res_cart) => {
      let req = JSON.parse(res_cart)
      req[0].value.quotation_to= lead?lead:"Customer"
      req[0].value.transaction_date=moment().format('yy-MM-DD')
      req[0].value.party_name=lead_name?lead_name:''
      req[0].value.order_type="Sales"
      req[0].value.gst_category="Unregistered"
      // req[0].value.transaction_date="Customer"
      
      if(!req[0].value.party_name){
        if (!current_customer){
          createCustomer(req[0].value)
          req[0].value.party_name = current_customer
        }else{
          req[0].value.party_name = current_customer
        }
      }
      console.log(req)

      if (req){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(req[0].value);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'  
        };
        console.log(requestOptions)

        fetch("https://erp.etplraipur.com/api/resource/Quotation", requestOptions)
          .then(response => response.text())
          .then(result =>{ 
            let res = JSON.parse(result)
            console.log(result)
            if(res.data){
              req[0].value.name=res.data.name

              ToastAndroid.showWithGravityAndOffset(
                'Quotation Created',
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
              );
              // navigation.goBack()
              navigation.navigate('QuatationScreen')

              AsyncStorage.setItem(current_storage, JSON.stringify(req)).then((uy)=>{
                console.log('create ho gya',JSON.parse(uy))
                
               
              })

            }else{
              Alert.alert(req.exc_type, res.exception)
            }

          
          })
          .catch(error =>{
            ToastAndroid.showWithGravityAndOffset(
              'Something Wrong',
              ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
            
            console.log('error', error)
        
        });




      }
    })

  }

  const createCustomer=(req)=>{
    // console.log('create customer',req)
    
    req. customer_group="Individual"
    req.territory="All Territories"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(req);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://erp.etplraipur.com/api/resource/Customer", requestOptions)
      .then(response => response.text())
      .then(results =>{ 
        let result =JSON.parse(results)
        console.log(result) 

        if(result){
          setcurrent_customer(result.data.name)
          // return 'h'
          // console.log(result.data.name)
        }else{
          // return 'demo'
setcurrent_customer('')
        }
      })
      .catch(error =>{ console.log('error', error)
    // return 'demo'.
    setcurrent_customer('')

  });
    
    

  }


  return (
    <SafeAreaView style={{flex:1}}>
      <Frappe_Model loading={loading} text={''}/>

      {showCartList?(
        <View style={{padding:5}}>
          <FlatList
          ListHeaderComponent={()=>{
            return(
              <View>
                <Text style={{textAlign:'center',color:'black', fontWeight:'bold',fontSize:15}}>All Cart List</Text>

              </View>
            )
          }}
        onRefresh={()=>{createCartListStorage()
          getAllCartStorage()
        }}
        refreshing={iscartlistRefreshing}
        data={cartList}
        numColumns={2}
        renderItem={({item}) => {
        //  console.log('carts',item)
          return (
            <View style={{flex:1, padding:5}}>
              {item.name=='cust_cart'?(
                <Pressable onPress={() => { setisModalOpen(true)
                  setcartCreated(false) 
                setcart([])
                }} style={styles.cardContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.cardText}> + Add New Cart</Text>
  
                </View>
              </Pressable>
              ):(
                <Pressable onPress={() => { 
                   
                AsyncStorage.getItem(item.name).then((r)=>{
                  if(r){
                    let resp=JSON.parse(r)
                    // console.log(resp)

                    // console.log(resp[0].value.items)
                    setcart(resp[0].value.items)
                    // setcart(JSON.parse(r))
                    setcurrent_storage(item.name)
                    setisModalOpen(true)
                    setcartCreated(true)
                  }
              
                })
                
                
                }} style={[styles.cardContainer,{marginLeft:1}]}>
              <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cardText}>{item?.customer?item?.customer:item?.name}</Text>
              {/* <Text style={styles.cardText}>{item?.mobile_no?item?.mobile_no:''}</Text> */}

              </View>
            </Pressable>
              )}
              
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
      />
        </View>
      ):(
        <View style={{flex:1}}>
              {OpenScanner == false ? (
                <View style={{flex:1}}>
                  <QRCodeScanner
                  onRead={(e) => { SearchProductData(e.data) }}
                  reactivate={true}
                  showMarker={true}
                  flashMode={RNCamera.Constants.FlashMode.auto}
                  cameraContainerStyle={{}}
                  // topContent={
                  // <Text style={styles.centerText} >
                  
                  //   <Text style={styles.textBold}> Demo text</Text> 
                  //   Demo Text
                  // </Text>
                  // }
                  bottomContent={
                    <TouchableOpacity onPress={() => {
                      setshowCartList(true)
                      
                    }} style={styles.buttonTouchable}>
                      <Text style={{color:Colors.DEFAULT_BLUE, fontWeight:'700'}}>Go To Cart List</Text>
                    </TouchableOpacity>
                  }
                />
                  </View>
              ) : (
                <ScrollView style={{paddingHorizontal:10}}>
                  {/* <Text>{OpenScanner}</Text> */}
                  <ProductDetailsScreen item={ScannedProduct} />
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>
                      Similar Products
                    </Text>
                    <FlatList
                      horizontal={true}
                      data={similarProducts}
                      renderItem={({ item }) => {
                        return (
                          <Pressable onPress={()=>{SearchProductData(item?.item_code)  }} style={{ width: 100, marginRight: 8 }}>
                            <View>
                              <Image source={{ uri: item?.image }} style={{ width: 'auto', height: 100, borderRadius: 10 }} />
                              <Text numberOfLines={1} style={{ fontSize: 12, color: 'black', fontWeight: '500' }}>{item?.title}</Text>
                              <Text numberOfLines={1} style={{ fontSize: 12, color: 'black' }}>MRP:- Rs. {item?.mrp}</Text>
                            </View>
                          </Pressable>
                        )
                      }}
        
                    />
                  </View>
        
                  <Pressable style={{ backgroundColor: 'gold', padding: 10, marginBottom: 10 }} onPress={() => {
                    addProductTocart(ScannedProduct)
                    // console.log(ScannedProduct)
                  }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Add To Cart</Text>
                  </Pressable>
        
                  <Pressable style={{ backgroundColor: 'blue', padding: 10 }} onPress={() => { setOpenScanner(false) }}>
                    <View style={{flexDirection:"row"}}>
                      <Icon name={'qr-code-outline'}  size={25}/>
                      <Text style={{ color: 'white', fontWeight: '700' }}>Scan QR</Text>

                    </View>
                  </Pressable>
        
                </ScrollView>
              )}
        </View>
        
      )}


      


      <Modal visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setisModalOpen(!isModalOpen);

          console.log('mcart', cart)
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

          <View style={{flex:1}}>  
            {cartCreated ? (
                <View style={{flex:1}}>
              <FlatList
              refreshing={iscartRefreshing}
              onRefresh={()=>{
                getCartRefresh()
              }}
              
                data={cart}
                renderItem={(item) => {
                  return (
                    <View>
                      <Pressable onPress={()=>{
                        addProductTocart(item.item)
                      }}>
                      <Card item={item} />

                      </Pressable>

                      {item.item.qty > 0 ? (
                    <Pressable style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 15 }}
                      onPress={() => { removeProductTocart(item.item) }}
                    >
                      <Icon
                        name={'remove-circle'} size={23} style={{ paddingRight: 5, color: 'red' }} />
                      <Text style={{ paddingTop: 2, color: 'red', fontWeight: 'bold' }}>Remove product from cart</Text>
                    </Pressable>
                  ) : ''}
                    </View>
                  )
                }}

                ListEmptyComponent={()=>{
                  return(
                  <View style={{marginVertical:50}}>
                    <Text style={{textAlign:'center',color:'black'}}> No Items In Cart</Text>
                    </View>
                  )
                }}

              />


                              <View style={{ flexDirection:'row'}}> 

                                  <Pressable style={{ backgroundColor: Colors.DEFAULT_BLUE, borderRadius: 5, padding: 10,marginHorizontal:10 ,marginVertical: 10 }} onPress={() => {
                                      setisModalOpen(false)
                                      setshowCartList(false)
                                      setOpenScanner(false)
                                  }}>
                                      {/* <Text style={{ color: 'white', fontWeight: '700' }}>Scan QR</Text> */}
                                      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                                          <Icon name={'qr-code-outline'} size={20} style={{ color: 'white' }} />
                                          <Text style={{ color: 'white', fontWeight: '700' }}> Scan QR</Text>
                                      </View>

                                  </Pressable>

{
  islead==false?(
    
                                  <Pressable style={{flex:1, backgroundColor: Colors.DEFAULT_BLUE, borderRadius: 5, padding: 10, marginVertical:10 ,marginHorizontal: 10 }}
                                      onPress={() => {

                                        Alert.alert('Please Confirm', 'Do you wants to make Quatation', [
                                          {
                                            text: 'Cancel',
                                            onPress: () => null,
                                            style: 'cancel',
                                          },
                                          { text: 'YES', onPress: () => CreateQuotation() },
                                        ]);
                                          

                                      }}>
                                      {/* <Text style={{ color: 'white', fontWeight: '700' }}>Scan QR</Text> */}
                                      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                                          {/* <Icon name={'qr-code-outline'}  size={20} style={{color:'white'}}/> */}
                                          <Text style={{ color: 'white', fontWeight: '700' }}>+ Quotation</Text>
                                      </View>

                                  </Pressable>
      

  ):(
    <View style={{flex:1,flexDirection:'row'}}>
       <Pressable
                                      style={{ backgroundColor: Colors.DEFAULT_BLUE, borderRadius: 5, padding: 10, marginHorizontal:0,marginVertical:10 }}
                                      onPress={() => {
                                          
                                          Alert.alert('Please Confirm', 'Do you wants to make Oppurtunity', [
                                            {
                                              text: 'Cancel',
                                              onPress: () => null,
                                              style: 'cancel',
                                            },
                                            { text: 'YES', onPress: () => CreateOpp() },
                                          ]);
                                      }}>
                                      {/* <Text style={{ color: 'white', fontWeight: '700' }}>Scan QR</Text> */}
                                      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                                          {/* <Icon name={'qr-code-outline'}  size={20} style={{color:'white'}}/> */}
                                          <Text style={{ color: 'white', fontWeight: '700' }}>+ Opportunity</Text>
                                      </View>

                                  </Pressable>

                                  <Pressable style={{flex:1, backgroundColor: Colors.DEFAULT_BLUE, borderRadius: 5, padding: 10, marginVertical:10 ,marginHorizontal: 10 }}
                                      onPress={() => {
                                        Alert.alert('Please Confirm', 'Do you wants to make Quatation', [
                                          {
                                            text: 'Cancel',
                                            onPress: () => null,
                                            style: 'cancel',
                                          },
                                          { text: 'YES', onPress: () => CreateQuotation() },
                                        ]);
                                      }}>
                                      {/* <Text style={{ color: 'white', fontWeight: '700' }}>Scan QR</Text> */}
                                      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                                          {/* <Icon name={'qr-code-outline'}  size={20} style={{color:'white'}}/> */}
                                          <Text style={{ color: 'white', fontWeight: '700' }}>+ Quotation</Text>
                                      </View>

                                  </Pressable>
      </View>


  )
}
                                  



                                  


                                  {/*  */}


                              </View>

              </View>
            ) : (
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
            {cartCreated ? (
                <View>

              {/* <ProductsScreen item={cart} cart_productsList={cart} /> */}
              </View>

            ) : (<Pressable onPressIn={() => {
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


    </SafeAreaView>
  );
};

export default QrscannerScreeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
    // alignItems: 'center', 
    // justifyContent: 'center'
  },

  cardContainer: {
    marginTop: 10,

    width: '100%',
    // paddingHorizontal: 20,
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
