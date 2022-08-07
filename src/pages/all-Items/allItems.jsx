import React, {Fragment, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "./allItems.scss";
import { getTypes } from '../../redux/actions/hackerTest/hackerTest';

const AllItems = () =>{ 
    const params = useParams();
    const [payload, setPayload] = useState([]);
    const types = useSelector((hackerTest)=>hackerTest)
     
    
    const onInputField = (e, typeId, itemIndex, formId) => {
       const {value} = e.target;
       payload[itemIndex]["form"][formId]["value"] = value;
       setPayload([...payload]);

       const allItems = types?.hackerTest?.allTypes
       let i = 0;
      console.log({value, allItems})

       for(let type of allItems) {
        if(type.id === Number(typeId)) {
          console.log({typeId: type.id, id: Number(typeId), type})
          // allItems[i]["items"] = payload;
            // dispatch(getTypes(allItems));
            // localStorage.setItem("typeDb", JSON.stringify(allItems))
            // return;
           }
           i++
       }
       
    }

    const addItem = (index) =>{ 
      let forms = []
      const allTypes = types.hackerTest?.allTypes[Number(index)]
        const {title, type, id} = allTypes; 
        console.log({allTypes})
          let form = []
            for(let i = 0; i < allTypes.items[0].item.length; i++) {
            const fields = getField(allTypes.items[0].item[i]['id'])
            form.push({...allTypes.items[0].item[i], ...fields})
          }
          forms = [...forms, {form:form.map(val=>({value: "", id: val.id})), title, type, id}]  
        setPayload([...payload, ...forms])
      }

      const getField = (id) => {
         for(let type of types.hackerTest?.allTypes) {
          for(let field of type.fields) {
            if(field.id === id){
              return field
            }
          }
         }
      }

      useEffect(() => {
         let forms = []
            types.hackerTest?.allTypes?.forEach(allTypes => {
              const {title, type, id} = allTypes
              allTypes?.items?.forEach(val => {
                 let form = []
                  for(let i = 0; i < val.item.length; i++) {
                   const fields = getField(val.item[i]['id'])
                   form.push({...val.item[i], ...fields})
                 }
                 forms = [...forms, {form, title, type, id}]  
              })   
            });
            console.log({forms})
            setPayload([...forms])
     }, [types.hackerTest?.allTypes, params.id]);
 

    return(
        <div className="container-fluid">
        <div className="row all-items-container">
            {payload?.map((type, typeIndex) => (
                <div key={typeIndex} className="col-sm-12 col-md-3 col-lg-3 items">
                      <div className="title">{type?.type}</div>
                      <div className="form-item">
                        {type.form.map((val, formId) =>(  
                          <Fragment key={val.id+formId}>
                            
                                <div className="form-group" >
                                  <label for="type">{val.label}</label>
                                  <input type={val.type} value={val.value}  className="form-control" placeholder="" name="type" onChange={(e)=>onInputField(e, type.id, typeIndex, formId )}/>
                            </div>
                          </Fragment>
                        ))}
                        </div>
               </div>
               ))}
            <div className="col-sm-12 col-md-3 col-lg-3">
                <select value="Add Field" className="form-control" onChange={(e)=>addItem(e.target.value)}>
                    <option selected>Add Field</option>
                    {types.hackerTest?.allTypes?.map((type, i) => (<option value={i} key={type}>{type.title.toUpperCase()}</option>))}
                    </select>
            </div>
        </div>
        </div>
    )
}

export default AllItems