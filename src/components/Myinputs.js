import { View, Text, TextInput, Button, Pressable, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../contants'
import CameraPermission from '../services/permissionservices'
import { launchCamera } from 'react-native-image-picker'
// import ImageView from "react-native-image-viewing";
import SelectDropdown from 'react-native-select-dropdown'
// import Feather from 'react-native-vector-icons/Feather';

import Icon from 'react-native-vector-icons/Ionicons'
import Card from './Card'
import moment from 'moment'
import mystyles from '../css/mystyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'




const MYinputs = ({ item }) => {
  // // console.log('FROM MY INPUT',  item)

  const [visible, setIsVisible] = useState(false);
  const [captureimage, setcaptureimage] = useState([])
  const [open, setOpen] = useState(false)


  useEffect(() => {
    if(item?.link_doctype){
      getLinkedDoctype('a')
    }

  }, [])
  

  const startCamera = () => {

    CameraPermission()
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.3
    };

    launchCamera(options, (response) => {
      // // console.log(response.assets);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        // // console.log('response', JSON.stringify(response.assets[0].base64));
        const basse64image = 'data:image/jpeg;base64,' + JSON.stringify(response?.assets[0].base64)
        setcaptureimage([])
        // item?.value=basse64image
        // captureimage=basse64image

        // captureimage=basse64image

        item.value.push(basse64image)
        // // console.log(''item.value)

        setcaptureimage(item.value)


        // console.table(JSON.stringify(response))

        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
      }
    });

  }
  const [loading, setloading] = useState(false)


  const [givedans, setgivedans] = useState('')
  const [realans, setrealans] = useState(item.ans)
const [multi_value, setmulti_value] = useState([])
  const getData = (i) => {
    
    if (item?.type === 'multi_checkbox'){
      let v= i
      
      // console.log(v)
      // item.value =[]
      if (item?.value){
        item.value.push(v)
        setmulti_value(item.value)
        // console.log(item.value)
      }else{
        item.value=[]
        item.value.push(v)
      }
      setgivedans(i)
    }else{
    setgivedans(i)
    item.gived_ans = i
    item.value = i
    // console.log(item.gived_ans)
    }
  }


  const removeData=(i)=>{
    for (let [index, p] of multi_value.entries()) {
    if (i==p){
      // console.log(p, i)
      setgivedans(i)
      item.gived_ans = i
      multi_value.splice(index, 1)
      // console.log(multi_value)

    }
    }
  }
