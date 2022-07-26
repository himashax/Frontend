import React, { Component } from 'react'
import dash_image from './Images/illustration.png'
import search from './Images/search.png'
import Rental from './Rental'
import NavBar from './NavBar'
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


export default class LandingPage extends Component {

    scrollToBottom() {
        scroll.scrollToBottom();
    }

        scrollTo = () =>{
            scroller.scrollTo('test2', {
                smooth: true,
            })
        }

    render() {
        return (
            <div>
                <NavBar />
            <div className="row">
            
                <div className="col-2" style={{background:"#cadbcf"}}>
                <p style={{fontFamily:"Comic Sans MS", fontStyle:"italic", marginTop:"130%", marginLeft:"10%"}} >
                    The number of lines in a paragraph depends on the size of the browser window. 
                    If you resize the browser window, the number of lines in this paragraph will change...
                    </p>

                    <img  src={search} style={{marginLeft:"0%", marginTop:"10%"}} />
                   <p></p>
                   <br></br>
                   <p></p>

                </div>
                <div className="col-5" > 
                       <h1   style={{color:"black" , fontFamily:"Comic Sans MS" ,marginTop:"30%"}}>Happy Renting!!! </h1>

                <p style={{color:"black" , fontFamily:"Comic Sans MS",  marginTop:"5%", marginLeft:"10%"}} >
                    ...The number of lines inhe number of lines in a paragraph depends on the size of the browser window a paragraph depends on the size of the browser window. 
                    If you resize the browser window, the number of lines in this paragraph will change.
                    The number of lines in a paragraph depends on the size of the browser window. </p>

                    <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={this.scrollTo} style={{width:"50%", marginTop:"5%"}}>Send Me there!</button></div>
               

                </div>

                <div className="col-5">
                   
                        <img  src={dash_image} style={{marginLeft:"5%", marginTop:"10%"}} />
                        
                </div>
                </div>

            <div className="row">
                <Element name="test2" className="element">
                
                <Rental />
                
                </Element>
               
            </div>

            </div>
        )
    }
}
