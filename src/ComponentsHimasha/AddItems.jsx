import React, { Component } from 'react';
import AddRentedItems from './AddRentedItems'
import { Layout, Menu, notification } from 'antd';
import {Card, Button, message} from 'antd';
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const cryptoRandomString  = require("crypto-random-string");

export default class AddItems extends Component {

        constructor(props) {
            super(props);
            this.state = {
              eq_id: "EQP" + cryptoRandomString({length:5}),
              name:'',
              price:'',
              qty:'',
              admins:[],
              admin_id:'',
              model:'',
              condition:false,
              availability:false,
            }
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        formData = (event) => {
            this.setState({[event.target.name]: event.target.value})
            this.setState({condition: !this.state.condition})
            this.setState({availability: !this.state.availability})

            this.setState({
                  ...this.state,
                  [event.target.name] : event.target.value
            })
        }

        componentDidMount(){
            this.fetchAdmins();
        }

        fetchAdmins = () => {
            axios.get("http://127.0.0.1:8000/admin-list/").then((res) => {
                const admins = res.data;
                this.setState({ admins });
          });
        }

    handleSubmit = (event) => {
      const equipObj = {
        eq_id: this.state.eq_id,
        name: this.state.name,
        price: this.state.price,
        qty: this.state.qty,
        admin_id: this.state.admin_id,
      }

      const invenItemObj = {
        item_id: this.state.eq_id,
        image: 'jiji',
        model: this.state.model,
        condition: this.state.condition,
        availability: this.state.availability,
    }

      var url_eq = 'http://127.0.0.1:8000/equipment-create/'
      var url_inven = 'http://127.0.0.1:8000/createInventory/'
          
      fetch(url_eq, {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body:JSON.stringify(equipObj)
      }
      ).then(()=>{
        fetch(url_inven, {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body:JSON.stringify(invenItemObj)
      })})
          this.handleReset()
      }
  
      validateUserInputs = (e) => {
        e.preventDefault()

          const {name, price, qty, model, condition, availability} = this.state

          if(name.length <= 0){
            message.error( 'Name must be filled out', 1)
          }else if(!price || isNaN(price) || !qty || isNaN(qty)){
            message.error( 'Please enter the value', 1)
          }else if(price <= 0 || qty <= 0){
            message.error( 'Enter a positive value', 1)
          }else if(model == ""){
            message.error( 'Model must be filled out', 1)
          }else{

            this.handleSubmit()
            this.openNotificationWithIcon('success')

          }
      }

      openNotificationWithIcon = type => {
        notification[type]({
        message: 'Successfully Added',
        });
    };

      handleReset = () => {
          Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
          this.setState({
              name:[{}],
              price:[{}],
              qty:[{}],
              admin_id:[{}],
              model:[{}],
              condition:[{}],
          });
      };
      

    render() {
        return(
            <div>

                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" style={{ width: "120px",height:"31px",background:"rgba(255, 255, 255, 0.2)",margin:"16px 24px 16px 0",float:"left"}} />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                       <Menu.Item key="1" > <Link to="/admin">Events</Link></Menu.Item>
                        <Menu.Item key="2">Tickets</Menu.Item>
                        <Menu.Item key="3"><Link to="/invoice">Payment</Link></Menu.Item>
                        <Menu.Item key="4">User Data</Menu.Item>
                        <Menu.Item key="4"><Link to="/employeeHome">Employee Management</Link></Menu.Item>
                        <SubMenu key="SubMenu" title="Inventory And Rental">
                        <Menu.ItemGroup title="Inventory">
                          <Menu.Item key="setting:1"><Link to="/add">Add Equipment</Link></Menu.Item>
                          <Menu.Item key="setting:2"><Link to="/inventory">Inventory</Link></Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Rental">
                          <Menu.Item key="setting:3"><Link to="/rental_details">Rental Details</Link></Menu.Item>
                        </Menu.ItemGroup>
                      </SubMenu>
                  </Menu>
                  </Header>



            <div className="row">
              <Card style={{marginLeft:"20%", width:"60%", marginTop:"5.5%"}}>
                <h4>ADD EQUIPMENT</h4>
                  <form onSubmit={this.validateUserInputs} >
                    
                      Item Name<input type="text" className="form-control" onChange= {this.formData} name="name" placeholder="Item Name" ></input>
                      
                      <div className="mt-3">
                      Price<input type="number" className="form-control" onChange= {this.formData} name="price" placeholder="Item Price" ></input></div>                
                  
                      <div className="mt-3">
                      Quantity<input type="text" className="form-control" onChange= {this.formData} name="qty" placeholder="Quantity" ></input></div>
                
                      <div className="mt-3">
                      Admin
                      <select onChange= {this.formData} name="admin_id" class="form-control"  >
                      <option selected>Choose Admin...</option>
                        {this.state.admins.map((a) => {
                          return <option value={a.id}>{a.username}</option>;
                        })}
                      </select></div>

                  
                      <div className="mt-3">
                      Model<input type="text" className="form-control" onChange= {this.formData} name="model" placeholder="Model" ></input></div>

                      <div className="mt-3">
                      Condition | New <input type="radio" className="ml-2" onChange={this.formData} name="condition" value="New"/>
                                    Used <input type="radio" className="ml-2" onChange={this.formData} name="condition" value="Used" /></div>

                      <div className="mt-3">
                      Availability  | Available <input className="ml-2" type="radio"  onChange={this.formData} name="availability" value="Available"/>
                      Unavailable <input type="radio" className="ml-2" onChange={this.formData} name="availability" value="Unavailable" /></div>
                      
        
                      <Button htmlType="submit" type="primary" style={{width:"80%", marginLeft:"10%", marginTop:"3%"}}>Add Equipment</Button>
                   
                  </form>
              </Card>
                
            </div></div>
        )
    }
}
