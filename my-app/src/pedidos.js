import { VistaMenu } from './menu.js';
import { useState } from 'react';
import burguer from './burguer.svg';
import './Pedidos.css';

const DESAYUNO = 'desayuno';
const ALMUERZO = 'almuerzo';

export function Pedidos() {
    
    const [vista, vistaMenu] = useState(DESAYUNO);

    const desayunoClick = () => {
        vistaMenu(DESAYUNO);
      }
      const almuerzoClick = () => {
        vistaMenu(ALMUERZO);
      }
 
    return (
      <div>
        <header>
          <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
          <h1>BURGER QUEEN</h1>
        </header>
        <main> 
          <section>
            <h2>Menú</h2> 
            <button type="button" onClick={desayunoClick}>Desayuno</button>
            <button type="button" onClick={almuerzoClick}>Almuerzo y Cena</button>
            <div><VistaMenu tipoMenu= {vista}/></div>
          </section>
        </main>
      </div>
      );
    }

    /* import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
} */