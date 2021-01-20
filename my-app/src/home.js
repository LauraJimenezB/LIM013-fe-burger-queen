import { useHistory } from "react-router-dom";
import burguer from './burguer.svg';
import {useState, React} from 'react';
import {useFirebaseApp, useUser} from 'reactfire';
import 'firebase/auth';
       

export function Home(props) {
  const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');

  const firebase=useFirebaseApp();
  const user = useUser();

  const login = async ()=> {
    await firebase.auth().signInWithEmailAndPassword(email,password) 
  }

  function Ingresar() {
    let history = useHistory();
    function handleClick() {
      if (user){
        history.push("Mesero");
        console.log(user);
      }
    }
    login();
    return (
      <button className="botonIngresarMesero" type="submit" onClick={handleClick}>
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
           <input className="meseroIngreso" type="text" placeholder="Correo electrónico" id="emailUserM" onChange={ (ev)=> setEmail(ev.target.value)}/>
           <input className="meseroIngreso" type="text" placeholder="Contraseña" id="passwordUserM" onChange={ (ev)=> setPassword(ev.target.value)}/>
            <Ingresar/>
          </div>
           <div><Registrar/></div>
          <div className="user">
           <h2>Jefe de cocina</h2>
           <input className="cocinaIngreso" type="text" placeholder="Correo electrónico" id="emailUserJ" onChange={ (ev)=> setEmail(ev.target.value)}/>
           <input className="cocinaIngreso" type="text" placeholder="Contraseña" id="passwordUserJ" onChange={ (ev)=> setPassword(ev.target.value)}/>
           <div>
           <Ingresar/>
           </div>
          </div>
        </main>
        </div>
        
      </div>
      );
  }