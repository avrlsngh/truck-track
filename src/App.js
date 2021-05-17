import React from 'react';
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';
import User from './screens/User';
import UserList from './screens/UserList';
import NotFoundScreen from './screens/NotFoundScreen';


import { Switch, Route } from "react-router-dom";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import Home from './screens/Home';


class App extends React.Component {
  render(){
    return (
      <div className="appContainer">
       <ToastsContainer
         store={ToastsStore}
         position={ToastsContainerPosition.TOP_RIGHT}
         lightBackground
       />
       <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/login" component={Login} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/user/details/:id" component={User} />
         <Route exact path="/all-users" component={UserList} />
         <Route exact path="*" component={NotFoundScreen} />
       </Switch>
      </div>
     );
  } 
}

export default App;
