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


function About() {

}

function Users() {
  return <h2>Users</h2>;
}
