import { useHistory } from "react-router-dom";


export function PedidosListos(props) {

    let history = useHistory();
  
    function handleClickListos() {
      history.push("/vistaPedidosListos");
    }
  
    return (
      <button type="submit" onClick={handleClickListos} className='btnHeader1'>
        Pedidos Listos
      </button>
      
    );
  }