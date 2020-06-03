import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class CreateStartup extends Component {
    constructor(props){
        super(props);

        //makes sure that the this reffered ineach is the state of the class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeEvaluation = this.onChangeEvaluation.bind(this);
        this.onChangeFounding = this.onChangeFounding.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            username: '',
            description:'',
            evaluation:'',
            founding: new Date(),
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user =>user.username), //mongo db stores each user object in an array
                    username: response.data[0].username //default username
                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        }) // setState method
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        }) // setState method
    }
    onChangeEvaluation(e){
        this.setState({
            evaluation: e.target.value
        }) // setState method
    }
    onChangeFounding(founding){
        this.setState({
            founding: founding
        }) // setState method
    }

    onSubmit(e) {
        e.preventDefault(); //prevents default html form

        const startup = {
            username: this.state.username,
            description: this.state.description,
            evaluation: this.state.evaluation,
            founding: this.state.founding
        }
        console.log(startup)
        axios.post('http://localhost:5000/startup/add', startup)
        .then(res => console.log(res.data));

        window.location = "/"; //takes user back to original list
    }
    
    render(){
        return(
        <div>
            <h3>Create Your Startup</h3>
            <form onSubmit={this.onSubmit}>
                <div className= "form-group">
                    <label>Username:</label>
                    <select ref="userInput"
                    required
                    className="form-control"
                    value = {this.state.username}
                    onChange = {this.onChangeUsername}>
                    {
                        
                            this.state.users.map(function(user) {
                                return <option 
                                  key={user}
                                  value={user}>{user}
                                  </option>;
                              })

                          
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text"
                    required
                    className = "form-control"
                    value = {this.state.description}
                    onChange = {this.onChangeDescription} />
                </div>
                <div className="form-group">
                    <label>Evaluation:</label>
                    <input type="text"
                    required
                    className = "form-control"
                    value = {this.state.evaluation}
                    onChange = {this.onChangeEvaluation} />
                </div>
                <div className="form-group">
                    <label>Founding:</label>
                    <DatePicker selected = {this.state.founding}
                    onChange = {this.onChangeFounding}
                        />
                </div>
                <div className = "form-group">
                    <input type = "submit" value = "Create Startup" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}