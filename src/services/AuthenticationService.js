import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {ApiContants} from '../contants';
// import userdata from './userdata';

const base_url ='https://crop.erpgeolife.com/api/method/geolife_agritech.v1.geolife_api'
const base_url2 ='https://crop.erpgeolife.com/api/resource'
// const base_url ='https://8fab-49-43-42-59.in.ngrok.io/api/method/geolife_agritech.v1.geolife_api'

// const [user, setuser] = useState([])


  // const userdata =async req=>{
    let user =[]
 
    const gettoken =()=>{
      let token ='';

      AsyncStorage.getItem('user_info').then((muser) =>{
        // // console.log('muser', muser) 
         user= JSON.parse(muser)
        //  // console.log('muser', `token ${user.api_key}:${user.api_secret}`) 

          // token = `token ${user.api_key}:${user.api_secret}`
        
         })
         if(user?.api_key){
          return {
            'Content-Type': 'application/json',
            'Authorization': `token ${user.api_key}:${user.api_secret}`
          }
         }
        

    }
   



const headers = gettoken()

const AuthRequest = axios.create({
  baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async user => {
  if (!user?.username || !user?.phone || !user?.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      username: user?.username,
      phone: user?.phone,
      password: user?.password,
    };
    let registerResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.REGISTER,
      requestBody,
    );
    return registerResponse?.data.message
  } catch (error) {
    // console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const login = async user => {
  if (!user?.username || !user?.otpCode) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      mobile_no: user?.username,
      otp: user?.otpCode,
    };
    // // console.log()
    let loginResponse = await AuthRequest.get(
      `${base_url}.validate_otp?mobile_no=${user?.username}&otp=${user?.otpCode}`,
    );
    return loginResponse?.data.message;
  } catch (error) {
    // console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const sendOTP = async user => {
  if (!user?.username) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let loginResponse = await AuthRequest.get(
      `${base_url}.generate_otp?mobile_no=${user?.username}&hashcode=${user?.hashcode}`
      
    );
    return loginResponse?.data.message;
  } catch (error) {
    console.log(error.response);
    return {status: false, message: error, url:`${base_url}.generate_otp?mobile_no=${user?.username}`
};
  }
};

// const farmerData =async req=>{
//   var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer GEOLIFE.S1zRI1gprVmgYct9iqF9MfAvkeCS1YRYk9Ztgfzelop6eJgwaA1tJrJu");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// return fetch("https://api3.thefarmpeople.in/api/v1/users/external", requestOptions)
//   // .then(response => response.text())
//   // .then(result =>{result})
//   // .catch(error => // console.log('error', error));
// }

// const searchfarmerData =async req=>{
//   var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer GEOLIFE.S1zRI1gprVmgYct9iqF9MfAvkeCS1YRYk9Ztgfzelop6eJgwaA1tJrJu");
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "text": req
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// return fetch("https://api3.thefarmpeople.in/api/v1/users/external/search?page=1&limit=10", requestOptions)
//   // .then(response => response.text())
//   // .then(result => {
//   //   // console.log('farmer search', result)
    
//   //   return result})
//   // .catch(error => // console.log('error', error));
// }

