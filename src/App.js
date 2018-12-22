import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Forgot from './pages/Forgot'
import NewPass from './pages/NewPass'
import Verification from './pages/Verification'

class App extends Component {
  componentDidMount = () => {
    var load = document.getElementById('load')
    window.onload = () => {
      if(load) { load.remove() }
    }
  }
  render() {
    return (
      <BrowserRouter>
      
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard/" component={Dashboard} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/newpassword" component={NewPass} />
          <Route path="/verification" component={Verification} />
        </Switch>
      
      </BrowserRouter>
    );
  }
}

export default App;
