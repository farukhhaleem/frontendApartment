import  React, {Component} from 'react'
import NavbarView from '../components/NavbarView'
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col
} from 'reactstrap';
import { Row } from 'antd';
import { Redirect } from 'react-router-dom';

class MyProfile extends Component{
  constructor(){
    super();
    this.state = {
      allapartments : [],
      myapartments: []
    }
  }
  componentDidMount(){
    
    axios.get(`https://lit-mesa-47138.herokuapp.com/apartment`).then((res)=>{
      this.setState({
        allapartments: res.data
      })
      console.log(this.state.allapartments)
    }).catch((err)=>{
      console.log(err)
    }) 


    axios.post(`https://lit-mesa-47138.herokuapp.com/user/apartment`, '', {
      headers: {
          'Authorization': localStorage.getItem("token"),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
    this.setState({
      myapartments : res.data
    })
      console.log(res.data)
    }).catch((err)=>{
      alert("Something is worng in data or internet connection...")
    })   
  }

  //Unowned Apartment
  getApartment=(apartID)=>{
    if(localStorage.getItem("token")){
      alert(apartID)
      //api call for get apartment
      axios.post(`https://lit-mesa-47138.herokuapp.com/user/unowned/${apartID}`, '', {
      headers: {
          'Authorization': localStorage.getItem("token"),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      alert("Something is worng in data or internet connection...")
    })  
    
    let apartment={
      available: true
    }
    axios.patch(`https://lit-mesa-47138.herokuapp.com/apartment/edit/${apartID}`, apartment , {
      headers: {
          // 'Authorization': localStorage.getItem("admintoken"),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      alert("Something is worng in data or internet connection...")
    })  

    }else{
      alert("User must be logged in to get the apartment.")
    }
  }

  render(){
    if(!localStorage.getItem("token")){
      return <Redirect to = '/login' />
    }
    return(
      <div>
        <NavbarView />
        <h4 style={{margin: "15px"}}> My Apartments </h4>
       
       <Row>
        {
          this.state.myapartments && this.state.myapartments.map((apart)=>{
            
              return(
              
                <Col sm={3}>
            <Card>
            
              <CardBody>
            <CardTitle>Apartment ID # {apart.apartment}</CardTitle>
            

                <Button onClick={()=>this.getApartment(apart.apartment)}>Un Acquire Now</Button>
              </CardBody>
            </Card>
            </Col>
          
            )
            
             }
          )
        }
        </Row>
      </div>
    )
  }
}

export default MyProfile