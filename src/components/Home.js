import  React, {Component} from 'react'
import NavbarView from '../components/NavbarView'
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col
} from 'reactstrap';
import { Row } from 'antd';

class Home extends Component{
  constructor(){
    super();
    this.state = {
      apartments : []
    }
  }
  componentDidMount(){
    axios.get(`https://lit-mesa-47138.herokuapp.com/apartment`).then((res)=>{
        this.setState({
          apartments: res.data
        })
        console.log(this.state.apartments)
      }).catch((err)=>{
        console.log(err)
      })  
  }

  getApartment=(apartID)=>{
    if(localStorage.getItem("token")){
      alert(apartID)
      //api call for get apartment
      axios.post(`https://lit-mesa-47138.herokuapp.com/user/${apartID}`, '', {
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
      available: false
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
    return(
      <div>
        <NavbarView />
        <h4 style={{margin: "15px"}}> All the Avaiable Apartments </h4>
       
       <Row>
        {
          this.state.apartments && this.state.apartments.map((apart)=>{
            if(apart.available === true){
              return(
              
                <Col sm={3}>
            <Card>
              <CardImg top width="100%" src={`https://lit-mesa-47138.herokuapp.com/${apart.image}`} style={{height: "200px", }} alt="Card image cap" />
              <CardBody>
            <CardTitle>Apartment # {apart.apartNo}</CardTitle>
            <CardSubtitle>Apartment Name : {apart.apartName}</CardSubtitle>
            <CardText>Floor # {apart.floorNo}</CardText>
            <CardText>Building Name # {apart.buildingName}</CardText>

                <Button onClick={()=>this.getApartment(apart._id)}>Get it Now</Button>
              </CardBody>
            </Card>
            </Col>
          
            )
            }
           
          })
        }
        </Row>
      </div>
    )
  }
}

export default Home