const searchfarmerData = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.post(
      `${base_url}.search_farmer`, req, {headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};


const search_pravakta_farmer = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.post(
      `${base_url}.search_pravakta_farmer`, req, {headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};

const searchfarmerOrdersData = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.post(
      `${base_url}.search_farmer_orders`, req, {headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};

const searchdealerfarmerOrdersData = async req => {
  try {
    gettoken()
    let Response = await AuthRequest.post(
      `${base_url}.dealer_search_farmer_orders`, req, {headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const searchdealerPaymentData = async req => {
  try {
    gettoken()
    let Response = await AuthRequest.post(
      `${base_url}.dealer_payments_data`, req, {headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const searchCropData = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.post(
      `${base_url}.search_crops`, req, {headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};


const searchdealerData = async req => {
  try {
    gettoken()
    let Response = await AuthRequest.post(
      `${base_url}.search_dealer`, req, {headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};
  }
};


const searchgeomitraData = async req => {
  try {
    gettoken()
    let Response = await AuthRequest.get(
      `${base_url}.search_geomitra`, {headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};
  }
};




const searchProductData = async req => {
  try {
    gettoken()
    let Response = await AuthRequest.post(
      `${base_url}.search_product`, req, {headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};
  }
};

const searchProductKitData = async req => {
  try {
    console.log(gettoken())
    let Response = await AuthRequest.post(
      `${base_url}.search_product_kit`, req, {headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};
  }
};


const checkUserExist = async (type, value) => {
  try {
    let params = {[type]: value};
    let userCheckResponse = await AuthRequest.get(
      ApiContants.BACKEND_API.USER_EXIST, 
      {params},{headers:gettoken()}
    );
    
    return userCheckResponse?.data.message
  } catch (error) {
    // console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const crop_seminar = async req => {
  gettoken()
  // console.log('from auth service', gettoken())
  try {
    
    let Response = await AuthRequest.get(
      `${base_url}.crop_seminar`,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};

const create_crop_seminar = async req => {
  gettoken()
  // console.log('Auth', gettoken())
  try {
    let Response = await AuthRequest.post(
      `${base_url}.crop_seminar`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const update_crop_seminar = async req => {
  try {
    let Response = await AuthRequest.put(
      `${base_url}.crop_seminar`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const crop_alert = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.raise_crop_alert`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const farmer_meeting = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.farmer_meeting`,
      req,{headers:gettoken()}
    );
    // console.log(Response)
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const activity_list = async req => {
  try {
    let Response = await AuthRequest.get(
      `${base_url}.activity_list`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};


const dayplan_list = async req => {
  try {
    let Response = await AuthRequest.get(
      `${base_url}.dayplan_list`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};

const activity_for = async req => {
  try {
    
    let Response = await AuthRequest.get(
      `${base_url}.activity_for`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};

const create_activity = async req => {
  gettoken()
  // console.log('gettoken()', gettoken())
  try {
    // console.log(req)
    let Response = await AuthRequest.post(
      `${base_url}.activity_list`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const submit_quiz = async req => {
  gettoken()
  // console.log('gettoken()', gettoken())
  try {
    // console.log(req)
    let Response = await AuthRequest.post(
      `${base_url}.submit_quiz`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const expenses_list = async req => {
  try {
    
    let Response = await AuthRequest.get(
      `${base_url}.expenses`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};

const create_expenses = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.expenses`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response?.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const door_to_door_awareness = async req => {
  gettoken()
  // console.log('gettoken()', gettoken())
  try {
    let Response = await AuthRequest.post(
      `${base_url}.door_to_door_awareness`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const sticker_pasting = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.sticker_pasting`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const activity_type = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.get(
      `${base_url}.activity_type`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};

const expense_type = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.get(
      `${base_url}.expense_type`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};


const get_free_sample = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.get(
      `${base_url}.free_sample_distribution`,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};

const checkoutProduct = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.create_sales_order`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const checkoutProductKit = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.create_Advance_booking_order`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const checkoutPaymentUpdate = async req => {
  try {
    let Response = await AuthRequest.put(
      `${base_url}.create_Advance_booking_order`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const update_stock = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.update_dealer_stock`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const Add_payment_entry = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.add_dealer_payment`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const Add_payment_cash_entry = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.add_dealer_Cash_payment`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const create_farmer = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.create_farmer`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const create_free_sample = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.free_sample_distribution`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const update_status_free_sample = async req => {
  try {
    let Response = await AuthRequest.put(
      `${base_url}.free_sample_distribution`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const whatsapp_templates = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.get(
      `${base_url}.whatsapp_to_farmer`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};

const get_seminar_masters = async req => {
  try {
    gettoken()
    // console.log('FROM AUTH SERVICE', gettoken())
    
    let Response = await AuthRequest.get(
      `${base_url}.get_seminar_masters`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};


const get_users_task = async req => {
  try {
    gettoken()
    console.log('FROM AUTH SERVICE', gettoken())
    
    let Response = await AuthRequest.get(
      `${base_url}.get_user_task`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    // console.log(error.response.data);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ',headers:gettoken() };

  }
};



const farmerCropData = async req => {
  try {         
        let Response = await AuthRequest.get(
          `https://api3.thefarmpeople.in/api/v1/cropSchedule/erp/${req.mobile_no}`
          ,{headers: { 
            'Authorization': 'Bearer GEOLIFE.S1zRI1gprVmgYct9iqF9MfAvkeCS1YRYk9Ztgfzelop6eJgwaA1tJrJu'
          }
          }
          
        );
        return Response?.data
  } catch (error) {
    // console.log('API ERROR ', error.response.data);
    return { status: false, message: 'Oops! Something went wrong ' };
  }
};



const get_stock = async req => {
  try {         
        let Response = await AuthRequest.post(
          `${base_url}.get_stock`,req,{headers:gettoken()}
          
        );
        return Response?.data.message
  } catch (error) {
    // console.log('API ERROR ', error.response.data);
    return { status: false, message: 'Oops! Something went wrong ' };
  }
};

const uploadImage = async req => {
  try {         
        let Response = await AuthRequest.post(
          `${base_url}.Upload_image_in_dealer`,req,{headers:gettoken()}
          
        );
        return Response?.data.message
  } catch (error) {
    console.log('API ERROR ', error.response.data ,gettoken());
    return { status: false, message: 'Oops! Something went wrong ' };
  }
};

const CompleteOrder = async req => {
  try {         
        let Response = await AuthRequest.post(
          `${base_url}.submit_advance_booking`,req,{headers:gettoken()}
        );
        return Response?.data.message
  } catch (error) {
    console.log('API ERROR ', error.response.data ,gettoken());
    return { status: false, message: 'Oops! Something went wrong ' };
  }
};

const Checkuser = async req => {
  try {         
        let Response = await AuthRequest.post(
          `${base_url}.checkuser`,req,{headers:gettoken()}
        );
        return Response?.data.message
  } catch (error) {
    console.log('API ERROR ', error.response.data ,gettoken());
    return { status: false, message: 'Oops! Something went wrong ' };
  }
};

const get_users_Attendance = async req => {
  try {         
        let Response = await AuthRequest.get(
          `${base_url}.get_attendance`,{headers:gettoken()}
          
        );
        return Response?.data.message
  } catch (error) {
    // console.log('API ERROR ', error.response.data);
    return { status: false, message: 'Oops! Something went wrong ' };
  }
};


export default {login, sendOTP, searchfarmerData, crop_seminar, create_crop_seminar, update_crop_seminar, 
  crop_alert, activity_list, create_activity, activity_type, expenses_list, create_expenses, whatsapp_templates,
  door_to_door_awareness , sticker_pasting, create_free_sample, update_status_free_sample,get_seminar_masters, 
  get_users_task, gettoken, farmerCropData, get_free_sample, expense_type, searchdealerData,searchProductData,
  checkoutProduct, update_stock, get_stock, Add_payment_entry,searchProductKitData,searchCropData,checkoutProductKit,
  create_farmer,searchfarmerOrdersData,submit_quiz,get_users_Attendance,searchdealerfarmerOrdersData, 
  searchdealerPaymentData,CompleteOrder, searchgeomitraData, uploadImage, farmer_meeting,
  checkoutPaymentUpdate,activity_for,dayplan_list,Add_payment_cash_entry, search_pravakta_farmer,Checkuser
};
