const SetFieldsValue = (formdata,results)=>{
    let req ={}
    //   for (let i in formdata){
    //       req[formdata[i].key ] = formdata[i].value
          
    formdata.forEach(i => {
            if(i.key=='items'){
                // console.log( results[i.key])
                if (results[i.key]==[]){
                    i.value=results[i.key]
                }
                else{
                results[i.key].forEach(a => {
                    a.title= a.item_name
                    a.status='Add to cart'
                    a.percent=a.qty
                    a.rate=a.base_rate
                    a.subtitle = `Price - ${a.base_rate}`
                  });

                  i.value=results[i.key]

                }
            }else{
                if(!i.value){
                i.value=results[i.key]
                }
                // console.log( i.value)

                // console.log(i.value)
            }
            // console.log(i.value)
            // if (i === a.fieldname) {
            //   a.fieldvalue = item.data[i]
            //   a.docname=a.name
            //   console.log('llllllllllllllllllllllllllllllllll',i)
            // }
    });


        // }
    return formdata
  }
  
export default SetFieldsValue