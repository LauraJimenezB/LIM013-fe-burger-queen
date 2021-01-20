import burguer from './burguer.svg';
import {useState, React} from 'react';
import { useHistory } from "react-router-dom";
/* import App from './App' */
/*  import firebase from "firebase/app"; */
import {useFirebaseApp} from 'reactfire';
/* import {firebaseConfig} from './firebase.js'; */
//modulo de autenticación
import 'firebase/auth';
//hooks que me va a permitir obtener el objeto de firebase 
//acceso al SDK de Firebase a traves del hook:
//const firebase = useFirebaseApp


//al mismo tiempo que firebase crea un usuario, guarda una sesion localmente de ese usuario
export function Registro(props) {
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
/* 
const user = () => firebase.auth().currentUser; */
//metodo auth que retorna un metodo auth
//tiene un metodo createUserWithEmailAndPassword(email,password)
//me retorna una promesa (uso async y await, para decirle al programa que estoy esperando su finalizacion)

const firebase=useFirebaseApp();

const registro = async ()=> {
   await firebase.auth().createUserWithEmailAndPassword(email,password)
  
}

function PushIniciodeSesion() {

  let history = useHistory();

  function clickAgainInicio() {
    history.push("/");
  }
  registro();
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
           <input className="meseroRegistro" type="text" placeholder="Correo electrónico" onChange={ (ev)=> setEmail(ev.target.value)} id="emailRegistroUserM"/>
           <input className="meseroRegistro" type="text" placeholder="Contraseña"  onChange={ (ev)=> setPassword(ev.target.value)} id="passwordRegistroUserM"/>
           <PushIniciodeSesion/>
          </div>
          <div className="user">
           <h2>Jefe de cocina</h2>
           <input className="meseroRegistro" type="text" placeholder="Nombre" id="nameRegistroUserJ"/>
           <input className="cocinaIngreso" type="text" placeholder="Correo electrónico" onChange={ (ev)=> setEmail(ev.target.value)} id="emailRegistroUserJ"/>
           <input className="cocinaIngreso" type="text" placeholder="Contraseña" onChange={ (ev)=> setPassword(ev.target.value)} id="passwordRegistroUserJ"/>
          <PushIniciodeSesion/>

           </div>
           </main>
           </div>
           </div>
          
          
         /*   </FirebaseAppProvider> */
            )
          /*  }  */
        }

           