import React, {Component} from 'react'
import ApartForm from './ApartForm'
import '../utils/css/stylex.css'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Modal } from 'antd';

class ApartRecords extends Component{
  constructor(){
    super();
    this.state = {
      apartments : [],
      apartNo: '',
      apartName: '',
      floorNo: '',
      buildingName: ''
    }
  }
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  

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

  //edit the apartment
  edit(e, val){

    e.preventDefault()
    alert(val)
    let apartment={
      apartNo: this.state.apartNo,
      apartName: this.state.apartName,
      floorNo: this.state.floorNo,
      buildingName: this.state.buildingName
    }
    axios.patch(`https://lit-mesa-47138.herokuapp.com/apartment/edit/${val}`, apartment , {
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
    alert("edit now")
  }


  // delete the apartment
  del(e, val){
    alert(val)
    e.preventDefault()
    axios.post(`https://lit-mesa-47138.herokuapp.com/apartment/del/${val}`, '', {
      headers: {
          'Authorization': localStorage.getItem("admintoken"),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      alert("Something is worng in data or internet connection...")
    })  
    alert("del now")
  }
  
  render(){
    return(
      <div>
        <table>
        <thead>
      <tr>
        <th>Apartment#</th>
        <th>ApartmentName</th>
        <th>Floor#</th>
        <th>BuildingName</th>
        {/* <th>Available</th>    */}
        <th>Image</th>

      </tr>
    </thead>
    <tbody>
       {
         this.state.apartments && this.state.apartments.map((apart)=>{
        
          return(
            
          <tr id = {apart._id}>
            <td>{apart.apartNo}</td>
            <td>{apart.apartName}</td>
            <td>{apart.floorNo}</td>
            <td>{apart.buildingName}</td>
            {/* <td>{apart.available}</td> */}
            <td><img src={`https://lit-mesa-47138.herokuapp.com/${apart.image}`} style={{height: "70px", width: "70px" }} /></td>
            <div style={{display: 'flex'}}>
            {/* <Button style={{marginLeft:"10px"}}  class="btn btn-primary" id="editApart"  onClick={(e)=>this.edit(e, apart._id)}>Edit</Button> */}
            <Button style={{marginLeft:"10px"}} class="btn btn-primary" id="delApart"  onClick={(e)=>this.del(e,  apart._id)}>Delete</Button>
            
        <Button type="primary" style={{marginLeft: '5px'}} onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div><Form>
          <p>Note: You must have to retype the values in the field...</p>
          <Label>Apartment No</Label>
          <Input type="number" id ='apartNo' placeholder="Enter Unique Apartment Number"  onChange={(e)=>this.setState({apartNo: e.target.value})}
            defaultValue = {apart.apartNo}
          />

          <Label>Apartment Name</Label>
          <Input type="text" placeholder="Enter Apartment Name" id ='apartName'
           onChange={(e)=>this.setState({apartName: e.target.value})} 
           defaultValue = {apart.apartName}
           />

          <Label>Floor No.</Label>
          <Input type="number" placeholder="Enter Floor No." id ='floorNo' 
           onChange={(e)=>this.setState({floorNo: e.target.value})} 
           defaultValue = {apart.floorNo}/>

          <Label>Building Name</Label>
          <Input type="text" placeholder="Enter Building Name" id ='buildingName'
           onChange={(e)=>this.setState({buildingName: e.target.value})}
           defaultValue = {apart.buildingName}
          />
          <div style={{display: "flex"}}>
            <Button class="btn btn-primary" id="createApart" onClick={(e)=>this.edit(e, apart._id)} >Save</Button>
         
          </div>
        </Form></div>
        </Modal>
      </div>
          </tr>
           )
         })
       }
    </tbody>
    </table>
    </div>
    )
  }
}

export default ApartRecords