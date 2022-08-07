import { useSelector, useDispatch } from 'react-redux';
import TypeForm from '../../components/type-form/typeForm';
import { getTypes } from '../../redux/actions/hackerTest/hackerTest';
import './manageType.scss';

const ManagePage = () => {
  const dispatch = useDispatch();
  const types = useSelector((hackerTest)=>hackerTest)

  const addType = () =>{ 
    const type = {name: "", title: "", id:+new Date()};
    const allTypes = types?.hackerTest?.allTypes
    const payload = allTypes?[...allTypes, type]:[type]
    dispatch(getTypes(payload));
  }

  const removeType = (index)=>{
    const allTypes = types?.hackerTest?.allTypes
    allTypes.splice(index, 1);
    console.log({allTypes})
    dispatch(getTypes(allTypes));
    localStorage.setItem("typeDb", JSON.stringify(allTypes))
  }
  
  return (
    <div className="container-fluid">
      <main className="row">
        {types.hackerTest?.allTypes?.map((val, i) => (<div key={val.id} className="col-sm-12 col-md-3 col-lg-3">
          <TypeForm typePayload={val} index={i} removeType={removeType} /> 
        </div>))}
        <div className="col-sm-12 col-md-3 col-lg-3">
          <div className="add-type" onClick={()=> addType()}>Add Type</div>
        </div>
      </main>
    </div>
  );
}

export default ManagePage;
