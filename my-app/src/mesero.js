import { VistaMenu } from './vistaMenu.js';
import burguer from './burguer.svg';
import './Pedidos.css';
import { PedidosListos } from './pedidosListos.js';
import { Back } from './back.js';

export function Mesero() {
 
    return (
      <div>
        <header>
          <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
          <h1>BURGER QUEEN <PedidosListos/> <Back/></h1>
          
        </header>
        <VistaMenu/>
      </div>
      );
    }
