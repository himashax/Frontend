import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {Link } from "react-router-dom"

const { Header, Content } = Layout;
const { SubMenu } = Menu;


export default class NavBar extends Component {

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

    render() {

        return (


            <div>
              <div>
                <Menu onClick={this.handleClick} mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2"><Link to="/customer_rental">Rent Equipment</Link>
                    </Menu.Item>
                    <Menu.Item key="3"><Link to="/rental_history">Rental History</Link>
                    </Menu.Item>
                    <Menu.Item key="4"><Link to="/loginPage">Sign In</Link>
                    </Menu.Item>
                    <Menu.Item key="alipay">
                    </Menu.Item>
                  </Menu>
                  </div>
            </div>


        )
    }
}
