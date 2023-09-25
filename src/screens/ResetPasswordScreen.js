import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import axios from 'axios';
import mstyle from '../components/mstyle';
import { Colors } from '../contants';
import Frappe_Model from './Frappe_Model';
import { SuccessToast } from 'react-native-toast-message';
import frappe from '../services/frappe';



const ResetPasswordScreen = ({ navigation }) => {
    const [loading, setloading] = React.useState(false)
    const [email, setemail] = React.useState('')
    const { colors } = useTheme();

const resetpass=()=>{
    if(!email){
        Alert.alert('Alert!','Enter Valid Email')
    }else{
        frappe.reset_password(email).then((res)=>{
            console.log(res)
        })
    }
}





    return (
        <View style={[mstyle.container, { padding: 20, paddingBottom: 200 }]}>

            <Frappe_Model loading={loading} text={''} />

            <StatusBar backgroundColor='white' barStyle="dark-content" />
            {/* <View style={styles.header}> */}
            <Text style={[styles.text_header, { fontSize: 80, paddingTop: 70, textAlign: 'center', color: Colors.GOOGLE_BLUE }]}>LOGO</Text>
            {/* </View> */}

            <View style={styles.header}>
                <Text style={[styles.text_header,{color:'red'}]}>Reset Password!</Text>
            </View>

            <View style={{ justifyContent: 'center' }}>

                <Text style={[styles.text_footer, {
                    color: Colors.DEFAULT_BLUE
                }]}>Username or e-mail</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your username or e-mail"
                        placeholderTextColor="#666666"
                        keyboardType="default"
                        maxLength={100}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        // onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => setemail(e.nativeEvent.text)}
                    />
                    {/* {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null} */}
                </View>


                <TouchableOpacity onPress={() => { navigation.navigate('ResetPasswordScreen') }}>
                    <Text style={{ color: Colors.DEFAULT_BLUE, margin: 5,fontWeight:'700' }}>Go to login</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {resetpass() }}
                    >
                        <LinearGradient
                            colors={[Colors.GOOGLE_BLUE, Colors.DEFAULT_BLUE]}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                   
                </View>
            </View>

        </View>
    );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'navy'
    },
    header: {
        // flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingBottom: 20,
        paddingTop: 80
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: Colors.GOOGLE_BLUE,
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 7
    },
    action: {
        flexDirection: 'row',
        marginTop: 2,
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREY2,
        paddingBottom: 0,
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 2,

    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 15, fontWeight: '500'
        // backgroundColor:'white'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