const [LinkedDoctypeData, setLinkedDoctypeData] = useState([])
  const getLinkedDoctype = (text) => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://dbh.erevive.cloud/api/resource/${item?.link_doctype}?fields=["name"]`, requestOptions)
      .then(response => response.text())
      .then(result => {
        // console.log(result)
        // item.options=[]
        let mdata = JSON.parse(result)
        mapped_data=[]
        mdata.data.forEach(a => {
          // console.log(a.name)
          if (item?.options.includes(a.name)) {
          } else {
            if (a.name){
              mapped_data.push(a)
              setLinkedDoctypeData(mapped_data)
              item?.options.push(a.name)
            }
          }


        });

        // let m = JSON.parse(result)
        // // console.log(m.data)
        // mapped_array = []
        // setresponseData(m?.data)
        // m.data.forEach(a => {
        //   // console.log(a)
        //   mapped_array.push({data:a, title: a.name, subtitle: `${a.first_name} ${a?.last_name ? a?.last_name : ''}`, date: a.creation, whatsapp: a.whatsapp_no, call: a.mobile_no })
        // });
        // setListData(mapped_array)



      })
      .catch(error => console.log('error', error));
  }
  // const [read_only, setread_only] = useState(item?.read_only?'none':'auto')
  const [read_only, setread_only] = useState(item?.read_only?'auto':'auto')

  return (
    <View pointerEvents={read_only} style={{overflow:'grey'}}>
      <View style={[mystyles.inputContainer1, {
        backgroundColor: 'white', marginTop: 8

      }]}>
        {item?.type === 'multi_checkbox' ? (
          <View>
            <Text style={[mstyle.content, { fontWeight: '700',paddingLeft:7 }]}>{item.label}</Text>
            <FlatList
              data={item.options}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Pressable onPressIn={() => {
                    if(multi_value.includes(item)){
                     removeData(item)
                    }else{
                       getData(item)
                    }
                     

                   }} style={{ flex: 1, paddingVertical: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}
                      
                    >

                      <View style={{ backgroundColor: Colors.LIGHT_GREEN, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
                       
                            
                              <Icon name={multi_value.includes(item) ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                                size={20} style={{ padding: 8, color: givedans === realans ? (multi_value.includes(item) ? 'green' : 'red') : 'green' }} />
                              

                         
                      </View>
                      <View style={mstyle.detailContainer}>
                        <View style={[mstyle.titleContainer, { width: '90%' }]}>
                          <Text style={[mstyle.listListTitle, { fontWeight: '600' }]} numberOfLines={4}>
                            {item} 
                          </Text>

                        </View>
                      </View>
                      </View>
                    </Pressable>


                 
                )

              }}

            />

          </View>
        ) : (
          <View>
            {item?.type === 'checkbox' ? (
              <View>
                <Text style={[mstyle.content, { fontWeight: 'bold',paddingLeft:7 }]}>{item.label}</Text>
                <FlatList
                  data={item.options}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ flex: 1, paddingVertical: 5 }}>
                        <Pressable style={{ flex: 1, flexDirection: 'row' }}
                          onPress={() => {
                            if (givedans) {

                            } else {
                              getData(item)

                            }

                          }}
                        >

                          <View style={{ backgroundColor: Colors.LIGHT_GREEN, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} >
                            {givedans ? (
                              <View>
                                {
                                  givedans != item ? (<Icon name={realans === item ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                                    size={20} style={{ padding: 8, color: givedans === realans ? (givedans === realans ? 'green' : 'red') : 'green' }} />
                                  ) : (
                                    <Icon name={givedans === item ? 'ios-checkmark-circle' : 'ios-ellipse-outline'}
                                      size={20} style={{ padding: 8, color: givedans === item ? (givedans === realans ? 'green' : 'red') : 'gray' }} />

                                  )
                                }

                              </View>
                            ) : (
                              <Icon name={'ios-ellipse-outline'}
                                size={20} style={{ padding: 8, color: 'gray' }} />
                            )}
                          </View>
                          <View style={mstyle.detailContainer}>
                            <View style={[mstyle.titleContainer, { width: '90%' }]}>
                              <Text style={[mstyle.listListTitle, { fontWeight: '600' }]} numberOfLines={4}>
                                {item} {index}
                              </Text>

                            </View>
                          </View>

                        </Pressable>


                      </View>
                    )

                  }}

                />

              </View>
            ) : (
              <View>
                <Text style={[mstyle.content,{paddingLeft:7}]}>{item.label}</Text>
                {item?.type == 'image' ? (
                  <View style={{ paddingHorizontal: 10, paddingVertical: 5 }} >
                    <View>
                      <FlatList
                        data={captureimage}
                        // style={{flex:1, flexDirection:'row'}}
                        numColumns={4}

                        renderItem={({ img, index }) => {
                          return (
                            <Pressable style={{ margin: 2 }}
                              onPress={() => { setIsVisible(true) }}
                            >
                              <Image style={{ width: 80, height: 100, backgroundColor: 'silver' }} source={{ uri: item.value[index] }} />

                            </Pressable>
                          )
                        }}

                      />
                      {/* <ImageView
                        images={item.value}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                      /> */}
                    </View>



                    <View style={{width:10}}/>

                    <Pressable onPress={() => startCamera()} style={{ width: 50, height: 50, marginTop: 10 }} >
                      <Icon name='camera' size={30} style={{ backgroundColor: Colors.LIGHT_GREEN, color: 'green', borderRadius: 50, padding: 10 }} />
                      {/* <Image style={{ width: 50, height: 50 }}
              source={{ uri: 'https://www.nicepng.com/png/detail/127-1276180_photo-album-icon-png-icon-logo-png-album.png' }}
            /> */}
                    </Pressable>
                  </View>
                ) : (
                  <View>
                    <View style={mstyle.inputContainer}>
                      <View style={mstyle.inputSubContainer}>

                        {item?.type === 'select' ? (
                          <View style={{ flex: 1, flexDirection: 'row' }}>

                            <SelectDropdown
                              data={item?.options}
                              onChangeSearchInputText={(text)=>{
                                // console.log(text)
                                      if(item?.link_doctype){
                                        getLinkedDoctype(text)
                                      }
                              }}
                              defaultValue={item.value}
                              defaultButtonText={item?.label}
                              buttonStyle={{
                                backgroundColor: 'white',
                                width: '100%', height: 50
                              }}
                              buttonTextStyle={{ fontSize: 14, }}
                            
                              renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                              }}

                              dropdownIconPosition={'right'}
                              dropdownStyle={[mstyle.inputContainer]}
                              selectedRowStyle={{ backgroundColor: Colors.LIGHT_BLUE,borderColor:Colors.LIGHT_BLUE }}
                              rowTextStyle={{ fontSize: 14,fontWeight:'600' }}
                              rowStyle={{backgroundColor:Colors.SECONDARY_WHITE,borderColor:'silver'}}

                              onSelect={(selectedItem, index) => {
                                // console.log(selectedItem, index)
                                item.value = selectedItem
                                item.index = index

                                LinkedDoctypeData.forEach(a => {
                                  if(a.name==selectedItem){
                                    item.fetch=  a
                                  }
                                  
                                });

                              }}
                              buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                              }}
                              rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                              }}


                            search
                            searchInputStyle={{
                              backgroundColor: 'white',
                              borderBottomWidth: 1,
                              borderBottomColor: '#FFF',
                            }}
                            searchPlaceHolder={'Search here'}
                            searchPlaceHolderColor={'darkgrey'}
                            renderSearchInputLeftIcon={() => {
                              return <FontAwesome name={'search'} color={'#444'} size={18} />;
                            }}
                            />

                            {/* <Feather
                    name="phone"
                    size={18}
                    color={Colors.DEFAULT_GREY}
                  /> */}
                          </View>
                        ) : (

                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            {item?.type === 'date' || item?.type === 'time' ? (
                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                {/* <Button title="Open" onPress={() => setOpen(true)} style={mstyle.PrimaryButton} /> */}
                                <DatePicker
                                  mode={item?.type == 'date' ? 'date' : 'time'}
                                  modal
                                  open={open}
                                  date={item?.value? moment(item?.value).toDate() :moment().toDate()}
                                  onConfirm={text => {
                                    item.value =  moment(new Date(text)).format('YY-MM-DD')
                                    console.log(item.value)
                                    setOpen(false)
                                  }}
                                  onCancel={() => {
                                    setOpen(false)
                                  }}
                                />

                                <Icon
                                  onPress={() => setOpen(true)}
                                  name={item?.type == 'date' ? "calendar-outline" : "alarm-outline"}
                                  size={32}
                                  color={Colors.DEFAULT_BLUE}
                                  style={{ paddingVertical: 8, paddingRight: 8 }}
                                />

                                {item?.type == 'time' ? (
                                  <Text onPress={() => setOpen(true)}
                                    style={mstyle.inputText}>{moment(item.value).format('hh:mm a')}</Text>
                                ) : (
                                  <Text onPress={() => setOpen(true)}
                                    style={mstyle.inputText}>{moment(item.value).format('Do MMM-YYYY')}</Text>
                                )}

                              </View>
                            ) : (
                              // <View>
                              item?.len ? (<TextInput
                                placeholder={`${item.placeholder}                                                         `}
                                keyboardType={item?.keyboard ? item?.keyboard : ''}
                                placeholderTextColor={'gray'}
                                selectionColor={Colors.DEFAULT_GREY}
                                style={mstyle.inputText}
                                maxLength={item?.len}
                                multiline={item?.type == 'textarea' ? true : false} numberOfLines={item?.type === 'textarea' ? 6 : 1}
                                onChangeText={text => {
                                  item.value = text
                                  // // console.log(item)
                                }}
                                // value={item?.value}
                                defaultValue={item?.value}
                              />) : (
                                <TextInput
                                  placeholder={`${item.placeholder}                                                         `}
                                  keyboardType={item?.keyboard ? item?.keyboard : ''}
                                  placeholderTextColor={'gray'}
                                  selectionColor={Colors.DEFAULT_GREY}
                                  style={mstyle.inputText}
                                  multiline={item?.type == 'textarea' ? true : false} numberOfLines={item?.type === 'textarea' ? 6 : 1}
                                  onChangeText={text => {
                                    item.value = text
                                    // // console.log(item)
                                  }}
                                  // value={item?.value}
                                  defaultValue={item?.value}
                                  activeUnderlineColor={Colors.DEFAULT_BLUE}
                                  focusable={true}
                                />
                              )


                              // </View>
                            )}

                          </View>

                        )}

                      </View>
                    </View>
                  </View>
                )}


                {/* <Separator height={12} /> */}
              </View>
            )}


          </View>

        )}


      </View>
    </View>

  )
}

export default MYinputs