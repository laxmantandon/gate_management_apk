import axios from 'axios';
const base_url ='https://erp.etplraipur.com/'
const base_url2 =`${base_url}api/resource`
const base_url3 =`${base_url}api/method`
import NetInfo from "@react-native-community/netinfo";
import {Alert, StyleSheet} from 'react-native'
import { AuthContext } from '../components/context';
import React from 'react';


const headers = new Headers();
const AuthRequest = axios.create({});

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


const reset_password = async (email) => {
  
 try {
  let resetResponse =  AuthRequest.post(`https://erp.etplraipur.com/api/method/frappe.core.doctype.user.user.reset_password?user=${email}`);

    return resetResponse;
  } catch (error) {
    console.log(error.response.data.exception);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const get_doctype_fields = async (doctype) => {
  try {
    let Response = await AuthRequest.get(
      `${base_url3}/frappe.desk.form.load.getdoctype?doctype=${doctype}`,headers
    );
    return Response?.data;
  } catch (error) {
    // console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const get_doctype_fields_values = async (doctype,name) => {
  try {
    let Response = await AuthRequest.get(
      `${base_url3}/frappe.desk.form.load.getdoc?doctype=${doctype}&name=${name}`,headers
      // api/method/frappe.desk.form.load.getdoctype?doctype=Lead
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};



const get_list = async (doctype,filters,fields,start,orderBy) => {
  
  let order_by=orderBy?orderBy:'creation'
  let start_limit=start?start:0
  // console.log(`${base_url2}/${doctype}?filter=${JSON.stringify(filters)}&fields=${JSON.stringify(fields)}`)
  try {
    let Response = await AuthRequest.get(
      `${base_url2}/${doctype}?filters=${JSON.stringify(filters)}&fields=${JSON.stringify(fields)}&order_by=${order_by} desc &limit_start=${start_limit} &limit=50`,headers
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data.exception);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const get_doc_filter = async (doctype,filters) => {
  
  let order_by=orderBy?orderBy:'creation'
  let start_limit=start?start:0
  // console.log(`${base_url2}/${doctype}?filter=${JSON.stringify(filters)}&fields=${JSON.stringify(fields)}`)
  try {
    let Response = await AuthRequest.get(
      `${base_url2}/${doctype}?${JSON.stringify(filters)}`,headers
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data.exception);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const get_notifications = async () => {
  try {
    let Response = await AuthRequest.get(
      `${base_url3}/frappe.desk.doctype.notification_log.notification_log.get_notification_logs`,headers
    );

    return Response?.data;
  } catch (error) {
    console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const get_doc = async (doctype, name) => {
  try {
    let Response = await AuthRequest.get(
      `${base_url3}/frappe.desk.form.load.getdoc?doctype=${doctype}&name=${name}`,headers
    );

    return Response?.data.docs;
  } catch (error) {
    console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const set_doc = async (doctype, req) => {
  try {
    let Response = await AuthRequest.put(
      `${base_url2}/${doctype}/${req.name}`,req,headers
    );
    return Response?.data;
  } catch (error) {
    // console.log(error.response.data);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


// const get_users_role = async (doctype, req) => {
//   try {
//     let Response = await AuthRequest.get(
//       `${base_url2}/User?role=Logistics`,req,headers
//     );
//     console.log(Response)
//     return Response?.data;
//   } catch (error) {
//     console.log(error.response.data);
//     return {status: false, message: 'Oops! Something went wrong'};
//   }
// };

const new_doc = async (doctype, req) => {
  try {
    let Response = await AuthRequest.post(
      `${base_url2}/${doctype}`,req,headers
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data);
    Alert.alert('Error',error.response.data?.exception)
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const add_comments = async (req) => {
  try {
    let Response = await AuthRequest.post(
      `${base_url3}/run_doc_method`,req,headers
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.data._server_messages[0].message);
    console.log()
    return {status: false, message: 'Oops! Something went wrong'};
  }
};


const search_links = async (req) => {
//   req ={
// txt:'' ,
// doctype: 'DocType',
// ignore_user_permissions: 0,
// reference_doctype: 'Opportunity',
// filters: {"name":["in",["Customer","Lead","Prospect"]]}
//   }
  try {
    let Response = await AuthRequest.post(
      `${base_url3}/frappe.desk.search.search_link`,req,headers
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.data._server_messages[0].message);
    console.log()
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const session_user = async () => {
  let req=''
    try {
      let Response = await AuthRequest.post(
        `${base_url3}/frappe.auth.get_logged_user`,req,headers
      );
      return Response?.data;
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.data._server_messages[0].message);
      console.log()
      return {status: false, message: 'Oops! Something went wrong'};
    }
  };


  const get_pdf = async (doctype, docname,format) => {
    let req=''
      try {
        let Response = await AuthRequest.post(
          `${base_url3}/frappe.utils.print_format.download_pdf?doctype=${doctype}&name=${docname}&format=${format}`,req,headers
        );
        return Response?.data;
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.data._server_messages[0].message);
        console.log()
        return {status: false, message: 'Oops! Something went wrong'};
      }
    };

    const upload_file = async (file, doctype, docname, is_private) => {
      // let req ={}
      
      // req.file= file
      // req.is_private=is_private
      // req.doctype= doctype
      // req.folder='Home/Attachments'
      // req.docname='GP-Gate A-299209'
      // req.file_name='GP-Gate A-299209'
      let imageCount=0
      file.forEach(imgdata => {
        imageCount = imageCount + 1
        let req = {
          filename: docname + imageCount + '.jpg',
          data: imgdata.replace('data:image/jpeg;base64,',' ') ,
          doctype: 'Gate Entry',
          docname: docname
        }
   
     
      console.log(req)
        try {
          // let Response = await AuthRequest.post(
          //   `https://erp.etplraipur.com/api/method/upload_file`,req,headers
          // );
          let Response =  AuthRequest.post(`https://erp.etplraipur.com/api/method/gate_management.gm_login.gm_write_file`,req)
          console.log(Response)
          return Response?.data;
        } catch (error) {
          console.log(error.response.data);
          console.log(error.response.data._server_messages[0].message);
          return {status: false, message: 'Oops! Something went wrong'};
        }
      })
      };





export default {base_url,get_pdf,upload_file, login, reset_password, get_doc, get_list, get_doctype_fields, get_doctype_fields_values, new_doc, set_doc, add_comments, search_links, session_user, get_notifications
};
