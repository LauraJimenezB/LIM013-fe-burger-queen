import { useHistory } from "react-router-dom";


export function BackMesero() {

    let history = useHistory();
  
    function handleClickBackMesero() {
      history.push("/Mesero");
    }
  
    return (
      <button type="submit" onClick={handleClickBackMesero}>
        Back
      </button>
    );
  }