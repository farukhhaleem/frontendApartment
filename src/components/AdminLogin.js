import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input,Row, Col, FormText } from 'reactstrap';
import '../utils/css/Form.css'
import NavbarView from './NavbarView'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

class AdminLogin extends Component{
  constructor(){
    super();
    this.state = {
       email: '',
      password : '',
      token : '',
      emailError: '',
      passwordError: '',
      data : ''
    }
  }
 
  emailChange = (e) =>{
    document.getElementById('emailInput').innerHTML = ""
    this.setState({
      email: e.target.value,
      emailError: ""
    })
  }
  passwordChange = (e) =>{
    document.getElementById('passwordInput').innerHTML = ""
    this.setState({
      password: e.target.value,
      passwordError: ""
    })
  }

  validation=(e)=>{
    e.preventDefault();
    let emailRegex = /\w+@\w+[.]com/

    if(this.state.email == ''){
      this.setState({
        emailError:"Empty email"
      })
    }
    if(!emailRegex.test(this.state.email)){
      this.setState({
        emailError: 'Invalid Email'
      })
    }
    if(this.state.password == '' ){
      this.setState({
        passwordError:"Put something in your password"
      })
    }

    this.callSignUp()
  }

  Adminvalidation=(e)=>{
    e.preventDefault();
    let emailRegex = /\w+@\w+[.]com/

    if(this.state.email == ''){
      this.setState({
        emailError:"Empty email"
      })
    }
    if(this.state.email !== 'admin@gmail.com'){
      this.setState({
        emailError: 'Invalid Email'
      })
    }
    if(this.state.password !== 'admin' ){
      this.setState({
        passwordError:"Password is wrong"
      })
    }
    
    this.callSignUp()
    
    
  }


  callSignUp(){ 
    if(this.state.emailError === "" && this.state.passwordError === ""){
      let user = {
        email : this.state.email,
        password : this.state.password
      }
      axios.post(`https://lit-mesa-47138.herokuapp.com/user/login`, user).then((res)=>{
        this.setState({
          data : res.data.user._id,
          token: res.data.token
        })
        console.log(res.data.user)
      }).catch((err)=>{
        alert("Email or password is Invalid")
      })  
    }
  }

  render(){
    if(this.state.token){
      
      localStorage.setItem("data", this.state.data );
      localStorage.setItem("admintoken", this.state.token );
      return <Redirect to = '/apartments' />
    }
    else if(localStorage.getItem("admintoken")){
      return <Redirect to = '/apartments' />
    }

    return(
        <div>
      <NavbarView />
      <Row>
        <Col sm={4} ></Col>
        <Col sm={4}>
      <div className="signupformStyle">
      <Form>
        <h4>Admin Login</h4>
        <Label>Email</Label>
        <Input
         type="email" placeholder="Enter your email"  name="email" 
         onChange = {(e)=>this.emailChange(e)}
        />
        <span id= "emailInput">{this.state.emailError}</span>
        <Label>Password</Label>
        <Input
         type="password" placeholder="*******"
         name= "password"
         id = "password"
         onChange = {(e)=>this.passwordChange(e)}
        />
        <span id= "passwordInput">{this.state.passwordError}</span>
        <div style= {{display: "flex"}}>
        <Button color="primary" onClick={ (e)=>{this.Adminvalidation(e)}} >Login as Admin</Button>
        </div>
      </Form>

      </div>
      </Col>    
    </Row>
    </div>
     
    )
  }
}

export default AdminLogin