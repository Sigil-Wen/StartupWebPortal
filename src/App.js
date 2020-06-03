import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./components/navbar.component";
import StartupList from "./components/startup-list.component";
import EditStartup from "./components/edit-startup.component";
import CreateStartup from "./components/create-startup.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component = {StartupList} /> 
        <Route path="/edit/:id" component = {EditStartup} />
        <Route path="/create" component = {CreateStartup} />
        <Route path="/user" component = {CreateUser} />
      </div>

    </Router>
      
  );
}

export default App;
