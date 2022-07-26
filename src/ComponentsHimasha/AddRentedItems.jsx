import React, { Component } from 'react'
import axios from "axios" 

const cryptoRandomString  = require("crypto-random-string");
export default class AddRentedItems extends Component {

    state = {
        eq_id: "EQP" + cryptoRandomString({length:5}),
        name:'',
        price:'',
        qty:'',
        admins:[],
        admin_id:'',
        supplier:'',
        rental_date:'',
        rental_period:'',
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

    getInputData = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log('supp', this.state.supplier)
    }

    submitRentedData = (e) => {
        e.preventDefault()

        const equipObj = {
            eq_id: this.state.eq_id,
            name: this.state.name,
            price: this.state.price,
            qty: this.state.qty,
            admin_id: this.state.admin_id,
        }

        const rentedObj = {
            rented_item_id: equipObj.eq_id,
            supplier: this.state.supplier,
            rental_date: this.state.rental_date,
            rental_period: this.state.rental_period,
        }

        var url_eq = 'http://127.0.0.1:8000/equipment-create/'
        var url_rented = 'http://127.0.0.1:8000/add-rented-items'
        
        fetch(url_eq, {
          method:'POST',
          headers:{
            'Content-type': 'application/json',
          },
          body:JSON.stringify(equipObj)
        }).then(()=>{
          fetch(url_rented, {
          method:'POST',
          headers:{
            'Content-type': 'application/json',
          },
          body:JSON.stringify(rentedObj)
        })});

        console.log('eq test', equipObj)
        console.log('r item test', rentedObj)
        this.handleReset()
    }

    handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        this.setState({
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitRentedData}>
                <input type="text" name="name" onChange={this.getInputData} />
                <input type="text" name="price"  onChange={this.getInputData}/>
                <input type="text" name="qty"  onChange={this.getInputData}/>
                <input type="text" name="supplier"  onChange={this.getInputData}/>
                <input type="date" name="rental_date"  onChange={this.getInputData}/>
                <input type="text" name="rental_period"  onChange={this.getInputData}/>
                Admin
                    <select onChange= {this.getInputData} name="admin_id" required>
                    <option selected>Choose Admin...</option>
                      {this.state.admins.map((a) => {
                        return <option value={a.id}>{a.username}</option>;
                      })}
                    </select>
                    <button type="submit">Add Equipment</button>
                </form>
            </div>
        )
    }
}
