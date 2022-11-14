//TODO: Fix AddUser so that it can edit IDs on users that lost their cards (function below is broken)
import axios from "axios";
import React from "react";
import { addUser, getUserEmail, editUser } from '../APIRoutes.js';
import './addUser.css';
import Inputs from '../UsedComponents/Inputs.js';
import { NavLink } from 'react-router-dom';
//import './DarkMode.css';


export default class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            successful: false,
            id: '',
            name: '',
            email: '',
            splashID: '',
            authID: '',
            errors: [
                ["name", ' '],
                ["email", ' '],
                ["splashID", ' '],
                ["id", ' '],
                ["authID", ' '],
            ],
            lastRFID:props.lastRFID,
            firstScan: true
        }     

        this.handleCallBack = this.handleCallBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // takes the input from the <Inputs />
    handleCallBack(variable, value) {
        this.setState({
            [variable]: value,
        })
    }
    static getDerivedStateFromProps(props, state) {
        state = {...state, lastRFID: props?.lastRFID}
        return state;
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevState?.lastRFID !== this.state?.lastRFID) {
            if(this.state.firstScan) {
                this.handleCallBack('id', this.state.lastRFID);
                this.setState({firstScan: false, lastRFID: ''});
            }
            else{
                this.handleCallBack('authID', this.state.lastRFID);
                this.setState({firstScan: true, lastRFID: ''});
            }
        }
      }
      componentWillUnmount() {
        this.setState({
          lastRFID: ''
        })
        this.props.setLastRFID('');
      }
    // First checks if all values have been filled, then submits if so
    handleSubmit() {
        if (!this.state.name || !this.state.email || !this.state.splashID || !this.state.id || !this.state.authID) { 
            this.handleErrors();
        } else {
            axios(getUserEmail(this.state.email))
                .then((res, err) => {
                    if (err) {
                        console.log(err);
                    } else if (res.data) {
                        console.log(res.data);
                        //TODO: below causes an issue "PUT, 400 Bad Request"
                        axios(editUser(res.data.id, {id: this.state.id}, this.state.authID))
                            .then((response, error) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    this.setState({
                                        successful: true,
                                    })
                                }
                            })
                    } else {
                        axios(addUser({
                            id: this.state.id,
                            name: this.state.name,
                            email: this.state.email,
                            splash: parseInt(this.state.splashID),
                            authID: this.state.authID,
                        }))
                        .then((response, error) => {
                            if (error) {
                                console.log("Error creating user");
                            } else {
                                console.log("User created successfully!");
                                this.setState({
                                    successful: true,
                                })
                            }
                        })
                    }
                })
            this.setState({
                name: '',
                email: '',
                id: '',
                splashID: '',
                authID: '',
                errors: [
                    ["name", ' '],
                    ["email", ' '],
                    ["splashID", ' '],
                    ["id", ' '],
                    ["authID", ' '],
                ],
            })
        }
    }
    // sets the error messages, prompted by handleSubmit()
    handleErrors() {
        var errs = this.state.errors;
        errs[0][1] = this.state.name === '' ? 'Please enter a name: ' : ' ';
        errs[1][1] = this.state.email === '' ? 'Please enter an email: ' : ' ';
        errs[2][1] = this.state.splashID === '' ? 'Please enter a splashID: ' : ' ';
        errs[3][1] = this.state.id === '' ? 'Please enter the Makerspace ID: ' : ' ';
        errs[4][1] = this.state.authID === '' ? 'Please enter an authID: ' : ' ';
        this.setState({
            errors: errs,
        })
    }
    render() {
        if (this.state.successful) {
            return (
                <div>
                  <h1 id="text">Successfully Added User!</h1>
                  <NavLink to="/">
                    <button className="doneButton">Go Back</button>
                  </NavLink>
                </div>
              )
          }
        return (
            <div className="container-center">
                
                <div id="error-container">
                    {this.state.errors.map((error) => (
                        <h3 id="error" key = {error}>{error[1]}</h3>
                    ))}
                    
                </div>
                <div id="container">
                    
                    <div>
                        <Inputs
                            className="nameInputBox"
                            id='input2'
                            placeholder="Name"
                            value={this.state.name}
                            variable="name"
                            parentCallBack={this.handleCallBack}
                            onKeyPress={this.handleSubmit}
                            />
                    </div>
                    <div>
                        <Inputs
                            className="nameInputBox"
                            id="input2"
                            placeholder="Tulane Username "
                            value={this.state.email}
                            variable="email"
                            parentCallBack={this.handleCallBack}
                            onKeyPress={this.handleSubmit}
                            />
                    </div>
                    <div>
                        <Inputs
                            className="nameInputBox"
                            id="input2"
                            placeholder="Splash ID"
                            value={this.state.splashID}
                            variable="splashID"
                            parentCallBack={this.handleCallBack}
                            onKeyPress={this.handleSubmit}
                            />
                    </div>
                    <div>
                        <Inputs
                            className="nameInputBox"
                            id="input2"
                            placeholder="New Makerspace ID"
                            value={this.state.id}
                            variable="id"
                            parentCallBack={this.handleCallBack}
                            onKeyPress={this.handleSubmit}
                            />
                    </div>
                    <div>
                        <Inputs
                            className="nameInputBox"
                            id="input2"
                            placeholder="Authorized FabTech ID"
                            value={this.state.authID}
                            variable="authID"
                            parentCallBack={this.handleCallBack}
                            onKeyPress={this.handleSubmit}
                            />
                    </div>
                    <div>
                    <button className = "submitButton2" onClick={() => this.handleSubmit()}>Submit</button>
                </div>
                </div>
                
            </div>
        );
    }
}
