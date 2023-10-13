import { StyleSheet, StatusBar, Text, View, Image } from 'react-native';
import React, { Component } from 'react'
import { Colors, Fonts } from '../contants';
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { Linking } from 'react-native';



const Card = ({ item }) => {
  // // console.log(item.item)
  const data = item.item
  // // console.log('type',parseInt(data.subtitle))
  const [sub_title, setsub_title] = useState(0)

  useEffect(() => {

    if (parseInt(data.subtitle)) {
      setsub_title(parseInt(data.subtitle))
    }

  }, [])

  return (
    <View style={{ flex: 1, marginTop: item.index == 0 ? 7 : 1 }}>

      <View style={styles.ListContainer}>

        {data?.large_image ? (<Image style={{
          backgroundColor: 'silver', height: 170, width: '100%',
          borderTopLeftRadius: 8, borderTopRightRadius: 8
        }} source={{ uri: data?.large_image }} />) : ('')}


        {/* {data?.icon ? (<View style={{ backgroundColor: Colors.SECONDARY_BLACK, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
              <Icon name={'ios-checkmark-circle'}
                size={25} style={{ padding: 15, color:  'green'  }} />
            </View>) : ('')} */}

        <View style={{ flex: 1, flexDirection: 'row' }}>
          {data?.icon ? (<View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8,alignSelf:'center' }} >
            <Icon name={data.icon}
              size={22} style={{ padding: 10, paddingRight: 1, color: data.icon_color ? data.icon_color : 'black' }} />
          </View>) : ('')}

          {data?.checkbox ?
            <View style={{ backgroundColor: Colors.SECONDARY_BLACK, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
              <Icon name={item.item.value === true ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                size={22} style={{ padding: 15, color: item.item.value === true ? 'green' : 'gray' }} />
            </View> : ''}


          {data?.date ?
            <View style={{ backgroundColor: Colors.DEFAULT_BLUE, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
              <View style={{ padding: 10 }}>
                <Text style={{ color: Colors.SECONDARY_WHITE, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>{moment(data.date).format('Do')}</Text>
                <Text style={{ color: Colors.SECONDARY_WHITE, fontWeight: '600', fontSize: 12, textAlign: 'center' }}>{moment(data.date).format('MMM-YY')}</Text>
              </View>
            </View> : ''}

          {data?.time ?
            <View style={{ backgroundColor: Colors.SECONDARY_BLACK, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
              <View style={{ padding: 10 }}>
                <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{moment().format('h:mm')}</Text>
                <Text style={{ color: 'green', fontWeight: '600', fontSize: 12, textAlign: 'center' }}>{moment().format('a')}</Text>
              </View>
            </View> : ''}

          {data?.image ? (<Image style={{
            margin: "auto", backgroundColor: 'white', height: 65, width: 65,borderTopLeftRadius: 8, borderBottomLeftRadius: 8 ,
            alignSelf:'center'
          }} source={{ uri: data?.image }} />) : ('')}
          {data?.avatar ? (<View style={{ margin: "auto", marginLeft: 4, alignSelf: 'center', backgroundColor: 'silver', height: 55, width: 55, borderRadius: 50 }} >
            {/* <Image style={{ margin: "auto", backgroundColor: 'silver', height: 60, width: 60, borderRadius: 50 }} 
      source={{ uri: data?.avatar }} /> */}
            <Text style={{ fontSize: 30, paddingVertical: 6, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>{data.title[0]}{data.title[1]}</Text>
          </View>
          ) : ('')}

          <View style={[styles.detailContainer,{width:data?.status?'60%':'auto'}]}>
            <View style={styles.titleContainer}>
              <Text style={styles.listListTitle} numberOfLines={1}>
                {data?.title}
              </Text>
              
              {data?.subtitle ? (<Text style={{
                color: 'gray', fontSize: 13, fontWeight: '600', 
                // fontFamily: Fonts.POPPINS_MEDIUM,
              }} numberOfLines={2}>{data?.second_subtitle  ? `${data.second_subtitle}` : data.subtitle}</Text>) : ('')}
            </View>
          </View>
          {data?.status ?
            <View style={{ backgroundColor:"#dde9fd", borderTopRightRadius: 8, borderBottomRightRadius: 8, marginLeft: 'auto' }} >
              <View style={{ padding: 10 }}>
                <Text style={{ color: Colors.DEFAULT_BLUE, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>{data.percent}</Text>
                <Text style={{ color: Colors.DEFAULT_BLUE, fontWeight: '600', fontSize: 12, textAlign: 'center' }}>{data.status}</Text>
              </View>
            </View> : ''}



          {data?.whatsapp ? <View style={{
            backgroundColor: "#dde9fd", borderTopRightRadius: 8, borderBottomRightRadius: 8, marginLeft: 'auto',
            padding: 10, flexDirection: 'row'
          }}>
             <Icon onPress={() => {
              Linking.openURL(`tel:${data.call}`)
            }}
              name={'call'} size={22} color={Colors.DEFAULT_BLUE} style={{ padding: 8 }} />
              
            <Icon onPress={() => {
              Linking.openURL(`whatsapp://send?phone=91${data.whatsapp}`)
            }}
              name={'logo-whatsapp'} size={22} color='green' style={{ paddingTop: 8, color: 'green' }} />

           
          </View>
            : ''}

          {/* {data?.call ?    
          <View style={{ backgroundColor:'#f0f8fe',borderTopRightRadius:8, borderBottomRightRadius:8,  marginLeft:'auto'}} >
          <View style={{padding:10}}>
          
         
           </View>
         </View>:''} */}

        </View>
        {data?.footer_details ? (<View style={{ backgroundColor: 'white',  width: '100%', borderTopColor:Colors.SECONDARY_GREEN, borderTopWidth:2, 
        borderBottomLeftRadius: 8, borderBottomRightRadius: 8 , paddingVertical:10, paddingHorizontal:8}}>
      
          </View>
          ) : ('')}



      </View>
      <View style={{height:5,}} />
    </View>

  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: 'white'
  },

  ListContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    // borderBottomColor: Colors.LIGHT_GREY2,
    // borderBottomWidth:1,
    // paddingHorizontal: 1,
    // paddingVertical:1,
    borderRadius: 8,
    // flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 1,
    elevation: 2

  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: '60%',
  },

  listListTitle: {
    color: 'black',
    // fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    // width: '100%',
  },
  titleContainer: {
    // flexDirection: 'column',
    // width: '10%',
  }
});


export default Card