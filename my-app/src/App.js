/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         <code>Hola Mundo</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { React, useState } from 'react';

// import ReactDOM from 'react-dom';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio de sesión</Link>
            </li>
            <li>
              <Link to="/About">Pedidos</Link>
            </li>
           {/*  <li>
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          
          {/* <Route path="/users">
            <Users /> 
          </Route>*/}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  /* return <h2>Home</h2>; */
  return (
  <div>
      <header>
       <img></img>
       <h1>BURGER QUEEN</h1>
      </header>
      <main>
        <div className="user">
         <input type="text" placeholder="Correo electrónico" id="emailUserM"/>
         <input type="text" placeholder="Contraseña" id="passwordUserM"/>
         <button type="submit">Ingresar</button>
        </div>
        <div className="user">
         <input type="text" placeholder="Correo electrónico" id="emailUserJ"/>
         <input type="text" placeholder="Contraseña" id="passwordUserJ"/>
         <button type="submit">Ingresar</button>
        </div>
      </main>
    </div>
    );
}


function About() {
  const [vista, setVista] = useState(0);

  function Desayuno () {
    return (
      <ul>
        <li>Café americano</li>
        <li>Café con leche</li>
        <li>Sandwich de jamón con queso</li>
        <li>Jugo de frutas natural</li>
      </ul>
    );
  }
      

  function Almuerzo () {
    return (
      <div>
        <ul> Hamburguesas
          <li>Hamburguesa simple</li>
          <li>Hamburguesa doble</li>
        </ul>
        <ul> Acompañamientos
          <li>Papas fritas</li>
          <li>Aros de cebolla</li>
        </ul>
        <ul> Para tomar
          <li>Agua 500ml</li>
          <li>Agua 750ml</li>
          <li>Bebida/gaseosa 500ml</li>
          <li>Bebida/gaseosa 750ml</li>
        </ul>
      </div>
    );
  }
     
  const DesayunoClick = () => {
    console.log('hola');
    setVista(0);
  }
  const AlmuerzoClick = () => {
    console.log('hola1');
    setVista(1);
  }
  return (
    <div>
        <header>
         <img></img>
         <h1>BURGER QUEEN</h1>
        </header>
        <main>
          <div className="items">   
           <h2>Menú</h2> 
           <button type="button" onClick={DesayunoClick}>Desayuno</button>
           <button type="button" onClick={AlmuerzoClick}>Almuerzo y Cena</button>
           { vista == 0 ? <Desayuno/> : <Almuerzo/> }
          </div>
        </main>
      </div>
      );
  
}
function Users() {
  return <h2>Users</h2>;
}
