import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input,Row, Col, FormText } from 'reactstrap';
import '../utils/css/Form.css'
import NavbarView from './NavbarView'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

class SignUp extends Component{
  constructor(){
    super();
    this.state = {
      username : '',
      email: '',
      password : '',
      token : '',
      usernameError : '',
      emailError: '',
      passwordError: '',
      data : ''
    }
  }
  userChange = (e) =>{
    document.getElementById('usernameInput').innerHTML =""
    this.setState({
      username: e.target.value,
      usernameError: ""
    })
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
    if(this.state.username == ''){
      this.setState({
        usernameError:"Username must not be empty"
      })
    }
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
        passwordError:"Password must be 8 characters long"
      })
    }

    this.callSignUp()
  }

  callSignUp(){ 
    if(this.state.usernameError === "" && this.state.emailError === "" && this.state.passwordError === ""){
      let user = {
        username: this.state.username,
        email : this.state.email,
        password : this.state.password
      }
      axios.post(`https://lit-mesa-47138.herokuapp.com/user`, user).then((res)=>{
        this.setState({
          data : res.data.user._id,
          token: res.data.token
        })
        
        console.log(res.data.user)
      })  
    }
  }

  render(){
    if(this.state.token){
      
      localStorage.setItem("data", this.state.data );
      localStorage.setItem("token", this.state.token );
      return <Redirect to = '/home' />
    }
    else if(localStorage.getItem("token")){
      return <Redirect to = '/home' />
    }
    return(
        <div>
      <NavbarView />
      <Row>
        <Col sm={4} ></Col>
        <Col sm={4}>
      <div className="signupformStyle">
      <h4>User SignUp</h4>

      <Form>
        <Label>Username</Label>
        <Input
         type="text" id="username" placeholder="Type your name"
         onChange = {(e)=>this.userChange(e)}
         />
         <span id= "usernameInput">{this.state.usernameError}</span>
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
        <Button color="primary" onClick={ (e)=>{this.validation(e)}} >SignUp</Button>
      </Form>

      </div>
      </Col>    
    </Row>
    </div>
     
    )
  }
}

export default SignUp