const getDoctypeFields = (formdata)=>{
    //   for (let i in formdata){
    //       req[formdata[i].key ] = formdata[i].value
    mapped_array = []
    formdata.docs[0].fields.forEach(a => {
      if(a.label=='WhatsApp'){
      // console.log(a)
      }

      let fieldtype='text'
      let fieldvalue=null
      let keyboard =''
      let link_doctype = ''
      if (a.fieldtype=="Data"){
        fieldtype='text'
        if (a.options =="Phone"){
          // console.log('Phone Number')
          a.len=10
          keyboard='phone-pad'
        }
      }else if (a.fieldtype=="Attach Image"){
        fieldtype='image'
        a.fieldvalue =[]
      }else if (a.fieldtype =="Float" && a.options =="Int" ){
        // console.log('Phone Number')
        // a.len=10
        keyboard='phone-pad'
      }
      else if (a.fieldtype=="Select"){
        fieldtype='select'
        a.fieldvalue =''
        // let mtext = prompt(a.options)
        a.options = a.options.toString().split("\n")
        // console.log(a.options.toString().split(" "))
      }

      else if (a.fieldtype=="Date"){
        fieldtype='date'
        a.fieldvalue =''
        // let mtext = prompt(a.options)
        // console.log(a.options.toString().split(" "))
      }

      else if (a.fieldtype=="Link"){
        if(a.options=='Doctype'){
          a.filter={"name":["in",["Customer","Lead","Prospect"]]}
        }
        // fieldtype='searchable'
        fieldtype='select'
        a.fieldvalue =''
        link_doctype = a.options
        if(a.fieldname=='opportunity_from'){
          a.options=[ 'Lead','Customer']
        }else{
        a.options = []
        }
      }

      else if (a.fieldtype=="Table"){
        if(a.label="Items"){
          fieldtype='Items'
          a.fieldvalue =[]

          // if(item){
            // for (let i in item.data) {
            //   if (i === a.fieldname) {
            //     a.fieldvalue = item.data[i]
            //     a.docname=a.name
            //     console.log('llllllllllllllllllllllllllllllllll',i)
            //   }
            // }
          // }
          
          link_doctype = a.options
        }else{
        fieldtype='Table'
        a.fieldvalue =[]
        link_doctype = a.options
        // console.log(a)
        }
      }
      

     if(a.reqd){
      if(a.label){
        // if(item){
        //   for (let i in item.data) {
        //     if (i === a.fieldname) {
        //       a.fieldvalue = item.data[i]
        //       a.docname=a.name
        //       // console.log('llllllllllllllllllllllllllllllllll',i)
        //     }
        //   }
        // }
        let p = {docname:a?.name?a.name:'',label:a.label, type:fieldtype,placeholder:a.label, key:a.fieldname, options:a.options, value:a.fieldvalue, keyboard:keyboard}
        p.data=a
          if (link_doctype){
            p.link_doctype = link_doctype
          }
          if(a.read_only){
            p.read_only=a?.read_only
          }
        mapped_array.push(p)

       }

     }
      
    });

        // }
    return mapped_array
  }
  
export default getDoctypeFields