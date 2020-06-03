import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'


const Startup = props => ( //functional component
    <tr>
    <td>{props.startup.username}</td>
    <td>{props.startup.description}</td>
    <td>{props.startup.evaluation}</td>
    <td>{props.startup.founding.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.startup._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStartup(props.startup._id) }}>delete</a>
    </td>
  </tr>
)


export default class StartupList extends Component {
    constructor(props){
        super(props);

        this.deleteStartup = this.deleteStartup.bind(this)
        this.state = {startups: []}
    }

    //runs once all of the elements of the page are rendered
    componentDidMount(){
        axios.get('http://localhost:5000/startup/')
        .then(response =>{
            this.setState({startups: response.data})
        })
        .catch((error) =>{
            console.log(error);
        })
    }
    deleteStartup(id){  //deletes object id
        axios.delete('https://localhost:5000/startup/'+id)
        .then(res => console.log(res.data))
        this.setState({
            startups: this.state.startups.filter(el => el._id != id)//_id is created in the database
        })
    }
    startupList() {
        return this.state.startups.map((currentstartup) => {
          return <Startup startup={currentstartup} deleteStartup={this.deleteStartup} key={currentstartup._id}/>;
        })
      }
    
    render(){
        return(
            <div>
            <h3>Portfolio Startups</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.startupList() }
              </tbody>
            </table>
          </div>
        )
    }
}