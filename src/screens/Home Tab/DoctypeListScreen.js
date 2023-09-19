import { View, Text, FlatList } from 'react-native'
import React from 'react'

const DoctypeListScreen = ({ListData}) => {
  return (
    <View>
      <Text>DoctypeListScreen</Text>

      <FlatList
          data={ListData}
          numColumns={1}
          renderItem={(item) => {
            return (
              <Pressable onPress={() => { 
                navigation.navigate('DoctypeForm',item=item)
                 }}>
                <Card item={item} />
              </Pressable>
            )
          }}
        />


    </View>
  )
}

export default DoctypeListScreen