import './MachineLogPage.css';
import './Log.css';
import React from 'react';
import Inputs from '../UsedComponents/Inputs';
import axios from 'axios';
import { getAllMachines, verifyUser } from '../APIRoutes.js';


export default class MachineLogs extends React.Component {
    constructor(props) {
       super(props);
       this.state=({
            fabTechID: '',
            authPassword: '',
            loggedIn: true,
            currIndex: 0,
            maxIndex: 0,
            logs: [{
                "Index": "0",
                "Machine": "Loading...",
                "Name": "Loading...",
                "Action": "Null",
                "Time": "Loading...",
            }],

        }) 
        this.handleCallBack = this.handleCallBack.bind(this);
        this.handleFabTechCheck = this.handleFabTechCheck.bind(this);
    }
    handleCallBack(variable, value) {
        this.setState({
            [variable]: value,
        })
    }
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
                            loggedIn: true,
                        })
                    }
                }
            })
    }
    nextPage() {
        this.setState((currState) => {
            return {
                currIndex: currState.currIndex + 1 <= currState.maxIndex ? currState.currIndex + 1 : currState.maxIndex,
            }
        })
    }
    backPage() {
        this.setState((currState) => {
            return {
                currIndex: currState.currIndex - 1 >= 0 ? currState.currIndex - 1 : 0,
            }
        })
    }
    /*
    componentWillUnmount() {
        this.setState({
            currIndex: 0,
            maxIndex: 1,
            logs: [{
                "Index": "0",
                "Machine": "Loading...",
                "Name": "Loading...",
                "Action": "Null",
                "Time": "Loading...",
            }],
        })
      }
      componentDidMount() { //gets called when component starts, gets machines for specific machinegroup from api
        // TODO: copy the form of this code below to get the logs
        // will show 20 logs per page
        // will have a next and previous button
        for (let i = 20*this.state.currIndex; i < 20*(this.state.currIndex+1); i++) {
            // get the log from the api
            // add it to the logs array
            // if the log is the last one, break from the loop
        }

        // axios(getAllMachines(this.state.machineGroup)).then((response, err) => {
        //   if (err) {
        //     console.log("error getting machines");
        //   }
        //   else {
        //     // console.log(response.data);
        //     this.setState({
        //       machines: []
        //     })
        //     this.setState({
        //       machines: response.data,
        //       currentUser: {
        //         "name": "Enter ID",
        //         "nullTraining": false
        //       },
        //     });
    
        //   }
        // });
    
      }*/

    render() {
        console.log(this.state.logs);
        document.documentElement.style.setProperty("--num", this.state.logs.length+1);
        let i = 0;
        if (this.state.loggedIn) {
            return (
                <>
                
                <div className="log-container">
                    
                    <div className="log">
                        <div className="log-box" id="index-box">Index</div>
                        <div className="log-box" id="machine-name-box">Machine</div>
                        <div className="log-box" id="user-name-box">User</div>
                        <div className="log-box" id="action-box">Action</div>
                        <div className="log-box" id="time-box">Time</div>
                    </div>
                {this.state.logs.map((log) => (
                    <LogComponent
                        index={++i}
                        machineName={log.Machine}
                        userName={log.Name}
                        time={log.Time}
                        action={log.Action}
                    />
                ))}
                <button className="page-button" id="next" onClick={() => this.nextPage}>Next</button>
                <button className="page-button" id="back" onClick={() => this.backPage}>Back</button>
                </div>
                
                </>
            );

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
class LogComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            machineName: props.machineName,
            userName: props.userName || '',
            time: props.time,
            action: props.action,
            index: props.index,

        };
    }
    render() {
        return (
            <div className="log">
                <div className="log-box" id="index-box">{this.state.index}</div>
                <div className="log-box" id="machine-name-box">{this.state.machineName}</div>
                <div className="log-box" id="user-name-box">{this.state.userName}</div>
                <div className="log-box" id="action-box">{this.state.action}</div>
                <div className="log-box" id="time-box">{this.state.time}</div>
            </div>
        )
    }
}