import React, { Component } from 'react'
import 'antd/dist/antd.css';
import {Input , Modal, Button } from 'antd';


export default class EqRentedDetails extends Component {

    state = {
        EqRentedDetails:[],
        name:'',
        price:'',
        qty:'',
        supplier:'',
        rental_date:'',
        rental_period:'',
        loading: false,
        visible: false,
    }

    componentDidMount(){
        this.fetchDetails()
    }

    fetchDetails(){
        fetch('http://127.0.0.1:8000/get-eq-rent/')
        .then(response => response.json())
        .then(data => 
          this.setState({
            EqRentedDetails:data
          }) 
    )}

    getInputData = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log('supp', this.state.supplier)
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = ( e) => {
        e.preventDefault()
       
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      

     submitData = (e) => {
        
  
        const {eq_id, name, price, qty, supplier, rented_date, rental_period} = this.state.EqRentedDetails
        
            const updatedEq = {
                name:this.state.name || name,
                price: this.state.price || price ,
                qty : this.state.qty || qty,
            }

            const updatedRItem = {
                supplier: this.state.supplier || supplier,
                rented_date: this.state.rental_date || rented_date,
                rental_period: this.state.rental_period || rental_period
            }
  
            const eq_url = 'http://127.0.0.1:8000/equipment-update/'
            const rItem_url =  'http://127.0.0.1:8000/update-rend-items/'

            fetch( `http://127.0.0.1:8000/equipment-update/`+ eq_id + `/`, {
             
            method: 'PATCH',
             headers: {
                     'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedEq),
         }).then(res => console.log(res)).catch(err => console.log(err))


         fetch( `http://127.0.0.1:8000/update-rend-items/`+ eq_id + `/`, {
             
            method: 'PATCH',
             headers: {
                     'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedRItem),
         }).then(res => console.log(res)).catch(err => console.log(err))
         .then(newEqRent => {
            const newEqRents = this.state.EqRentedDetails.map(eqRent => {
                if(eqRent.eq_id === newEqRent.eq_id) {
                    return Object.assign({}, newEqRent)
                } else {
                    return eqRent;
                }
            });
            this.setState({EqRentedDetails: newEqRents});
        });


         console.log(updatedRItem)
  
         //this.handleReset()
      } 

   
    render() {
        const { visible, loading } = this.state
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.EqRentedDetails.map((rItem) => {
                            const {eq_id, name, price, qty, supplier, rented_date, rental_period} = rItem
                            return (
                                <tr>
                                    <td>{eq_id}</td>
                                    <td>{name}</td>
                                    <td>{price} </td>
                                    <td> {qty} </td>
                                    <td> {supplier} </td>
                                    <td> {rented_date} </td>
                                    <td>{rental_period} </td>
                                    <td> <button onClick={() => this.showModal(rItem)}>rfrfrgrg</button> <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                        Return
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                        Submit
                        </Button>,
                    ]}
                    >
                <form onSubmit={this.submitData} >
                <Input  type="text" name="name" onChange={this.getInputData} /><br></br>
                <Input  type="text" name="price"  onChange={this.getInputData}/>
                <Input  type="text" name="qty"  onChange={this.getInputData}/>
                <Input  type="text" name="supplier"  onChange={this.getInputData}/>
                <Input  type="date" name="rental_date"  onChange={this.getInputData}/>
                <Input  type="text" name="rental_period"  onChange={this.getInputData}/>
                <button type="submit">Add Equipment</button>
                </form>
                    </Modal>

                                         </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Button type="primary" onClick={this.showModal}>
                    Open Modal with customized footer
                    </Button>
                   

            </div>
        )
    }
}
