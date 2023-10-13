import { View, Text, Pressable, Alert, Modal, FlatList, ToastAndroid, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Card from './Card';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import ProductsScreen from './ProductsScreen';
import mstyle from './mstyle';
import { Colors } from '../contants';


const CartScreen = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productsList, setproductsList] = useState([])
  const [loading, setloading] = useState(false)
  const [cartList, setcartList] = useState([])
  const [modalVisibleCard, setmodalVisibleCard] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);



  useEffect(() => {
    console.log(item?.value)
    if(item?.value){
      mapped_array=[]
      item?.value.forEach(a => {
        a.title= a.item_name
        a.status='Add to cart'
        a.percent=a.qty
        a.rate=a.standard_rate
        a.subtitle = `Price - ${a.standard_rate}`
      });
    }
    getFormData()
  }, [])


  useCallback(() => {
    if(item?.value){
      mapped_array=[]
      item?.value.forEach(a => {
        a.title= a.item_name
        a.status='Add to cart'
        a.percent=a.qty
        a.rate=a.standard_rate
        a.subtitle = `Price - ${a.standard_rate}`
      });
    }
    getFormData()
    },
    [],
  )
  

  const getFormData = () => {
    // var myHeaders = new Headers();    
    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch(`https://erp.etplraipur.com/api/resource/${item?.link_doctype}?parent=${item?.docname}&fields=["*"]`, requestOptions)
    //   .then(response => response.text())
    //   .then(result =>{ 
    //     let v= JSON.parse(result)
    //     console.log(v)

    //     // console.log(v.docs[0].fields)
    //     mapped_array = []
    //     v.docs[0].fields.forEach(a => {
    //         console.log(a)
    //         mapped_array.push({ "subtitle": `rate - ${a.standard_rate}`,"rate": a.standard_rate, "title": a.item_name, "qty": 0, "status": 'Add to Cart', "percent": 0, "name": a.name })
    //     })
    //     setproductsList(mapped_array)
    // })
  }

  const addProductTocart = (product) => {
    setloading(true)
    let added = false;
    let cart = item?.value
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
      item.value=cart
      
  
    }

    getData()

  }
 

  const getData = () => {
    setTimeout(() => {
      setloading(false)
      clearTimeout();
    }, 100)
  }

  const removeProductTocart = (product) => {
    setloading(true)

    let cart = item?.value
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
          item.value=cart
         
        }
      }
    }
    getData()
  }



  return (
    <View>
      <Text style={[mstyle.content, { paddingLeft:7 }]}>{item.label} </Text>
      <Text style={[mstyle.content, { paddingLeft:7,fontWeight:'700' }]}>Total :- {item?.value.length} Items</Text>

      <Pressable style={{ padding: 10,borderColor:Colors.DEFAULT_BLUE,borderWidth:1, borderRadius: 5, marginHorizontal: 10 }}
        onPress={() => {
          setModalVisible(true)
        }} >
        <Text style={{ fontSize: 12, color: Colors.DEFAULT_BLUE,fontWeight:'700',textAlign:'center' }}>Get Item List</Text>
      </Pressable>


      <Modal visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(false)

        }}>
        <ScrollView contentContainerStyle={{}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }

          style={{ backgroundColor: 'white', flex: 1, }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '100%' }}>
              <Text style={{
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                color: Colors.DEFAULT_BLUE
              }}>{item.label} ({item?.value.length})</Text>
            </View>
            <Pressable style={{ marginLeft: 'auto' }} onPress={() => {
              // console.log(item)

              setModalVisible(false)

            }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red', paddingHorizontal: 15 }}>Close</Text>
            </Pressable>


          </View>
          <FlatList
            data={item?.value}
            numColumns={1}
            keyboardDismissMode="on-drag"
            renderItem={(item) => {
              return (
                <View>
                  <Pressable onPress={() => { addProductTocart(item.item) }}
                    style={{ flex: 1, flexDirection: 'row' }}>
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
          />

          <ProductsScreen item={item} cart_productsList={productsList} refreshcart={onRefresh} />


        </ScrollView>
      </Modal>
    </View>
  )
}

export default CartScreen