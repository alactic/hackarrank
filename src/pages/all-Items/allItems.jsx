import React, {Fragment, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import "./allItems.scss";

const AllItems = () =>{ 
    const params = useParams();
    const [forms, setForms] = useState([]);
    const types = useSelector((hackerTest)=>hackerTest)
      
    
    const onInputField = (e, formIndex, fieldIndex) => {
      const {value} = e.target;
      forms[formIndex]['form'][fieldIndex]['value'] = value;
      localStorage.setItem("formDb", JSON.stringify(forms))
      setForms([...forms])
    }

    const addItem = (id) =>{ 
      const data = types.hackerTest?.allTypes?.filter(val=>val.id === Number(id))[0]
      if(data){
        const form = [];
        const {type, formId, title, id} = data;
        data?.fields.filter(val => form.push({label: val.label, type: val.type, value: "", id: val.id, formId}))
        setForms([...forms, {form: form, type, title, id, formId: +new Date()}])
      }    
    }

    const deleteItem = (index) =>{ 
           forms.splice(index, 1)
          setForms([...forms]);
         localStorage.setItem("formDb", JSON.stringify(forms))
    }
         
      useEffect(() => {
        const formDb = localStorage.getItem("formDb")
        
        if(formDb) {
          const jsonData = JSON.parse(formDb)
          setForms(jsonData)
        }
         }, [types.hackerTest?.allTypes, params]);
 
    return(
        <div className="container-fluid">
         <div className="row all-items-container"> 
            {forms?.map((val, formIndex) => (
                <div key={val.id} className="col-sm-12 col-md-3 col-lg-3 items">
                      <div className="title"><span>{val?.['title']}</span>
                      <i className="fa fa-trash" onClick={() =>deleteItem(formIndex)}></i>
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
                <select value="Add Field" className="form-control" onChange={(e)=>addItem(e.target.value)}>
                    <option selected>Add Item</option>
                    {types.hackerTest?.allTypes?.map((type, i) => (<option value={type.id} key={type.id}>{type.title.toUpperCase()}</option>))}
                    </select>
            </div>
        </div>
        </div>
    )
}

export default AllItems