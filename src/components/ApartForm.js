import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

class ApartForm extends Component{
  constructor(){
    super();
    this.state = {
      image: '',
      apartNo: '',
      apartName: '',
      floorNo: '',
      buildingName: ''
    }
  }

add(e){
  e.preventDefault()  
  if(this.state.apartNo !== "" && this.state.apartName !== "" && this.state.floorNo !== '' && this.state.buildingName !== ''){
    let formdata = new FormData()
    formdata.append('apartNo', this.state.apartNo)
    formdata.append('apartName', this.state.apartName)
    formdata.append('floorNo', this.state.floorNo)
    formdata.append('buildingName', this.state.buildingName)
    formdata.append('available', "true")

    if(this.state.image){

      formdata.append('image', this.state.image)
    
    }
    axios.post(`https://lit-mesa-47138.herokuapp.com/apartment`, formdata, {
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
  }

  
}

  render(){
    return(
      <div>
        <Form>
        <Input type="file" name="file" id="imgUpload"
         accept="image/*"
         onChange = { (e)=>this.setState({image: e.target.files[0]})}
         />

          <Label>Apartment No</Label>
          <Input type="number" id ='apartNo' placeholder="Enter Unique Apartment Number"  onChange={(e)=>this.setState({apartNo: e.target.value})} />

          <Label>Apartment Name</Label>
          <Input type="text" placeholder="Enter Apartment Name" id ='apartName'
           onChange={(e)=>this.setState({apartName: e.target.value})} />

          <Label>Floor No.</Label>
          <Input type="number" placeholder="Enter Floor No." id ='floorNo' 
           onChange={(e)=>this.setState({floorNo: e.target.value})} />

          <Label>Building Name</Label>
          <Input type="text" placeholder="Enter Building Name" id ='buildingName'
           onChange={(e)=>this.setState({buildingName: e.target.value})}
          />
          <div style={{display: "flex"}}>
            <Button class="btn btn-primary" id="createApart" onClick={(e)=>this.add(e)} >Add</Button>
            {/* <Button style={{marginLeft:"10px"}}  class="btn btn-primary" id="editApart"  onClick={(e)=>this.edit(e)}>Edit</Button>
            <Button style={{marginLeft:"10px"}} class="btn btn-primary" id="delApart"  onClick={(e)=>this.del(e)}>Delete</Button> */}
          </div>
        </Form>
      </div>
    )
  }
}
export default ApartForm