import './App.css';
import { MachineLog } from '../MachineLogs';
import { MachineView } from '../MachineView';
import { AddUser } from '../AddUser';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { EditUser } from '../EditUser';
import { logo } from '../images';
import { Hamburger } from  '../UsedComponents';
import { FrontPageMachines } from './FrontPageMachines.js';
import React from 'react';
import { PersistentRFIDConnectButton } from './PeristentRFIDConnectButton';

function Home(){
  return(
    <>
      <main>
        <h2 className = "text">Welcome to the homepage!</h2>
        <p className="text">Today's date is {Date().substring(Date().indexOf(" "),Date().indexOf("202"))}</p>
      </main>
      <nav className="List">
        <NavLink to="/metal-shop-1">
        <button className = "Box">Metal Shop 1</button>
        </NavLink>
        <NavLink to="/metal-shop-2">
          <button className="Box">Metal Shop 2</button>
        </NavLink>
        <NavLink to="/wood-shop">
          <button className="Box">Wood Shop</button>
        </NavLink>
        <NavLink to="/printers-and-lasers">
          <button className="Box">Printers and Lasers</button>
        </NavLink>
        <NavLink to="/add-user">
          <button className = "Box">Add a User</button>
        </NavLink>
        <NavLink to="/edit-user">
          <button className="Box">Edit User</button>
        </NavLink>
      </nav>
      <FrontPageMachines/>
    </>
  )
}
function GetMachineGroup(loc) {
  console.log(loc);
  let location = loc;
  if (location) {
    switch(location) {
      case "/metal-shop-1":
        return ": Metal Shop 1";
      case "/metal-shop-2":
        return ": Metal Shop 2";
      case "/wood-shop":
        return ": Wood Shop";
      case "/printers-and-lasers":
        return ": 3D Printers and Lasers Status";
      case "/machine-logs":
        return ": Machine Logs";
      default:
        return "";
    }
  }
};

const App = () => {
  const [lastRFID, setLastRFID] = React.useState("");
  let location = useLocation().pathname;
  return (
    <div className="App">
    
    <h1 className="header">
    <Hamburger />
    <NavLink to="/" >
      <button className="logo-button"></button>
      </NavLink>
    <img src={logo} id="logo"/>
    
    
      Tulane MakerSpace{GetMachineGroup(location)}</h1>
      <PersistentRFIDConnectButton lastRFID={lastRFID} setLastRFID={setLastRFID} />
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="metal-shop-1" element = {<MachineView machineGroup="metalShop1" lastRFID={lastRFID} setLastRFID={setLastRFID}/>} />
      <Route path="metal-shop-2" element = {<MachineView machineGroup="metalShop2" lastRFID={lastRFID} setLastRFID={setLastRFID}/>} />
      <Route path="wood-shop" element = {<MachineView machineGroup="woodShop" lastRFID={lastRFID}setLastRFID={setLastRFID}/>} />
    {/* Maddie add a path for add user when u wanna start working on that and you now have a new page for that function! */}
      <Route path="add-user" element = {<AddUser lastRFID={lastRFID} setLastRFID={setLastRFID}/>} />
      <Route path="edit-user" element = {<EditUser lastRFID={lastRFID} setLastRFID={setLastRFID}/>}/>
      <Route path="printers-and-lasers" element={<MachineView lastRFID={lastRFID} setLastRFID={setLastRFID} machineGroup="digital"/>}/>
      <Route path="machine-logs" element={<MachineLog/>}/>
    </Routes>
    </div>
  );
}

export default App;


