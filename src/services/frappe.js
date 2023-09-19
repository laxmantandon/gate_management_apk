import axios from 'axios';
const base_url ='https://dbh.erevive.cloud/'
const base_url2 =`${base_url}api/resource`
const base_url3 =`${base_url}api/method`
import NetInfo from "@react-native-community/netinfo";
import {StyleSheet} from 'react-native'


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
      `${base_url2}/${doctype}?filter=${JSON.stringify(filters)}&fields=${JSON.stringify(fields)}&order_by=${order_by} desc &limit_start=${start_limit} &limit=20`,headers
    );
    return Response?.data;
  } catch (error) {
    console.log(error.response.data.exception);
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


const new_doc = async (doctype, req) => {
  try {
    let Response = await AuthRequest.post(
      `${base_url2}/${doctype}`,req,headers
    );
    return Response?.data;
  } catch (error) {
    // console.log(error.response.data);
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
  req ={
txt:'' ,
doctype: 'DocType',
ignore_user_permissions: 0,
reference_doctype: 'Opportunity',
filters: {"name":["in",["Customer","Lead","Prospect"]]}
  }
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






export default {login,  get_doc, get_list,get_doctype_fields, get_doctype_fields_values, new_doc, set_doc, add_comments,search_links
};
