import burguer from './burguer.svg';
import './Pedidos.css';
import { PedidosListos } from './pedidosListos.js';
import { Home } from './toHome.js';
import { ToMenu } from './toMenu';

export function NavMenu(props) {
    return (<div>
      <header className='headerLogo'>
          <div className='divLogo'>
            <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
            <h1>BURGER QUEEN </h1>
          </div>
          <div className='btnHeader'>
            <div><ToMenu/></div>
            <div><PedidosListos/></div>
            <div><Home/></div>
          </div>
        </header>
    </div>  
      );
    }
