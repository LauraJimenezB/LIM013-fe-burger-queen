import { VistaMenu } from './vistaMenu.js';
import { useState } from 'react';
import burguer from './burguer.svg';
import './Pedidos.css';

const DESAYUNO = 'desayuno';
const ALMUERZO = 'almuerzo';

export function Mesero() {
    
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
            <div className='menuHeader'>
              <h2 className='titleMenu'>MENÚ</h2> 
              <button type="button" className='btnMenuType' onClick={desayunoClick}>Desayuno</button>
              <button type="button" className='btnMenuType' onClick={almuerzoClick}>Almuerzo / Cena</button>
            </div>
            <div><VistaMenu tipoMenu= {vista}/></div>
          </section>
        </main>
      </div>
      );
    }
