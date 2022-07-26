import React, { Component } from 'react'

import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import EventFooter from '../ComponentsAkila/EventFooter'
import EditForm from './EditForm'
import {Button,  Popconfirm, message, Layout, Menu, Card} from 'antd';

const { Header, Content } = Layout;
const { SubMenu } = Menu;


export default class InventoryItems extends Component {

    constructor(){
        super()
        this.state = {
            equipment: [],
            inventory:[],
            selectedItem:{},
            inEditMode: false
        }
        this.fetchDetails = this.fetchDetails.bind(this)
        this.deleteEquipment = this.deleteEquipment.bind(this)
    }
 
    componentDidMount(){
        this.fetchDetails();
      }

    /* scrollToBottom() {
      scroll.scrollToBottom();
  
    } */

    fetchDetails(){
        console.log('fetching data ...')
    
        fetch('http://127.0.0.1:8000/get-eq-inven/')
        .then(response => response.json())
        .then(data => 
          this.setState({
            equipment:data
          }) 
          )
      }

    deleteEquipment = (item) => {
          console.log(item.id)
          var url="http://127.0.0.1:8000/inventory-del/"+item.eq_id+"/"
        fetch(url, {
          method:'DELETE',
          headers:{
            'Content-type': 'application/json',
          }
        }).then((response) => {
            this.fetchDetails()
        }).catch(err=>console.log(err));
    }


    
    myFunction(item) {
        
            console.log(item.id)
          var url="http://127.0.0.1:8000/inventory-del/"+item.eq_id+"/"
        fetch(url, {
          method:'DELETE',
          headers:{
            'Content-type': 'application/json',
          }
        }).then((response) => {
            this.fetchDetails()
        }).catch(err=>console.log(err));
        
      }

       enterEditMode = (item) => {
        console.log('in edit mode', item, item.eq_id)
        this.setState({selectedItem: item})
        this.setState({inEditMode: true});
      }

      confirm(item, e) {
        console.log(e);
        this.myFunction(item)
        message.success('Click on Delete');
    }
    
        cancel(e) {
        console.log(e);
        message.error('Click on Cancel');
    }
    
      leaveEditMode = () => {
        this.setState({inEditMode: false});
      }


    tableData() {
      return this.state.equipment.map((item) => {
          return (
             <tr>
                <td>{item.eq_id}</td>
                <td> {item.name} </td>
                <td> {item.price} </td>
                <td> {item.qty} </td>
                <td> {item.model} </td>
                <td> {item.condition} </td>
                <td> <Button type="submit" data-toggle="modal" data-target="#exampleModal" onClick={() => this.enterEditMode(item)}>Edit</Button></td>
                <td> <Popconfirm
                        title="Are you sure delete this record?"
                        onConfirm={() => this.confirm(item)}
                        onCancel={this.cancel}
                        okText="Delete"
                        cancelText="Cancel">
                        <Button danger >Delete</Button> </Popconfirm>
                          </td>
             </tr>
          )
       })
  }

    render() {


        return (
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
                <h4 style={{marginTop:"6%", marginLeft:"5%"}}>INVENTORY</h4>
                </div>
                <div >
                <Card style={{width:"95%",marginLeft:"2.5%", marginTop:"0%"}}>
                <table className = "table table-hover table-borderless" style={{width:"100%"}} >
                    <thead>
                        <tr>
                        <th>ITEM ID</th>
                        <th>ITEM NAME</th>
                        <th>PRICE (Rs.)</th>
                        <th>QUANTITY</th>
                        <th>MODEL</th>
                        <th>CONDITION</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                                      {this.tableData()}
                    </tbody>
                </table>
                </Card><div></div>






                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Inventory Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">

                          <EditForm  selectedItem = {this.state.selectedItem} />

                </div></div></div></div></div>


                <div className='row' style={{marginTop:"7.5%", marginLeft:"40%"}}>
                  <EventFooter />
                </div>
          

            </div>

            

           
        )
    }
}
