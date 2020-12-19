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
  Link
} from "react-router-dom";

import { React, useEffect, useState } from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import firebase from './firebase';


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
          <Route path="/users">
            <Users />
          </Route>
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

function useVista () {
  const [vista, setVista] = useState([]);
useEffect(() => {
  firebase.firestore().collection('items').onSnapshot((snapshot)=>{
    const item = snapshot.docs.map((doc)=> ({
      nombre: doc.data().nombre,
      precio: doc.data().precio,
    }))
    setVista(item);
  })
}, [])
  return vista;
}

function About() {
  const vista = useVista();
/*
  const FirestoreCollection = () => {
    const {value, loading, error} = useCollection(
      firebase.firestore().collection('items'),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );
    return (
      <div>
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
            <span>
              Collection:{' '}
              {value.docs.map(doc => (
                <React.Fragment key={doc.id}>
                  {JSON.stringify(doc.data())},{' '}
                </React.Fragment>
              ))}
            </span>
          )}
        </p>
      </div>
    );
  };

*/
  
  const DesayunoClick = () => {
    console.log('hola');
    //setVista(0);
  }
  const AlmuerzoClick = () => {
    console.log('hola1');
    //setVista(1);
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
           <ul>
           {vista.map((item)=>
           <li key={item.id}>
             <div>{item.nombre}</div>
             <div>{item.precio}</div>
           </li>
           )}
           </ul>
          </div>
          <div className="order">
           <input type="text" placeholder="Correo electrónico" id="emailUserJ"/>
           <input type="text" placeholder="Contraseña" id="passwordUserJ"/>
           <button type="submit">Ingresar</button>
          </div>
        </main>
      </div>
      );
  }

function Users() {
  return <h2>Users</h2>;
}
