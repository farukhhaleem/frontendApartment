import React, {Component}from 'react';
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import { MenuUnfoldOutlined,   MenuFoldOutlined} from '@ant-design/icons';
import {Redirect, Link } from 'react-router-dom';
import '../utils/css/stylex.css'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Badge,
  NavItem
} from 'reactstrap';

class NavbarView extends Component{
  
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  // componentDidMount(){
  //   var loginsignup = document.getElementById("loginsignup")
  //   var logout = document.getElementById("logout")
    
  //   if(localStorage.getItem("token")){
  //     loginsignup.style.display = "none"
  //   }
  //   else{

  //   }
  // }
  
  logout=()=>{
    alert("User gona Logout")
    localStorage.removeItem("token")
  }

 render(){
  return(
    <React.Fragment>
      <div>
      <Navbar color="light" light expand="md" style={{boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.0), 0 2px 20px 1px rgba(0, 0, 0, 0.19)"}}>
      
            <NavLink className = "text-dark" 
          style={{marginLeft : "50px", paddingRight: "20px"}}
          onClick = {this.showDrawer} 

          >
            <div style={{display: 'inline', marginRight: "25px", fontSize:"25px"}}>
              {React.createElement(this.state.visible ?   MenuUnfoldOutlined : MenuFoldOutlined)} 
              </div>
          <span style={{fontSize: "25px", narginTop: "5px"}}>Apartment Application</span> 
          </NavLink>

          <NavLink href="/myprofile" >My Profile</NavLink>

      </Navbar>
    </div>

      <div>
        <Drawer 
          title="MENU"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          
        >
         <li>
          <Link to='/home'><span id="drawerLinks">Available Apartments</span></Link>
          </li>

          <div id = "loginsignup">
          <li >
          <Link to='/login'><span id="drawerLinks">Login as User</span></Link>
          </li>
          <li >
          <Link to='/signup'><span id="drawerLinks">User Signup</span></Link>
          </li>

          </div>

          <li>
          <Link to='/adminLogin'><span id="drawerLinks">Login as Admin</span></Link>
          </li>

          <div id="logout">
           <li  className ='logout'>
          <Link to='/home' onClick={ ()=>{this.logout()}}><span id="drawerLinks">Logout</span></Link>
          </li>
          </div>

        </Drawer>
      </div>
    </React.Fragment>
  );
 }
    
  }



export default NavbarView;