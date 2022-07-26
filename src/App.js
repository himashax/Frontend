import React, { Component, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import Rental from './ComponentsHimasha/Rental';
import InventoryItems from "./ComponentsHimasha/InventoryItems";
import RentalDetails from "./ComponentsHimasha/RentalDetails";
import AddItems from "./ComponentsHimasha/AddItems";
import RentalHistory from './ComponentsHimasha/RentalHistory';
import LandingPage from './ComponentsHimasha/LandingPage';
import EqRentedDetails from './ComponentsHimasha/EqRentedDetails';

function App() {
  return (
   <Router>
    <Route component={InventoryItems} path="/inventory"></Route>
      <Route component={AddItems} path="/add"></Route>
      <Route component={Rental} path='/rent' ></Route>
      <Route component={RentalDetails} path='/rental_details'></Route>
      <Route component={RentalHistory} path='/rental_history' ></Route>
      <Route component={LandingPage} path='/customer_rental' ></Route>
     <Route component={EqRentedDetails} path='/eq_rent_det'></Route>
      
    </Router>
  );
}

export default App;
