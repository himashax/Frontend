import React, { Component } from 'react'
import EquipmentRental from './EquipmentRental'
import 'antd/dist/antd.css';
import {Button, notification ,message, Card} from 'antd';
import EventFooter from '../ComponentsAkila/EventFooter'

import * as Scroll from 'react-scroll';
import NavBar from './NavBar'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const cryptoRandomString  = require("crypto-random-string");


export default class Rental extends Component {

    state = {
        equipments:[],
        selectedItems: [],
        name:'',
        quantity:'',
        price:'',
        eqp_id:'',
        isChecked:false,
        status:false,
        total_price:'',
        res:'',
    }

    componentDidMount() {
        this.fetchEquipments()
        this.fetchSelectedItems()
    }
    
    fetchEquipments() {
        console.log('fetching equipment data')
        fetch('http://127.0.0.1:8000/get-eq-inven/')
        .then(response => response.json())
        .then(data =>
            this.setState({
                equipments:data}))            
    }

    fetchSelectedItems(){
        console.log('fetching rental data')

        if(this.state.status == false){
            fetch('http://127.0.0.1:8000/rental-by-id/himasha/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    selectedItems:data}))
        }
    }

    deleteRental = (id) => {
        console.log(id)
        var url="http://127.0.0.1:8000/delete-rental/"+id+"/"
        fetch(url, {
            method:'DELETE',
            headers:{
            'Content-type': 'application/json',
            }
        }).then(() => {
            this.setState({selectedItems: this.state.selectedItems.filter(item => item.id !== id)})
        });
    }
    
    getQuantity = (p, id, name, event) => {
        const qty = event.target.value
        const item_price = p*qty
    
            this.setState({
                name: name,
                quantity: qty,
                price: item_price,
                eqp_id: id, })

        console.log('total price : ' + item_price)
        console.log( 'price:' + p, 'added item:'+ id, 'quantity:'+ qty, 'name'+ name)
        
    }

    handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        this.setState({
          quantity: [{}]
        });
    };

    addEquipments = (event) => {
        
        const {name, quantity, price, eqp_id} = this.state
        const select_rentItem = {
            rent_equipment_id: 'REID' + cryptoRandomString({ length:5 }),
            name: name,
            quantity: quantity,
            price: price,
            customer_id:'himasha',
            equipment_id: eqp_id,
        }

        var url = 'http://127.0.0.1:8000/create-rental/'
        var url_updateQty = 'http://127.0.0.1:8000/qty-update/' + select_rentItem.rent_equipment_id +'/'

        fetch(url, {
            method:'POST',
            headers:{
            'Content-type': 'application/json',
            },
            body:JSON.stringify(select_rentItem)
        }).then(response => response.json())
          .then(select_rentItem => {
            this.setState({selectedItems: this.state.selectedItems.concat([select_rentItem])});
            this.calTotalPrice()

        }).then(() => {
            fetch(url_updateQty)
            .then(response => response.json()).then( result => this.setState({res: result}))
        })

        console.log('selected Item :', select_rentItem)
        
        this.handleReset()
        this.calTotalPrice()
    } 

    submitData = (e) => {
        e.preventDefault()

        const {quantity} = this.state

        if(this.state.selectedItems.length + 1 <= 7){
            
            if(!quantity || isNaN(quantity)){
                message.error({content: 'Please Enter Quantity',
                className: 'custom-class',
                style: {
                marginTop: '20vh',
                marginLeft: '100vh',
                },}, 1); 

            }else if(quantity <= 0){
                message.error({content: 'Quantity should be positive',
                className: 'custom-class',
                style: {
                marginTop: '20vh',
                marginLeft: '100vh',
                },}, 1); 

            }else{
                
                this.addEquipments()
                this.openNotificationWithIcon('success')

            }

        }else{
            {this.openNotificationWithIcon('warning')}
        }
    }


    deleteRental = (id) => {
        console.log(id)
        var url="http://127.0.0.1:8000/qty-update-on-del/"+id+"/"
        fetch(url, {
            method:'DELETE',
            headers:{
            'Content-type': 'application/json',
            }
        }).then((response) => {
            this.fetchSelectedItems()
        }).catch(err=>console.log(err));
  }

    calTotalPrice = () => {
        const total = this.state.selectedItems.reduce((totalPrice, item) => totalPrice + item.price, 0);
        console.log( 'cal total price' ,total)

        this.setState({total_price:total})
    }

    openNotificationWithIcon = type => {
        notification[type]({
        message: 'Successfully Added',
        description:
            'Add More Items Continue. Or Fill the required data to rent Items',
        });
    };

    scrollToBottom() {
        scroll.scrollToBottom();
    }

    scrollTo = () =>{
        scroller.scrollTo('direct', {
            smooth: true,
        })
    }


    render(){
        
        return(
            <div>
                <div className="row">
                    <div className="col-md-12"  >
                        <h3 style={{marginLeft:"4%", marginTop:"2%"}}>Equipment Rental</h3>
                        
                        <Card style={{width:"95%",marginLeft:"3%", marginTop:"30px" }}>
                        <table className= "table table-hover table-borderless"  style={{width:"100%"}}>
                            <thead>
                                <tr >
                                    {/* <th> ID </th> */}
                                    <th> NAME </th>
                                    <th> PRICE </th>
                                    <th> MODEL </th>
                                    <th> CONDITION </th>
                                    <th> QUANTITY </th>
                                    
                                </tr>
                            </thead>
                            <tbody  >
                                {this.state.equipments.map((item) => {
                                const {eq_id, name, price, model, condition, availabilty} = item
                                return (
                                <tr  >
                                    {/* <td> {eq_id} </td> */}
                                    <td> {name} </td>
                                    <td> {price} </td>
                                    <td> {model} </td>
                                    <td> {condition} </td>
                                    <td> <input type="number" name="quantity" className="form-control ml-2 input-sm" style={{width:"90px"}}
                                            onChange={this.getQuantity.bind(this, price, eq_id, name)}/>
                                    </td>
                                    <td><form onSubmit={this.submitData}>
                                            <button type="submit" className="btn btn-primary btn-sm">Select Item</button>
                                        </form>
                                    </td>
                                </tr>)})}
                            </tbody>
                        </table></Card>
                    </div>

                   
                    <Button  onClick={this.scrollTo} style={{width:"80%", marginLeft:"10%", marginTop:"3%"}}>Show Details</Button>

                    <div className="row" >
                    <Element name="direct">
                        <EquipmentRental 
                        selected_item = {this.state.selectedItems} 
                        deleteRental = {this.deleteRental} />
                    </Element>
                    </div>


                </div>

                <div className='row' style={{marginTop:"10%", marginLeft:"40%"}}>
                  <EventFooter />
                </div>
          
            </div>
        )
    }
}
