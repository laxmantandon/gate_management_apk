import { View, Text } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../contants'


const Qrscreen = (item,inputrefresh) => {
    const [Open, setOpen] = useState(false)


    return (
        <View style={{marginLeft:-30}}>
            {Open ? (
                <QRCodeScanner
                containerStyle={{height:'100%'}}
                    onRead={(e) => {
                        item.item.value=e.data
                        // console.log(item)
                        if(inputrefresh){
                            item.inputrefresh()
                        }
                        setTimeout(() => {
                            setOpen(false)
                        }, 100);
                    }}
                    reactivate={false}
                    showMarker={true}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    cameraContainerStyle={{}}
                    buttonPositive='false'
                />
            ) : (
                <Icon
                    onPress={() => setOpen(true)}
                    name={item?.item.type == 'qrcode' ? "qr-code-outline" : "qr-code-outline"}
                    size={25}
                    color={Colors.DEFAULT_BLUE}
                    style={{ paddingVertical: 8, paddingRight: 8 }}
                />
            )}

        </View>
    )
}

export default Qrscreen