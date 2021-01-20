import { useHistory } from "react-router-dom";


export function ToPedidosCocina() {

    let history = useHistory();
  
    function handleClickToMenu() {
      history.push("/Cocina");
    }
  
    return (
      <button type="submit" onClick={handleClickToMenu} className='btnHeader1'>
        En preparación
      </button>
    );
  }