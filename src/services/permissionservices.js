import { PermissionsAndroid } from 'react-native'

const CameraPermission = () => {
    try{
        const grantedcamera =  PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.CAMERA,
         
         {
           title: "App Camera Permission",
           message:"App needs access to your camera ",
           buttonNeutral: "Ask Me Later",
           buttonNegative: "Cancel",
           buttonPositive: "OK"
         }
         );
         if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
           // console.log("Camera permission given");
         } else {
           // console.log("Camera permission Already have");
         }
       } catch (err) {
       console.warn(err);
        }    
}

export default CameraPermission