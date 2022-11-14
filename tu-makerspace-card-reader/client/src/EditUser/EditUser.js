import axios from 'axios';
import React from 'react';
import './EditUser.css';
import { NavLink } from "react-router-dom";
import { getUser, editUser, getUserEmail, verifyUser } from '../APIRoutes.js';
import Inputs from '../UsedComponents/Inputs.js';
import DisplayChecks from './DisplayChecks.js';
//import { CheckBox } from '@material-ui/icons';

// if admin makes someone fabtech, they must set a password

// only displays the done button if a user was found
function ConditionalButton(props) {
    if (props.trainings.length !== 0) {
        return (
            <div>
                <NavLink to="/">
                    <button className="BetterButton" id="submit">Done</button>
                </NavLink>
            </div>
        )
    } else {
        return null;
    }
}

function RenderEditPassword(props) {
    
    if (props.isAdmin && !props.hasPassword && props.userIsFabTech) {
        return (
            <div>
                <Inputs
                    type="password"
                    className="BoxInput"
                    id="small-input"
                    placeholder="Create Password"
                    value={props.createdPassword}
                    variable="createdPassword"
                    parentCallBack={props.handleCallBack}
                />
                <button className="BetterButton" onClick={() => props.handleCreatePassword()}>Submit</button>
            </div>
        )
    } else if (props.isAdmin && props.userIsFabTech) {
        return (
            <button className="BetterButton" id="biggerButton" onClick={() => props.handleCreatePassword()}>Edit Password</button>
        )
    }
    return null;
}

