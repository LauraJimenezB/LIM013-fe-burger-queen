import { BackMesero } from './backMesero';
import burguer from './burguer.svg';

export function Hola() {
     return(<div>
      <header>
      <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
      <h1>BURGER QUEEN </h1> 
      <div> <BackMesero/></div>
    </header>
    </div>
    )
}
