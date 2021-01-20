import burguer from './burguer.svg';
import {useState, React} from 'react';
import { useHistory } from "react-router-dom";
/* import App from './App' */
/*  import firebase from "firebase/app"; */
import {useFirebaseApp, useUser} from 'reactfire';
/* import {firebaseConfig} from './firebase.js'; */
//modulo de autenticación
import 'firebase/auth';
//hooks que me va a permitir obtener el objeto de firebase 
//acceso al SDK de Firebase a traves del hook:
//const firebase = useFirebaseApp


//al mismo tiempo que firebase crea un usuario, guarda una sesion localmente de ese usuario
export function Registro(props) {
const [ emailM, setEmailM ] = useState('');
const [ passwordM, setPasswordM ] = useState('');

const [ emailJ, setEmailJ ] = useState('');
const [ passwordJ, setPasswordJ ] = useState('');
/* 
const user = () => firebase.auth().currentUser; */
//metodo auth que retorna un metodo auth
//tiene un metodo createUserWithEmailAndPassword(email,password)
//me retorna una promesa (uso async y await, para decirle al programa que estoy esperando su finalizacion)

const firebase=useFirebaseApp();
const user = useUser();


const registroM = async ()=> {
   await firebase.auth().createUserWithEmailAndPassword(emailM,passwordM)
  
}

const registroJ = async ()=> {
  await firebase.auth().createUserWithEmailAndPassword(emailJ,passwordJ)
 
}

function PushIniciodeSesionM() {

  let history = useHistory();

  function clickAgainInicio() {
    history.push("/");
  }
  registroM();
  return (
    <button className="botonIngresarCocina" type="submit" onClick={clickAgainInicio}>
      Registro
    </button>
  );
}
function PushIniciodeSesionJ() {

  let history = useHistory();

  function clickAgainInicio() {
    history.push("/");
  }
  registroJ();
  return (
    <button className="botonIngresarCocina" type="submit" onClick={clickAgainInicio}>
      Registro
    </button>
  );
  }
/* const login = async ()=> {
  await firebase.auth().signInWithEmailAndPassword(email,password)
 
} */

/* const botonLogout = async () => {
  await firebase.auth().signOut();
} */

/* export function Registro() { */
  
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
           {/* sincronizar lo que el usuario escriba con onChange
            .target referencia al documento de html que haya disparado el evento de cambio
            el valor del control se obtiene con value */}
           <input className="meseroRegistro" type="text" placeholder="Nombre" id="nameRegistroUserM"/>
           <input className="meseroRegistro" type="text" placeholder="Correo electrónico" onChange={ (ev)=> setEmailM(ev.target.value)} id="emailRegistroUserM"/>
           <input className="meseroRegistro" type="text" placeholder="Contraseña"  onChange={ (ev)=> setPasswordM(ev.target.value)} id="passwordRegistroUserM"/>
           {user.data &&
           <PushIniciodeSesionM/>
            }
          </div>
          
          <div className="user">
           <h2>Jefe de cocina</h2>
           <input className="meseroRegistro" type="text" placeholder="Nombre" id="nameRegistroUserJ"/>
           <input className="cocinaIngreso" type="text" placeholder="Correo electrónico" onChange={ (ev)=> setEmailJ(ev.target.value)} id="emailRegistroUserJ"/>
           <input className="cocinaIngreso" type="text" placeholder="Contraseña" onChange={ (ev)=> setPasswordJ(ev.target.value)} id="passwordRegistroUserJ"/>
           { user.data &&
             <PushIniciodeSesionJ/>
             }

           </div>
           </main>
           </div>
           </div>
          
          
         /*   </FirebaseAppProvider> */
            )
          /*  }  */
        }

           