export default class EditUser2 extends React.Component {
    constructor(props) {
        super(props);
        //EXAMPLE USErTRAININGS ARRAY
        // [ ["lathe", 0],
        // ["metal1", 1],
        // ["metal2", 0],
        // ["mill", 1],
        // ["waterjet", 0],
        // ["wood1", 1],
        // ["wood2", 1] ]

        this.state = ({
            id: '',
            idINT: NaN,
            authID: '',
            authPassword: '',
            user: {},
            userTrainings: [],
            userIsFabTech: false,
            fabTechID: '',
            isFabTech: false,
            isAdmin: false,
            hasPassword: false,
            createdPassword: '',
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleCallBack = this.handleCallBack.bind(this);
        this.toggleFabTech = this.toggleFabTech.bind(this);
        this.handleCreatePassword = this.handleCreatePassword.bind(this);
        this.handleFabTechCheck = this.handleFabTechCheck.bind(this);
    }
    

    // only allows a valid FabTech ID to access the editing page
    // may later remove the input of a fabtech ID on the editing page and only require password (Note from bennett: instead of removing it we should just autofill)
    handleFabTechCheck() {
        const ID = this.state.fabTechID;
        const pass = this.state.authPassword;
        console.log("HELLO");
        axios(verifyUser(ID, pass))
            .then((response, error) => {
                if (error) {
                    console.log("Error verifying user");
                }
                else {
                    //console.log(response.data);
                    if (response.data.message === true) {
                        console.log('FABTECH');
                        
                        this.setState({
                            isFabTech: response.data.isFabTech,
                            isAdmin: response.data.isAdmin,
                            fabTechID: ID,
                            authID: ID,
                        })
                    }
                }
            })
    }
    
    // finds the user to display
    handleFindUser(ID) {
        console.log(this.state.hasPassword)
        if (ID) {
            const id = ID;
            var trainings;
    
            if (id.charAt(0)==='0' || id.charAt(0) === '1') { // if id is an id (opposed to an email)
                axios(getUser(id)).then((response, error) => {
                    if (error) {
                        console.log('Error finding User');
                    } else {
                        console.log(response.data);
                        this.setState({
                            user: response.data,
                            idINT: id,
                            userIsFabTech: response.data.fabTech,
                            hasPassword: response.data.password,
                        })
                        trainings = [
                            ["lathe", response.data.lathe],
                            ["metal1", response.data.metal1],
                            ["metal2", response.data.metal2],
                            ["mill", response.data.mill],
                            ["waterjet", response.data.waterjet],
                            ["wood1", response.data.wood1],
                            ["wood2", response.data.wood2],
                        ];
                        this.setState({
                            userTrainings: trainings,
                        })
                        console.log('HAS PASSWORD: ' + this.state.hasPassword);
                    }
                })
            }
            else { //if id is not a number, instead user entered an email
                axios(getUserEmail(ID))
                    .then((response, error) => {
                        if (error) {
                            console.log('Error finding User');
                        } else {
                            console.log(response.data);
                            console.log("has password: " + response.data.password);
                            this.setState({
                                user: response.data,
                                idINT: response.data.id,
                                userIsFabTech: response.data.fabTech,
                                hasPassword: response.data.password,
                            })
                            trainings = [
                                ["lathe", response.data.lathe],
                                ["metal1", response.data.metal1],
                                ["metal2", response.data.metal2],
                                ["mill", response.data.mill],
                                ["waterjet", response.data.waterjet],
                                ["wood1", response.data.wood1],
                                ["wood2", response.data.wood2],
                            ];
                            this.setState({
                                userTrainings: trainings,
                            })
                        }
                    })
            }
        } else {
            this.setState({
                user: {},
                userTrainings: [],
                userIsFabTech: false,
                hasPassword: false,
                createdPassword: '',
            })
        }

    }
    // Edits the user based on the changes in the checkboxes
    handleChange(training) {
        var trainings = this.state.userTrainings;
        trainings[trainings.indexOf(training)][1] = !training[1];
        let authID = this.state.authID;
        if (authID.charAt(0)!=='0' || authID.charAt(0)!=='1') {//convert email to id if its not an id
            axios(getUserEmail(this.state.authID))
                .then((response, error) => {
                    if (error) {
                        console.log("Error getting authID");
                    }
                    else {
                        authID = response.data.id;
                        axios(editUser(this.state.idINT, { [training[0]]: training[1] }, authID))
                            .then((response, error) => {
                                if (error) {
                                    console.log('Error editing user !');
                                    this.handleFindUser(this.state.id);
                                } else {
                                    console.log('Edited successfully!');
                                    this.setState({
                                        userTrainings: trainings,
                                    })
                                }
                            })
                            .catch((err) => {
                                this.handleFindUser(this.state.id);
                            })
                    }
                })
        }
        else { //authid is a number
            axios(editUser(this.state.idINT, { [training[0]]: training[1] }, parseInt(this.state.authID), this.state.authPassword))
                .then((response, error) => {
                    if (error) {
                        console.log('Error editing user !');
                        this.handleFindUser(this.state.id);
                    } else {
                        console.log('Edited successfully!');
                        this.setState({
                            userTrainings: trainings,
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.handleFindUser(this.state.id);
                })
        }
    }

    handleCreatePassword() {
        if (!this.state.hasPassword) {
            let authID = this.state.authID;
            if (this.state.createdPassword) {
                if (authID.charAt(0)!=='0' || authID.charAt(0)!=='1') {
                    axios(getUserEmail(this.state.authID))
                        .then((response, error) => {
                            if (error) {
                                console.log("Error getting authID");
                            }
                            else {
                                authID = response.data.id;
                                axios(editUser(this.state.idINT, { "password": this.state.createdPassword }, authID, this.state.authPassword))
                                    .then((response, error) => {
                                        if (error) {
                                            console.log('Error creating password');
                                            this.handleFindUser(this.state.id);
                                        } else {
                                            console.log('Set password.');
                                            this.setState({
                                                createdPassword: '',
                                                hasPassword: true,
                                            })
                                        }
                                    })
                                    .catch((err) => {
                                        this.handleFindUser(this.state.id);
                                    })
                            }
                        })
                } else {
                    axios(editUser(this.state.idINT, { "password": this.state.createdPassword }, authID, this.state.authPassword))
                        .then((response, error) => {
                            if (error) {
                                console.log('Error creating password');
                                this.handleFindUser(this.state.id);
                            } else {
                                console.log('Set password.');
                                this.setState({
                                    createdPassword: '',   
                                    hasPassword: true,
                                })
                            }
                        })
                        .catch((err) => {
                            this.handleFindUser(this.state.id);
                        })
                }
            }
        } else {
            this.setState({
                hasPassword: false,
            })
        }
    }

    toggleFabTech() {
        console.log(this.state.authID);
        let authID =this.state.authID
        if (authID.charAt(0)!=='0' && authID.charAt(0)!=='1') {//convert email to id if its not an id
            axios(getUserEmail(this.state.authID))
                .then((response, error) => {
                    if (error) {
                        console.log("Error getting authID");
                    }
                    else {
                        authID = response.data.id;
                        axios(editUser(parseInt(this.state.id), { "fabTech": !this.state.userIsFabTech }, authID, this.state.authPassword)).then((response, error) => {
                            if (error) {
                                console.log('Error making user FabTech!');
                            } else {
                                console.log('Edited FabTech !');
                                this.setState((currentState) => {
                                    return {
                                        userIsFabTech: !currentState.userIsFabTech,
                                    }
                                })
                            }
                        })
                    }
                })
        } else {
            axios(editUser(this.state.id, { "fabTech": !this.state.userIsFabTech }, authID, this.state.authPassword)).then((response, error) => {
                if (error) {
                    console.log('Error making user FabTech!');
                } else {
                    console.log('Edited FabTech !');
                    this.setState((currentState) => {
                        //console.log("FABTECHHHH");
                        return {
                            userIsFabTech: !currentState.userIsFabTech,
                        }
                    })
                }
            })
        }
    }
    // Receives input from the <Inputs />
    handleCallBack(variable, value) {
        this.setState({
            [variable]: value,
        })
        if (variable === "id") {
            this.handleFindUser(value);
        }
    }

    render() {
        if (this.state.isFabTech) {
            return (
                <div>
                    <div className="container">
                        <div>
                            <Inputs
                                className="BoxInput"
                                id='small-input'
                                placeholder="Enter Auth ID"
                                value={this.state.authID}
                                variable="authID"
                                parentCallBack={this.handleCallBack}
                            />
                        </div>
                        <div>
                            <Inputs
                                className="BoxInput"
                                id="small-input2"
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.authPassword}
                                variable="authPassword"
                                parentCallBack={this.handleCallBack}
                            />
                        </div>
                    </div>
                    <div className="editUserContainer">
                        <h1 id="text3" align="left"> </h1>
                        <Inputs
                            className="BoxInput"
                            placeholder="Enter ID"
                            value={this.state.id}
                            variable="id"
                            parentCallBack={this.handleCallBack}
                        />
                        <h1 id="text3" align="left">Name: {this.state.user.name}</h1>
                        <DisplayChecks
                            trainings={this.state.userTrainings}
                            handleChange={this.handleChange}
                            userIsFabTech={this.state.userIsFabTech}
                            isAdmin={this.state.isAdmin}
                            toggleFabTech={this.toggleFabTech}
                        />
                        <RenderEditPassword
                            userIsFabTech={this.state.userIsFabTech}
                            isAdmin={this.state.isAdmin}
                            hasPassword={this.state.hasPassword}
                            createdPassword={this.state.createdPassword}
                            handleCreatePassword={this.handleCreatePassword}
                            handleCallBack={this.handleCallBack}
                        />
                        <ConditionalButton
                            trainings={this.state.userTrainings}
                        />
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                    <Inputs
                        className="BoxInput"
                        placeholder="Email ID"
                        value={this.state.fabTechID}
                        variable="fabTechID"
                        parentCallBack={this.handleCallBack}
                        onKeyPress={this.handleFabTechCheck}
                    />
                    </div>
                    <div>
                    <Inputs
                        className="BoxInput"
                        id="pass-input"
                        placeholder="Password"
                        value={this.state.authPassword}
                        variable="authPassword"
                        parentCallBack={this.handleCallBack}
                        type="password"
                        onKeyPress={this.handleFabTechCheck}
                    />
                    </div>
                    <button className="BetterButton" id="submit-login" onClick={() => this.handleFabTechCheck()}>Submit</button>
                </div>
            )
        }
    }
}