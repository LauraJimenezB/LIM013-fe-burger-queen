import { useHistory } from "react-router-dom";


export function PedidosListos() {

    let history = useHistory();
  
    function handleClickListos() {
      history.push("/vistaPedidosListos");
    }
  
    return (
      <button type="submit" onClick={handleClickListos}>
        Pedidos Listos
      </button>
    );
  }