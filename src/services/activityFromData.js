import Geolocation from '@react-native-community/geolocation';

  let mylocation = {}
  Geolocation.getCurrentPosition(info =>{
    // // console.log('Location hai', info.coords.longitude,info.coords.latitude)
      mylocation = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"point_type":"circlemarker","radius":10},
      "geometry":{"type":"Point","coordinates":[info.coords.longitude,info.coords.latitude]}}]}
  })




const activitysubmitReqData = (formdata)=>{
    let req =[]
    req['mylocation'] = JSON.stringify(mylocation) 
    //   // console.log('form data', formdata)
      for (let i in formdata){
        // // console.log('form data', formdata[0])
          req.push({'activity_name':formdata[i].title , 'activity_status':formdata[i].value})
        }
      return req
  }


export default activitysubmitReqData;