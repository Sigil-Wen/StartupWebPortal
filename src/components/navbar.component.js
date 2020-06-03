import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className ="navbar-brand">Spark Accelerator</Link> 
                <div className="collapase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Startups</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create a Startup</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Sign up</Link>
                        </li>
                    </ul>
                </div>



            </nav>
        );
    }
} 