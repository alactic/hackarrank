import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getTypes } from '../../redux/actions/hackerTest/hackerTest';
import './typeForm.scss';

const TypeForm = ({typePayload, index, removeType}) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(typePayload?.fields||[]);
  const [payload, setPayload] = useState(typePayload||{});
  const types = useSelector((hackerTest)=>hackerTest)
  const inputTypes = ["number", "text", "date", "checkbox"];

  const onInputField = (e, fieldIndex, fieldName, val) => {
    const {name, value} = e.target;
    const formDb = localStorage.getItem("formDb")    
    const allTypes = types.hackerTest?.allTypes
    if(fieldIndex || fieldIndex === 0) {
      if(value === "delete") {
        fields.splice(fieldIndex, 1);
        if(formDb) {
          const jsonData = JSON.parse(formDb);
          for(let i = 0; i< jsonData.length; i++) {
              for(let n = 0; n<jsonData[i]['form']['length']; n++) {
                if(jsonData[i]['form'][n]['id'] === val.id) {
                  jsonData[i]['form'].splice(n, 1);
                  console.log({jsonData: jsonData[i]['form'][n], n, i})
                  localStorage.setItem("formDb", JSON.stringify([...jsonData]))
                  // return
                }
              }
          }
         }
      }else{
        fields[fieldIndex][fieldName] = value;
      }
      if(formDb) {
        const jsonData = JSON.parse(formDb);
        for(let i = 0; i< jsonData.length; i++) {
            for(let n = 0; n<jsonData[i]['form']['length']; n++) {
              if(jsonData[i]['form'][n]['id'] === val.id) {
                jsonData[i]['form'][n][fieldName] = value;
                localStorage.setItem("formDb", JSON.stringify(jsonData))
                // return
              }
            }
        }
       }
   
        setFields([...fields])
        const newPayload = {...payload, fields} 
        setPayload(newPayload);
        allTypes[index] = newPayload;
         dispatch(getTypes(allTypes))
        localStorage.setItem("typeDb", JSON.stringify(allTypes))
      }else{
        const newPayload = {...payload, [name]: value} 
        setPayload(newPayload);
        allTypes[index] = newPayload;
        dispatch(getTypes(allTypes))
        localStorage.setItem("typeDb", JSON.stringify(allTypes))
      }
     
  }

  const addField = (e) =>{ 
    const formDb = localStorage.getItem("formDb")    
    setFields([...fields, {label:"", type: e.target.value, id:+new Date()}]);
  }

 
    return (
        <div className="manage-type-container">
          <div className="title">
            <span>{payload?.type}</span>
            <i className="fa fa-trash" onClick={()=>removeType(index)}></i>
            </div>
            <div className="form-item">
                   <div className="form-group">
                      <label for="type">Object Type</label>
                      <input type="text" value={payload.type} className="form-control" placeholder="Object type" name="type" onChange={onInputField}/>
                    </div>
                    <div className="form-group">
                        <label for="type">Object Title</label>
                        <input type="text" value={payload.title} className="form-control" placeholder="Object type" name="title" onChange={onInputField}/>
                    </div>
                    <label for="type">Fields</label>
                    {fields.map((val, i) => (
                    <div key={`${val}${i}`}>
                        <div className="fields">
                            <input type="text" value={val.label} className="form-control split-input" placeholder="Object type" onChange={(e) =>onInputField(e, i, "label", val)}/>
                            <select type="text" className="form-control split-select" onChange={(e) =>onInputField(e, i, "type", val)}>
                                {inputTypes.map(type => (<option selected={type === val.type} value={type} key={type}>{type.toUpperCase()}</option>))}
                                <option  value="delete">Delete</option>
                            </select>
                        </div>
                    </div>
                    ))}
                <div className="form-group">
                <select value="Add Field" className="form-control" onChange={(e)=>addField(e)}>
                    <option selected>Add Field</option>
                    {inputTypes.map(type => (<option value={type} key={type}>{type.toUpperCase()}</option>))}
                    </select>
                </div>
          </div>
        </div>

    )
}

export default TypeForm;