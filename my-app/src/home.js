import { useHistory } from "react-router-dom";
import burguer from './burguer.svg';

function Ingresar() {

  let history = useHistory();

  function handleClick() {
    history.push("/Mesero");
  }

  return (
    <button type="submit" onClick={handleClick}>
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
      <button type="submit" onClick={handleClick}>
        Ingresar
      </button>
    );
    }

export function Home() {
    return (
    <div>
        <header>
         <img src={burguer} className="Logo" alt="logo"/>
         <h1>BURGER QUEEN</h1>
        </header>
        <main>
          <div className="user">
           <h2>Mesero/a</h2>
           <input type="text" placeholder="Correo electrónico" id="emailUserM"/>
           <input type="text" placeholder="Contraseña" id="passwordUserM"/>
           <Ingresar/>
          </div>
          <div className="user">
           <h2>Jefe de cocina</h2>
           <input type="text" placeholder="Correo electrónico" id="emailUserJ"/>
           <input type="text" placeholder="Contraseña" id="passwordUserJ"/>
           <IngresarCocina/>
          </div>
        </main>
      </div>
      );
  }