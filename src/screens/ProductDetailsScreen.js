import { View, Text, Image, FlatList, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../contants'

const ProductDetailsScreen = ({item}) => {
    console.log('qqqqqqqqqqqq',item)

    const [similarProducts, setsimilarProducts] = useState([])
    useEffect(() => {
      SearchProductData()
    }, [])
    

    const SearchProductData=()=>{
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
        .then(result =>{ 
          let v= JSON.parse(result)
          console.log(v)
          let mapped_array = []
          v.data.forEach(a => {  
              mapped_array.push({"image":`https://erp.etplraipur.com/${a.image}`, "subtitle": `Price - ${a.standard_rate}`,
              "rate": a.standard_rate, "title": a.item_name, "description": a.description, "item_name": a.item_name, 
              "qty": 0, "status": 'Add to Cart', "percent": 0, "item_code": a.name,'mrp':a.dbh_mrp,'sp':a.dbh_sp, 'dp':a.dbh_dp })
          })
          setsimilarProducts(mapped_array)
          // console.log('similler',similarProducts)
  
          
      })
  }
  return (
    <ScrollView style={{marginTop:10}}>
      

      <View style={{width:'100%', height:350,
            borderRadius:8, marginBottom:15 }}>
          <Image source={{uri:item?.image}} style={{ height:350,
            borderRadius:8, }} />
      </View>
      
    

      <View>
  
      <Text style={{ fontSize:12, color:'black', fontWeight:'400', }}>{item?.item_code}</Text>
      <Text style={{ fontSize:18, color:'black', fontWeight:'bold',paddingBottom:7 }}>{item?.item_name}</Text>

      <View style={{backgroundColor:Colors.LIGHT_BLUE, borderRadius:15, paddingLeft:3, width:150}}>
      <Text style={{ fontSize:14, color:Colors.DEFAULT_BLUE, fontWeight:'700',padding:3,paddingHorizontal:10 }}>MRP : Rs. {item?.rate}</Text>
      </View>

{/* 
      <Text style={{ fontSize:15, color:'black', fontWeight:'bold', paddingBottom:7  }}>MRP :-
        <Text style={{ fontSize:18, color:'black', fontWeight:'400' }}> {item?.rate}</Text>
      </Text> */}

      <Text style={{ fontSize:15, color:'black', fontWeight:'bold', paddingBottom:7  }}>Description :-
        <Text style={{ fontSize:12, color:'black', fontWeight:'400' }}> {item?.description}</Text>
      </Text>

      </View>

      
      
    </ScrollView>
  )
}

export default ProductDetailsScreen