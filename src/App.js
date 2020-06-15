import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import SignUp from '../src/components/SignUp'
import LoginForm from '../src/components/LoginForm';
import Home from '../src/components/Home'
import Apartments from '../src/components/Apartments'
import AdminLogin from './components/AdminLogin';
import MyProfile from './components/MyProfile'

function App() {
  return (
    <Router>
      <div className= "App">
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LoginForm} /> 
        <Route exact path='/adminLogin' component={AdminLogin} /> 

        <Route exact path ='/apartments' component={Apartments} />
        <Route exact path ='/myprofile' component={MyProfile} />

      </div>
    </Router>
  );
}

export default App;
