import { View, Text, Image } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

const ProductDetailsScreen = ({item}) => {
    console.log('qqqqqqqqqqqq',item)
  return (
    <View>
        <Image />
      <Text>{item?.description}</Text>
      <Text>{item?.item_name}</Text>
      <Text>{item?.rate}</Text>
      <Text>ProductDetailsScreen</Text>
      <Text>ProductDetailsScreen</Text>
      
    </View>
  )
}

export default ProductDetailsScreen