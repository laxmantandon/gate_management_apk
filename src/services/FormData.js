// import Geolocation from '@react-native-community/geolocation';

//   let mylocation = {}
//   Geolocation.getCurrentPosition(info =>{
//     // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
//       mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
//       "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
//   })




const submitReqData = (formdata)=>{
  let req ={}
  // req['mylocation'] = JSON.stringify(mylocation) 
    // // console.log('form data', formdata)
    for (let i in formdata){
        // let ing = `${formdata[i].label} : ${formdata[i].value}`
        req[formdata[i].key ] = formdata[i].value
        // // console.log(req)
        // // console.log('submit' ,formdata[i].label)
      
      }

      // // console.log('Req data',req)
    return req
}

export default submitReqData;