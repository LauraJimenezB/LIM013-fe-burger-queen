import { useHistory } from "react-router-dom";
import burguer from './burguer.svg';
import Registro from './Auth.jsx';
import {useUser} from 'reactfire';



function Ingresar() {

  let history = useHistory();

  function handleClick() {
    history.push("Mesero");
  }

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

export function Home() {
  const user = useUser();
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
           <input className="meseroIngreso" type="text" placeholder="Correo electrónico" id="emailUserM"/>
           <input className="meseroIngreso" type="text" placeholder="Contraseña" id="passwordUserM"/>
           <div>
             {
           user.data && <Ingresar/>
             }
           </div>
           <div><Registrar/></div>
          </div>
          <div className="user">
           <h2>Jefe de cocina</h2>
           <input className="cocinaIngreso" type="text" placeholder="Correo electrónico" id="emailUserJ"/>
           <input className="cocinaIngreso" type="text" placeholder="Contraseña" id="passwordUserJ"/>
           <div>
           <IngresarCocina/>
           </div>
          </div>
        </main>
        </div>
      </div>
      );
  }