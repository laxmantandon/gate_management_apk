import { View, Text } from 'react-native'
import React, { useState } from 'react'
import frappe from '../../services/frappe'

import SearchableDropDown from 'react-native-searchable-dropdown'
import { Colors } from '../../contants'

const SearchBoxScreen = ({item, inputrefresh}) => {
    const [loading, setloading] = useState(false)

    const refreshGetData=()=>{
    
        setloading(true)
        setTimeout(() => {
          setloading(false)
        }, 1000);
    
      }

    const getfiltersdata=(text)=>{
        let req={}
       
          req = {
            txt: text,
            doctype: item.link_doctype,
            ignore_user_permissions: 0,
            reference_doctype: item.parent,
          }
          console.log(req)

          frappe.search_links(req).then((result)=>{
            // console.log(result)
            mapped=[]
            result.results.forEach(a => {
              mapped.push({'name':a.value,'id':a.value})
            });
            item.options=mapped
            console.log(item.options)
            
          })
          refreshGetData()
        // onRefresh  
      }
    
  return (
    <View style={{flex:1, paddingHorizontal:5, paddingTop:5}}>
      <SearchableDropDown zIndex={999}
                                  onItemSelect={(kitem) => {
                                    // alert('select dealer')
                                    // console.log('clicked',kitem)
                                    item.value = kitem.id
                                    item.data = kitem
                                    console.log('clicked', item.data)
                                    setloading(true)
                                    refreshGetData()
                                    if(inputrefresh){
                                    inputrefresh()
                                    }
                                  }}

                                  containerStyle={{ padding: 3, width: '100%' }}
                                  onRemoveItem={(item, index) => {
                                    // const items = selectedCrops.filter((sitem) => sitem.name !== item.name);
                                    // setselectedDelers(items)
                                  }}
                                  itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: 'white',
                                    borderColor: 'silver',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                  }}
                                  itemTextStyle={{ color: '#222' }}
                                  itemsContainerStyle={{ maxHeight: 200 }}
                                  items={item.options?item.options:[]}
                                  // defaultIndex={2}
                                  resetValue={false}
                                  textInputProps={
                                    {
                                      placeholder: item.label,
                                      underlineColorAndroid: "transparent",
                                      style: {
                                        padding: 8,
                                        borderWidth: .5,
                                        borderColor: 'black',
                                        borderRadius: 4,
                                        color: "black",
                                        backgroundColor:'white',                                        
                                      },
                                      placeholder:`Search ${item.link_doctype}`,
                                      onTextChange: text => {
                                        getfiltersdata(text)
                                        setloading(true)
                                        refreshGetData()

                                      }
                                    }
                                  }
                                  listProps={
                                    {
                                      nestedScrollEnabled: true,
                                    }
                                  }
                                />
    </View>
  )
}

export default SearchBoxScreen