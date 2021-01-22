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
import { Hola } from './vistaPedidosListos.js'
import { SignUp } from './signUp.js'
import { LogIn } from './logIn.js'
/* import {useFirebaseApp} from 'reactfire'; */

 /*  const firebase = useFirebaseApp();
  console.log(firebase); */
import { CocinaEnviados } from "./cocinaEnviados.js";
import { AuthProvider } from "./AuthContext.js";
import PrivateRoute from './privateRoute.js'

export default function App(props) {
  return (
    <AuthProvider>
      <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PrivateRoute exact path='/Mesero' component={Mesero}/>
          <PrivateRoute exact path='/Cocina' component={Cocina}/>
          <PrivateRoute exact path='/CocinaEnviados' component={CocinaEnviados}/>
          <PrivateRoute exact path='/vistaPedidosListos' component={Hola}/>
          <Route path="/signUp">
            <SignUp/>
          </Route>
          <Route path="/logIn">
            <LogIn/>
          </Route>
        </Switch>
      </div>
    </Router>
    </AuthProvider>
  );
}
