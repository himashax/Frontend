import React, { Component } from 'react'
import { Card, Button } from 'antd';

export default class EditForm extends Component {

    state = {
        name:'',
        price:'',
        qty:'',
        model :'',
        condition:'',
        availability:'',
        }

    formData = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    refreshPage() {
        window.location.reload(false);}

    handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            name:[{}],
            price:[{}],
            qty:[{}],
        });
    };
        
    submitData = (e) => {
      e.preventDefault()

      const {eq_id, name, price, qty, model, condition, availability} = this.props.selectedItem
      
          const updatedEq = {
              name:this.state.name || name,
              price: this.state.price || price ,
              qty : this.state.qty || qty,
          }

          const updatedInven = {
              model: this.state.model || model,
              condition: this.state.condition || condition,
              availability: this.state.availability || availability,
          }

          fetch( `http://127.0.0.1:8000/equipment-update/`+eq_id+ `/`, {
          method: 'PATCH',
           headers: {
                   'Content-Type': 'application/json',
           },
           body: JSON.stringify(updatedEq),
       }).then(res => console.log(res)).catch(err => console.log(err)).then(()=>{
        fetch( `http://127.0.0.1:8000/inven-update/`+eq_id+ `/`, {
            method: 'PATCH',
             headers: {
                     'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedInven),
         })
       })
        
       
       console.log(updatedEq)

       //this.refreshPage()
       //this.handleReset()
    }

 
    render() {     
        const {name, price, qty, model} = this.props.selectedItem
        return (
            <div>
            <form onSubmit={this.submitData}>
              Item Name <input type="text" name="name"  onChange={this.formData} defaultValue={name} />
              Price<input type="text" name="price" onChange={this.formData} defaultValue={price} />
              Quantity<input type="text" name="qty" onChange={this.formData}  defaultValue={qty} />
              Model <input type="text" name="model" onChange={this.formData}  defaultValue={model} />

              Condition || New <input type="radio" className="ml-2" onChange={this.formData} name="condition" value="New"/>
                        Used <input type="radio" className="ml-2"  onChange={this.formData} name="condition" value="Used" />
                  
                        <div className="mt-3">
                Availability || Available <input type="radio"  onChange={this.formData} name="availability" className="ml-2" value="Available"/>
                Unavailable <input type="radio"  onChange={this.formData} name="availability" className="ml-2" value="Unavailable" /></div>
              <div class="modal-footer">

              <Button htmlType="submit" >Save changes</Button>
              <Button type="button"  onClick={this.refreshPage}>Done</Button>          
              </div>
            </form>
        
           </div>
        )
    }
}
