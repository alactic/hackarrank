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

  const onInputField = (e, fieldIndex, fieldName) => {
    const {name, value} = e.target;
   
    
    const allTypes = types.hackerTest?.allTypes
    if(fieldIndex || fieldIndex === 0) {
      if(value === "delete") {
        fields.splice(fieldIndex, 1)
      }else{
        fields[fieldIndex][fieldName] = value;
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
    setFields([...fields, {label:"", type: e.target.value, id:+new Date()}])
  }

 
    return (
        <div className="manage-type-container">
          <div className="title">
            <span>{payload?.type}</span>
            <span className="delete" onClick={()=>removeType(index)}>x</span>
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
                            <input type="text" value={val.label} className="form-control split-input" placeholder="Object type" onChange={(e) =>onInputField(e, i, "label")}/>
                            <select type="text" className="form-control split-select" onChange={(e) =>onInputField(e, i, "type")}>
                                {inputTypes.map(type => (<option selected={type === val.type} value={type} key={type}>{type.toUpperCase()}</option>))}
                                <option  value="delete">Delete</option>
                            </select>
                        </div>
                    </div>
                    ))}
                <div className="form-group">
                <select value="Add Field" className="form-control" onChange={addField}>
                    <option selected>Add Field</option>
                    {inputTypes.map(type => (<option value={type} key={type}>{type.toUpperCase()}</option>))}
                    </select>
                </div>
          </div>
        </div>

    )
}

export default TypeForm;