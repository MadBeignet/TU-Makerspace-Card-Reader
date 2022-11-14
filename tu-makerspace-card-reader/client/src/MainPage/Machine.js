import '../MachineView/machineView.css';
import React from 'react';
import getImage from '../MachineView/GetImage.js';
import {TagOutInformation} from '../MachineView/TagOut.js';

export default class Machine extends React.Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        machine:props.machine,
        editMachine:props.editMachine,
        machineID: props.machineID,
        machineName: props.machineName,
        activated: props.activated,
        currentUser: props.currentUser,
        image: getImage(props.machineName, props.machineID),
        trained: props.trained,
        fabTechView: props.fabTechView,
        taggedOut: props.taggedOut,
        userID: props.userID,
        tagOutMessageValue: '',
        tagOutMessage: props.description || '',
      };
    }
  
    // used to update buttons with perms on user change. does not change activated state on machine, so remote disable is not supported atm. to be supported if deemed needed.
    static getDerivedStateFromProps(props, state) {
      state = {
        currentUser: props.currentUser,
        currentUser: props.currentUser,
        trained: props.trained,
        fabTechView: props.fabTechView,
        userID: props.userID,
      };
      return state
    }
    // called when button is clicked, changes state and calls api to database
  
  
    render() {
      return (
        <div className="MachineBoxContainer" align="center">
          <span id="otherh3-2">{this.state.machineName}</span>
          <div className={this.state.activated ? "MachineBoxBorder" : 'MachineBoxBorder-false'}>
          <div className="tooltip-wrap"><img src={this.state.image} className={this.state.activated ? "MachineBoxTrue" : "MachineBox"} /><div className="tooltip-content">{this.state.lastUser}</div></div>
            <button className={this.state.fabTechView ? "AdminToggle" : "AdminToggleFalse"} id={this.state.taggedOut ? "tagged-out-true" : "tagged-out-false"} onClick={() => this.handleToggleTagOut()} ></button>
          </div>
          <TagOutInformation
            fabTechView={this.state.fabTechView}
            taggedOut={this.state.taggedOut}
            tagOutMessageValue={this.state.tagOutMessageValue}
            tagOutMessage={this.state.tagOutMessage}
            machineName={this.state.machineName}
            activated={this.state.activated}
          />
  
        </div>
  
      );
    }
  }