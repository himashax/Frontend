import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import adminn from './Images/admin.png'
import 'antd/dist/antd.css';

import {Button, Popconfirm,notification, message, Card} from 'antd';

const cryptoRandomString  = require("crypto-random-string");

export default class EquipmentRental extends Component {

    state = {
        price:'',
        rental_date:'',
        rental_period:'',
        status:'',
        qty:'',
        total_price:''
    }
  
 
    delete = (id) => {
        this.props.deleteRental(id)
    }

    getInputDetails = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    
    validateInputFields = (e) => {
        e.preventDefault()

        var items = this.props.selected_item
        const {rental_date, rental_period} = this.state

        if(!items.length){
            this.openNotificationWithIcon('warning')

        }else if(!rental_period || isNaN(rental_period)){
            message.error( 'Please Enter Rental Period',1);

        }else{
            
            this.handleRentalSubmit(e)

        }     
    }

    handleRentalSubmit = (event) => {
        //event.preventDefault()

        const total = this.props.selected_item.reduce((totalPrice, item) => totalPrice + item.price, 0);
        console.log(total)
        const quantity = this.props.selected_item.reduce((qty, item) => qty + item.quantity, 0);
        console.log(quantity)

        const rentalDetails = {
          rent_id: "RID" + cryptoRandomString({ length:5 }),
          rental_date: this.state.rental_date,
          rental_period:this.state.rental_period,
          status:'Pending',
          price:total,
          qty:quantity,
          customer_id:'himasha',
      }

        var result = window.confirm('Total Price :' + total + '  Total Quantity : ' + quantity + ' Do you want to confirm Renting?')
        if(result){

        var url = 'http://127.0.0.1:8000/add-rental-details/'
        fetch(url, {
            method:'POST',
            headers:{
            'Content-type': 'application/json',
            },
    
            body:JSON.stringify(rentalDetails)
        }
        );
        console.log('rental details', rentalDetails)

        this.handleReset()
    }
    }

    handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
        );
        this.setState({
            rental_date:[{}],
            rental_period:[{}],
        });
    };

    confirm(id, e) {
        console.log(e);
        this.delete(id)
        message.success('Click on Delete');
    }
    
        cancel(e) {
        console.log(e);
        message.error('Click on Cancel');
    }

    openNotificationWithIcon = type => {
        notification[type]({
        message: 'Alert',
        description:
            'Please select Items before renting',
        });
    };

    render() {
        return (
            <div>
                    <div className="row">
                        <div className="col-8" style={{marginTop:"10%"}}><Card style={{marginLeft:"22%", height:"120%"}}>
                            <table className= "table table-hover table-borderless" >
                                <thead>
                                    <tr>
                                        <th>ITEM NAME</th>
                                        <th>PRICE</th>
                                        <th>QUANTITY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.selected_item.map((s_item => {
                                    const{rent_equipment_id, name, price, quantity, customer_id} = s_item
                                    return (<tr>
                                        {/* <td> {rent_equipment_id} </td> */}
                                        <td>{name}</td>
                                        <td>{price}</td>
                                        <td>{quantity}</td>
                                        {/* <td> {customer_id} </td> */}
                                        <td><Popconfirm
                                                title="Are you sure delete this task?"
                                                onConfirm={() => this.confirm(rent_equipment_id)}
                                                onCancel={this.cancel}
                                                okText="Delete"
                                                cancelText="Cancel">
                                                <button type="primary" className="btn btn-danger btn-sm">Delete</button> </Popconfirm>
                                        </td>
                                    </tr>)
                                }))
                                }
                                </tbody>
                            </table></Card>
                        </div>
                        
                        <div className="col-4" >
                        <div class="card" style={{width:"100%", marginLeft:"10%", marginTop:"35%"}}><div class="card-body">
                            <form onSubmit={this.validateInputFields}  style={{width:"100%"}}>

                            <div className="form-row">
                                <div className="col">
                                Date<input type="date" name="rental_date" onChange={this.getInputDetails} className="form-control"/><br></br>
                                </div>
                                <div className="col">
                                Rental Period <input type="text" name="rental_period" onChange={this.getInputDetails} className="form-control"/>
                                </div>
                            </div>

                            <div className="form-row mt-3" >
                                <div className="col">
                            
                                    <Button type="primary" htmlType="submit">Rent Equipment</Button>
                                 
                                
                            
                                </div>
                            </div>
                            <img  src={adminn} style={{ marginTop:"35%"}}/>
                            </form>
                                
                            </div></div>
                        </div>
                    </div>
               
            </div>
        )
    }
}
