import React, {Fragment, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "../manage-type/manageType.scss";
import { getTypes } from '../../redux/actions/hackerTest/hackerTest';

const Page = () =>{ 
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState([]);
    const [typeData, setTypeData] = useState(null);
    const types = useSelector((hackerTest)=>hackerTest)
     
    
    const onInputField = (e, itemIndex, fieldIndex) => {
       const {value} = e.target;
       payload[itemIndex]["item"][fieldIndex]["value"] = value;
       setPayload([...payload]);
       const allItems = types?.hackerTest?.allTypes
       let i = 0;
       for(let type of allItems) {
           if(type.id === Number(params.id)) {
            allItems[i]["items"] = payload;
            dispatch(getTypes(allItems));
            localStorage.setItem("typeDb", JSON.stringify(allItems))
            return;
           }
           i++
       }
       
    }

    const addItem = () =>{ 
        const newPayload = typeData?.fields?.map((val)=>({value: "", id:val.id }));
        setPayload([...payload, {item: newPayload}]);
      }

      useEffect(() => {
            const filteredItems = types.hackerTest?.allTypes?.filter(val => val.id === Number(params.id));
            setTypeData(filteredItems?.[0]);
            if(filteredItems?.[0]?.['items']){
                setPayload([...filteredItems?.[0]?.['items']])
            }
     }, [types.hackerTest?.allTypes, params.id]);
 

    return(
        <div className="container-fluid">
        <div className="row">
            {payload?.map((itemType, itemIndex) => (
              <div key={itemIndex} className="col-sm-12 col-md-3 col-lg-3">
                {typeData?.fields?.map((val, fieldIndex) =>(
                   <Fragment key={fieldIndex}>
                   {itemType?.['item']?.[fieldIndex]?.['id'] === val?.id ?<div key={fieldIndex} className="form-group">
                        <label for="type">{val.label}</label>
                        <input type={val.type} value={itemType['item'][fieldIndex]['value']}  className="form-control" placeholder="" name="type" onChange={(e)=>onInputField(e, itemIndex, fieldIndex )}/>
                  </div>: null}
                </Fragment>))}
               </div>))}
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="add-type" onClick={()=> addItem()}>Add Item</div>
            </div>
        </div>
        </div>
    )
}

export default Page