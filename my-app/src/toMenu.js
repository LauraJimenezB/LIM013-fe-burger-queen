import { useHistory } from "react-router-dom";


export function ToMenu() {

    let history = useHistory();
  
    function handleClickToMenu() {
      history.push("/Mesero");
    }
  
    return (
      <button type="submit" onClick={handleClickToMenu} className='btnHeader2'>
        Menú
      </button>
    );
  }