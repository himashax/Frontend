import React, { Component } from 'react'
import {Form, Button, message} from 'antd';

export default class Editstatus extends Component {

    state = {
        status:'',
    }

    setStatus = (e) => {
        this.setState({status: e.target.value})
        console.log(this.state.status)
    }


    updateStatus = (e) => {
        e.preventDefault()
        const id = this.props.selectedItem.rent_id

        const updatedstatus = {
            status: this.state.status
        }

        fetch( `http://127.0.0.1:8000/update-status/`+id+ `/`, {
            method: 'PATCH',
             headers: {
                     'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedstatus),
         }).then(res => console.log(res)).catch(err => console.log(err))
        
        
         console.log('test', updatedstatus.status)
        
    }

    reload = () => {
        window.location.reload(false)
    }


    render() {
        return (
            <div>
               <form onSubmit = {this.updateStatus}>
                   <input type= "text" defaultValue={this.props.selectedItem.status} onChange={this.setStatus} name = "status"/>
                   <Button type="primary" onClick={this.props.onokay} style={{marginTop:"20px"}} htmlType="submit">Edit</Button>
                   <Button type="primary" onClick={this.reload} style={{marginTop:"20px",marginLeft:"3%"}} htmlType="submit">Done</Button>
                </form>
            </div>
        )
    }
}
