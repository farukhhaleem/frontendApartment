import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'
import NavbarView from './NavbarView'
import ApartForm from './ApartForm'
import ApartRecords from './ApartRecords'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Badge,
  NavItem
} from 'reactstrap';

class Apartments extends Component{

  logoutAdmin(){
    alert("Admin gona Logout")
    localStorage.removeItem("admintoken")
  }

  render(){
    return(
      <div>
       <Navbar color="light" light expand="md" >
        <NavbarBrand href="/" style={{marginLeft: '150px', fontSize: "25px"}}>Admin Panel of Apartment Application</NavbarBrand>  
        <NavLink href="/home" 
        onClick={()=>{this.logoutAdmin()}}
         style={{marginLeft: "200px"}}>Logout (Admin)</NavLink>
      </Navbar>   
      <Row style={{marginTop: '20px'}}>
        
        <Col sm={4}>
        <h5>Apartments Form</h5>
        <ApartForm />
        </Col>
        <Col sm={6}>
        <h5>Apartments Records</h5>
        <ApartRecords />
        </Col>
        
      </Row>
      </div>
    )
  }
}

export default Apartments