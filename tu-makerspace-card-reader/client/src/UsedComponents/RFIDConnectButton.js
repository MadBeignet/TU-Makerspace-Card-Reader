import React, { useState } from "react";
import './button.css';


export const RFIDConnectButton = ({ handleCallBack }) => {
    const [isConnected, editIsConnected] = useState(false);
    const [usbReader, setUsbReader] = useState();
    const [isReading, setIsReading] = useState(false);
    let currentId = ''
    let lastId = ''
    let toggleIdBox = true;
    console.log(isConnected)

    const _readValue = async () => {
        await usbReader?.read();
        console.log('startread');
        // if(!isReading){
        // editIsReading(true);
        while (isConnected) {
            try {

                const { value, done } = await usbReader.read();
                console.log(value, done);
                for (const char of value) {
                    console.log(char, 'char');
                    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].includes(char)) {
                        currentId += char
                        console.log(currentId, 'currID');

                    }
                    else {
                        if (currentId != '') {
                            console.log('return', currentId);

                            if (lastId === currentId) {
                                toggleIdBox = !toggleIdBox;
                            }

                            if (toggleIdBox) {
                                handleCallBack('id', String(parseInt(currentId, 16)));
                            } else {
                                handleCallBack('authID', String(parseInt(currentId, 16)));
                            }
                            toggleIdBox = !toggleIdBox;
                            lastId = currentId;
                            currentId = '';

                        }

                    }
                }
            } catch (error) {
            }
        }
    }
    const _connectDevices = async () => {
        navigator.serial.requestPort({
            filters: [
                { usbVendorId: 0x0403, usbProductId: 0x6001 }
            ]
        })
            .then(async (port) => {
                await port.open({ baudRate: 9600 });
                // eslint-disable-next-line no-undef
                const textDecoder = new TextDecoderStream();
                const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
                const reader = textDecoder.readable.getReader()
                await setUsbReader(reader);
                await usbReader?.read();
                editIsConnected(true);
            });

        _readValue();
        await new Promise(resolve =>
            setTimeout(resolve, 500)
        );
        _readValue();
    }







    return (!isConnected ? <button className="connectButton" onClick={_connectDevices}>connect</button> : isReading ? <>SCAN NEW CARD FIRST</> : <button onClick={() => { setIsReading(true); _readValue() }} >{`Start Card Read (SCAN NEW CARD FIRST)`}</button>)
}


