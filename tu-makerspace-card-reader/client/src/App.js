import './App.css';
import { MachineView } from './MachineView';
import { AddUser } from './AddUser';
import { Routes, Route, Link } from 'react-router-dom';
import { EditUser } from './EditUser';
import { logo } from './images';
import { Hamburger } from  './UsedComponents';
import { useLocation } from 'react-router-dom';
import React from 'react';

function Home(){
  return(
    <>
      <main>
        <h2 className = "text">Welcome to the homepage!</h2>
        <p className="text">You can do this, I believe in you.</p>
      </main>
      <nav className="List">
        <form action="/metal-shop-1">
        <button className = "Box">Metal Shop 1</button>
        </form>
        <form action="/metal-shop-2">
          <button className="Box">Metal Shop 2</button>
        </form>
        <form action="/wood-shop">
          <button className="Box">Wood Shop</button>
        </form>
        <form action="/printers-and-lasers">
          <button className="Box">Printers and Lasers</button>
        </form>
        <form action="/add-user">
          <button className = "Box">Add a User</button>
        </form>
        <form action="/edit-user">
          <button className="Box">Edit User</button>
        </form>
      </nav>
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
      case "/add-user":
        return ": Add User"
      case "/edit-user":
        return ": Edit User"
      default:
        return "";
    }
  }
};

function App() {
  let location = useLocation().pathname;
  return (
    <div className="App">
    
    <h1 className="header">
    <Hamburger />
    <form action="/" className = "form2">
      <button className="logo-button"></button>
      </form>
    <img src={logo} id="logo"/>
    
    
      <h2 className="header-text">Tulane Makerspace</h2>{GetMachineGroup(location)}</h1>
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="metal-shop-1" element = {<MachineView machineGroup="metalShop1" />} />
      <Route path="metal-shop-2" element = {<MachineView machineGroup="metalShop2" />} />
      <Route path="wood-shop" element = {<MachineView machineGroup="woodShop"/>} />
    {/* Maddie add a path for add user when u wanna start working on that and you now have a new page for that function! */}
      <Route path="add-user" element = {<AddUser />} />
      <Route path="edit-user" element = {<EditUser />}/>
      <Route path="printers-and-lasers" element={<MachineView machineGroup="PL"/>}/>
    </Routes>
    </div>
  );
}

export default App;


