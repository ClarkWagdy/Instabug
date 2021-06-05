import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from './Components/login/Login';
import Home from './Components/Home/home';
import Notfound from './Components/Notfound/Notfound';



class App extends Component {


  state = {
  
  };


  render() {
  
      return (<React.Fragment>

<Switch>
              <Route path="/login" exact render={(props) => (
               <Login {...props} />
              )}/>

<Route path="/home"  exact render={(props) => (<Home {...props}/>)}/>
         
<Redirect from="/" exact to="/home"></Redirect>
         <Route to="/404" component={Notfound}/>
         
              
              <Redirect to="/404" />

              </Switch>
      </React.Fragment>);
  }
}

export default App;
