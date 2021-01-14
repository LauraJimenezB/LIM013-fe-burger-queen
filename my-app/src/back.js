import { useHistory } from "react-router-dom";


export function Back() {

    let history = useHistory();
  
    function handleClickBack() {
      history.push("/");
    }
  
    return (
      <button type="submit" onClick={handleClickBack}>
        Back
      </button>
    );
  }