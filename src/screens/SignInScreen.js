import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
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



const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '9685062116',
        password: 'Aakamesh@123',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        if ( data.username?.length == 0 || data.password?.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        let req = {
            "usr": data.username,
            "pwd": data.password
          }
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://dbh.erevive.cloud/api/method/login',
            headers: { 
              'Content-Type': 'application/json', 
            },
            data : req
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if ( response.message="Logged In" ){


                var myHeaders = new Headers();                
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  redirect: 'follow'
                };
                
                fetch("https://dbh.erevive.cloud/api/method/frappe.auth.get_logged_user", requestOptions)
                .then(r =>r.text()).then(result =>{ console.log(result)
               
                            let res=JSON.parse(result)
                          if (res.message){
                            let foundUser =[{
                                id: 2, 
                                email: res.message,
                                username: response.data.full_name, 
                                password: 'pass1234', 
                                userToken: res.message
                            }]
                            console.log(foundUser)
                            signIn(foundUser);
                          }
                                

                            }).catch(error => console.log('error', error));

                    
            }else{
                Alert.alert('Invalid User!', 'Username or password is incorrect.', 
                [
                    {text: 'Okay'}
                ]);
                return;
            }
          })
          .catch((error) => {
            console.log(error);
          });




        
    }

    return (
      <View style={[mstyle.container,{padding:20, paddingBottom:200}]}>
          <StatusBar backgroundColor='white' barStyle="dark-content"/>
          {/* <View style={styles.header}> */}
            <Text style={[styles.text_header,{fontSize:80,paddingTop:70, textAlign:'center',color:Colors.GOOGLE_BLUE}]}>LOGO</Text>
        {/* </View> */}

        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>

        <View style={{ justifyContent:'center'}}>
            
        <Text style={[styles.text_footer, {
                color:Colors.DEFAULT_BLUE
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    maxLength={9}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    value='9685062116'
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color:Colors.DEFAULT_BLUE,
                marginTop: 10
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    value='Aakamesh@123'
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: Colors.DEFAULT_RED, marginTop:5}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
                <LinearGradient
                    colors={[Colors.GOOGLE_BLUE, Colors.DEFAULT_BLUE]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => {loginHandle( data.username, data.password )} }
                    style={[styles.signIn, {
                        borderColor: 'navy',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'navy'
                    }]}>Login</Text>
                </TouchableOpacity> */}
            </View>
        </View>
       
      </View>
    );
};

export default SignInScreen;

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
        paddingTop:80
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
        fontWeight:'600',
        paddingLeft:7
    },
    action: {
        flexDirection: 'row',
        marginTop: 2,
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREY2,
        paddingBottom: 0,
        padding:10,
        borderRadius:15,
        backgroundColor:'white',
        elevation:2,
        
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
        fontSize:15,fontWeight:'500'
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
