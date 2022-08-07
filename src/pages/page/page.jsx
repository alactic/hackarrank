import React, {Fragment, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import "../all-Items/allItems.scss";

const AllItems = () =>{ 
    const params = useParams();
    const [forms, setForms] = useState([]);
    const types = useSelector((hackerTest)=>hackerTest)
      
    
    const onInputField = (e, formIndex, fieldIndex) => {
      const {value} = e.target;
      const formDb = localStorage.getItem("formDb")
        if(formDb) {
          let jsonData = JSON.parse(formDb);
            for(let i=0; i < jsonData.length; i++){
                if(jsonData[i]['formId'] === forms[formIndex]['formId']) {
                    forms[formIndex]['form'][fieldIndex]['value'] = value;
                    jsonData[i]['form'][fieldIndex]['value'] = value; 
                    localStorage.setItem("formDb", JSON.stringify([...jsonData]))
                    setForms([...forms])
                 }
              }
        }
    }

    const deleteItem = (index, formId) =>{ 
        const formDb = localStorage.getItem("formDb")
        
        if(formDb) {
          let jsonData = JSON.parse(formDb);
        for(let i=0; i < jsonData.length; i++){
            if(jsonData[i]['formId'] === formId) {
                jsonData.splice(i, 1)
                forms.splice(index, 1)
                localStorage.setItem("formDb", JSON.stringify([...jsonData]))
                setForms([...forms])
             }
          }
        }
 }

    const addItem = (id) =>{ 
      const data = types.hackerTest?.allTypes?.filter(val=>val.id === Number(id))[0]
      if(data){
        const form = [];
        const {type, formId, title, id} = data;
        data?.fields.filter(val => form.push({label: val.label, type: val.type, value: "", id: val.id, formId}))
        setForms([...forms, {form: form, type, title, id, formId: +new Date()}])
        const formDb = localStorage.getItem("formDb")
        
        if(formDb) {
          const jsonData = JSON.parse(formDb);
          console.log({jsonData, form: {form: form, type, title, id}})
          localStorage.setItem("formDb", JSON.stringify([...jsonData, {form: form, type, title, id, formId: +new Date()}]))
      }    
      }
    }
         
      useEffect(() => {
        const formDb = localStorage.getItem("formDb")
        
        if(formDb) {
          const jsonData = JSON.parse(formDb);
          const formArray = []
          jsonData.forEach(val => {
            if(Number(params.id) === val.id) {
                formArray.push(val)
            }
            setForms([...formArray])
          })
          
        }
         }, [types.hackerTest?.allTypes, params.id]);
 
    return(
        <div className="container-fluid">
         <div className="row all-items-container"> 
            {forms?.map((val, formIndex) => (
                <div key={val.formId} className="col-sm-12 col-md-3 col-lg-3 items">
                      <div className="title"><span>{val?.['title']}</span>
                      <i className="fa fa-trash" onClick={()=>deleteItem(formIndex, val.formId)}></i>
                      </div>
                     {val?.form?.map((formField, fieldIndex) =><Fragment key={formField.id}>
                      <div className="form-item">
                                <div className="form-group" >
                                  <label for="type">{formField.label}</label>
                                  <input type={formField.type} value={formField.value}  className="form-control" placeholder="" name="type" onChange={(e)=>onInputField(e, formIndex, fieldIndex)}/>
                            </div>
                        </div>
                      </Fragment>)}
               </div>
               ))}
            <div className="col-sm-12 col-md-3 col-lg-3">
                <button value="Add Field" className="form-control" onClick={()=>addItem(params.id)}>
                    Add Item</button>
            </div>
        </div>
        </div>
    )
}

export default AllItems