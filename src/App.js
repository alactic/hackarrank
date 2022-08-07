import { useEffect } from 'react';
import './App.scss';
import { Route, Switch } from "react-router-dom";
import Header from './components/layout/header/header';
import ManagePage from './pages/manage-type/manageType';
import Page from './pages/page/page';
import { useDispatch } from 'react-redux';
import { getTypes } from './redux/actions/hackerTest/hackerTest';
import AllItems from './pages/all-Items/allItems';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const dbData = localStorage.getItem("typeDb");  
    if(dbData) {
      const dbDataJson = JSON.parse(dbData);
      dispatch(getTypes(dbDataJson));
    }
  }, [])
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/manage-type" component={ManagePage} exact />
        <Route path="/all" component={AllItems} exact />
        <Route path="/type/:id" component={Page} exact />

      </Switch>
    </div>
     );
}

export default App;
