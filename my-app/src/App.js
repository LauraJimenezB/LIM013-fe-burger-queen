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
  //Link
} from "react-router-dom";

import { React } from 'react';
// import {useCollection} from 'react-firebase-hooks/firestore';

import { Mesero } from './mesero.js'
import { Cocina } from './cocina.js'
import { Home } from './home.js'
import { Hola } from './vistaPedidosListos.js'
import { Registro } from './Auth.jsx'
/* import {useFirebaseApp} from 'reactfire'; */

export default function App() {
 /*  const firebase = useFirebaseApp();
  console.log(firebase); */
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Mesero">
            <Mesero />
          </Route>
          <Route path="/Cocina">
            <Cocina />
          </Route>
          <Route path="/vistaPedidosListos">
            <Hola/>
          </Route>
          <Route path="/registro">
            <Registro/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
