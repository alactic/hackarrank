import React from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './header.scss';

const Header = () => {
    const history = useHistory();
    const [dropdownToggle, setDropDownToggle] = useState(false);
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
                     <span onClick={()=>setDropDownToggle(!dropdownToggle)}><i className="fa fa-bars"></i></span>
                </header>
                {dropdownToggle && <div className="dropdown">
                     <span className={history.location.pathname === "/all"?"active":"inactive"} onClick={()=>history.push("/all")}>All</span>
                        {types.hackerTest?.allTypes?.map((val, i) => (<span key={val.id} className={history.location.pathname === `/type/${val.id}`? "active":"inactive"} onClick={()=>history.push(`/type/${val.id}`)}>{val.type}</span>))}
                     <span className={history.location.pathname === "/manage-type"?"active":"inactive"} onClick={()=>history.push("/manage-type")}>Manage Items</span>
                </div>}
              </div>    
            </div>
        </div>
    )
}

export default Header;