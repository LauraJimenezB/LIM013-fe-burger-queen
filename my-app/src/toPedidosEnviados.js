import { useHistory } from "react-router-dom";


export function ToPedidosEnviados() {

    let history = useHistory();
  
    function handleClickToMenu() {
      history.push("/CocinaEnviados");
    }
  
    return (
      <button type="submit" onClick={handleClickToMenu} className='btnHeader3'>
        Pedidos Listos
      </button>
    );
  }