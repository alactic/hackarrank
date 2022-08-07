import React from 'react';
import {useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './header.scss';

const Header = () => {
    const history = useHistory();
    const params = useParams();
    console.log({params, history})
    const types = useSelector((hackerTest)=>hackerTest)
    return (
        <div className="container-fluid header-container">
            <div className="row">
               <div className="col">              
                <header>
                    <span className="objector" >Objector</span>
                    <span className={history.location.pathname === "/all"?"active":"inactive"} onClick={()=>history.push("/all")}>All</span>
                    {types.hackerTest?.allTypes?.map((val, i) => (<span key={val.id} className={history.location.pathname === `/type/${val.id}`? "active":"inactive"} onClick={()=>history.push(`/type/${val.id}`)}>{val.type}</span>))}
                     <span className={history.location.pathname === "/manage-type"?"active":"inactive"} onClick={()=>history.push("/manage-type")}>Manage Items</span>
                </header>
              </div>    
            </div>
        </div>
    )
}

export default Header;