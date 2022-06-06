import Inputs from './Inputs.js';
import Root from './switchtheme.js';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import React from 'react';

export function TagOutButton(props) {
    if (props.isFabTech) {
        return (
            <button className="BetterBox" id={props.fabTechView ? "fabViewOn" : ""} onClick={() => props.toggleFabTechView()}>Tag Out</button>
        )
    } else {
        return null;
    }
}


export function TagOutInformation(props) {
    // console.log("tag out reason: " + props.tagOutMessageValue);
    if (props.fabTechView && props.taggedOut) {
        return (
            <span id="otherh3-2">
                <Inputs
                    className="SmallerTextField"
                    placeholder="Enter Reason"
                    value={props.tagOutMessageValue}
                    variable="tagOutMessageValue"
                    parentCallBack={props.handleCallBack}
                />
                <button className="BetterBox" id="smaller-box" onClick={() => props.submitMessage()}>Submit</button>
                <span>
                    <div className="tagOutText" id="tagOutHeader">{props.machineName}: </div>
                    <div className="tagOutText">{props.tagOutMessage || 'Unlisted reason'}</div>
                </span>
            </span>
        )

    } else if (props.taggedOut) {
        return (
            <span>
                <div className="tagOutText" id="tagOutHeader">{props.machineName}: </div>
                <div className="tagOutText">{props.tagOutMessage || 'Unlisted reason'}</div>
            </span>
        )
    } else {
        return (
            <span>
                <span id="otherh3-2">{props.machineName}

                    <SwitchUnstyled
                        component={Root}
                        id="switch"
                        className="toggle"
                        checked={props.activated}
                        size="medium"
                        color="success"
                        disabled={(!props.trained && !props.activated) || props.taggedOut}
                        inputprops={{ 'aria-label': 'Checkbox demo' }}
                        onChange={() => props.onButtonChange()}
                    />
                </span>
            </span>
        )
    }
}