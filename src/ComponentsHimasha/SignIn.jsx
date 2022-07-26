import React, { Component } from 'react'
import { Card, Button, Checkbox } from 'antd';
import NavBar from './NavBar'

export default class SignIn extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>
                    <Card  style={{width:"50%", marginTop:"10%", marginLeft:"10%"}}>
                    <form  style={{width:"100%"}}>
                        <input type="text" name="" id=""/>
                        <input type="text" name="" id=""/>
                        <Button htmlType ="submit" ></Button>
                    </form>
                    </Card>
                </div>
            </div>
        )
    }
}