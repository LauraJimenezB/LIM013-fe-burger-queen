import { useHistory } from "react-router-dom";
import burguer from './burguer.svg';
import {useState, React} from 'react';
import {useFirebaseApp} from 'reactfire';
import 'firebase/auth';
       

export function Home(props) {
  const [ emailM, setEmailM ] = useState('');
const [ passwordM, setPasswordM ] = useState('');

const [ emailJ, setEmailJ ] = useState('');
const [ passwordJ, setPasswordJ ] = useState('');

  const firebase=useFirebaseApp();
  /* const user = useUser(); */

  const loginM = async ()=> {
    await firebase.auth().signInWithEmailAndPassword(emailM,passwordM) 
  }
  
  const loginJ = async ()=> {
    await firebase.auth().signInWithEmailAndPassword(emailJ,passwordJ) 
  }

  function IngresarM() {

    let history = useHistory();
  
    function handleClick() {
      history.push("Mesero");
    }
    loginM();
    return (
      <button className="botonIngresarMesero" type="submit" onClick={handleClick}>
        Ingresar
      </button>
  
    );
  }
  
 
   function IngresarCocina() {
  
      let history = useHistory();
    
      function handleClick() {
        history.push("/Cocina");
      }
    loginJ();
      return (
        <button className="botonIngresarCocina" type="submit" onClick={handleClick}>
          Ingresar
        </button>
      );
      } 
  
   function Registrar() {
  
        let history = useHistory();
      
        function clickRegistrar() {
          history.push("/registro");
        }
       
        return (
          <button className="botonRegistrar" type="submit" onClick={clickRegistrar}>
           - Registro -
          </button>
        );
        }

    return (
      <div className="InicioSesion">
    <div className="Ingresar">
        <div className="DivLogo">
         <img src={burguer} className="Logo" alt="logo"/>
         <div className="Titulo">
         <h1>BURGER QUEEN</h1>
         </div>
        </div>
        <main>
          <div className="user">
           <h2>Mesero/a</h2>
           <input className="meseroIngreso" type="text" placeholder="Correo electrónico" id="emailUserM" onChange={ (ev)=> setEmailM(ev.target.value)} id="emailInicioSesionUserM"/>
           <input className="meseroIngreso" type="text" placeholder="Contraseña" id="passwordUserM" onChange={ (ev)=> setPasswordM(ev.target.value)} id="contraseñaInicioSesionUserM"/>
            <IngresarM/>
          </div>
           <div><Registrar/></div>
          <div className="user">
           <h2>Jefe de cocina</h2>
           <input className="cocinaIngreso" type="text" placeholder="Correo electrónico" id="emailUserJ" onChange={ (ev)=> setEmailJ(ev.target.value)} id="emailInicioSesionUserM"/>
           <input className="cocinaIngreso" type="text" placeholder="Contraseña" id="passwordUserJ" onChange={ (ev)=> setPasswordJ(ev.target.value)} id="contraseñaInicioSesionUserM"/>
           <div>
           <IngresarCocina/>
           </div>
          </div>
        </main>
        </div>
        
      </div>
      );
  }