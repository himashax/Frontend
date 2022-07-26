import React, { Component } from 'react'
import {Card, Modal} from 'antd';
import Editstatus from './Editstatus'
import 'antd/dist/antd.css';
import { Layout, Menu, notification,Button, Popconfirm,message } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

export default class RentalDetails extends Component {
    
    state = {
        rentalDetails: [],
        visible:'',
        selectedItem:''
    }

    componentDidMount() {
        this.fetchRentalDetails()
    }
    
    fetchRentalDetails() {
        fetch('http://127.0.0.1:8000/rentalDetails/')
        .then(response => response.json())
        .then(data =>this.setState({rentalDetails:data}))
        .then(() => {
            fetch('http://127.0.0.1:8000/update-on-ret/')
            .then(response => response.json())
        })            
    }

   

    showModal = (details) => {
        this.setState({
          visible: true,
          selectedItem: details,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        window.location.reload(false)
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };


      deleteRental = (id) => {
        console.log(id)
        var url="http://127.0.0.1:8000/del-allAndEdit/"+id+"/"
        fetch(url, {
            method:'DELETE',
            headers:{
            'Content-type': 'application/json',
            }
        }).then((response) => {
            this.fetchRentalDetails()
        }).catch(err=>console.log(err));
  }

      confirm(id, e) {
        console.log(e);
        this.deleteRental(id)
        message.success('Click on Delete');
      }
    
        cancel(e) {
        console.log(e);
        message.error('Click on Cancel');
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


                <div className="row" >
                    <div className="col-12">
                        <h4 style={{marginTop:"7%", marginLeft:"3%"}}>RENTAL DETAILS</h4>
                <Card style={{marginLeft:"5%", width:"90%", marginTop:"2%"}}>
                 <table className= "table table-hover table-borderless"  style={{width:"100%"}}>
                    <thead>
                        <tr>
                        <th>RENTAL ID</th>
                        <th>RENTAL DATE</th>
                        <th>RENTAL PERIOD</th>
                        <th>STATUS</th>
                        <th>TOTAL PRICE</th>
                        <th>TOTAL QUANTITY</th>  
                        <th>CUSTOMER</th> 
                        </tr>
                    </thead>
                    <tbody  >
                        {this.state.rentalDetails.map((r_details) => {
                        const {rent_id, rental_date, rental_period, status, price, qty, customer_id} = r_details
                        return (
                        <tr const id = {false}>
                            <td> {rent_id} </td>
                            <td> {rental_date} </td>
                            <td> {rental_period} </td>
                            <td> {status} </td>
                            <td> {price} </td>
                            <td> {qty} </td>
                            <td> {customer_id} </td>
                            <td> <Button onClick={() => this.showModal(r_details)} type="primary">Edit Status</Button> </td>
                            <td> <Popconfirm
                                  title="Are you sure delete this record?"
                                  onConfirm={() => this.confirm(rent_id)}
                                  onCancel={this.cancel}
                                  okText="Delete"
                                  cancelText="Cancel">
                                  <Button danger >Delete</Button> </Popconfirm>
                                    </td>
                        </tr>
                    )
                })
                    }
                    </tbody>
                </table>
                </Card>
                
                <Modal
                    title="Edit Rental Status"
                    visible={this.state.visible}
                    footer={null}
                    width={400}
                    onCancel={this.handleCancel}>

                            <Editstatus  
                            selectedItem = {this.state.selectedItem}
                            onokay = {this.handleOk}
                            />
                </Modal>
                </div></div>
            </div>
        )
    }
}
