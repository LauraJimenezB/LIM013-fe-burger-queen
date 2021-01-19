import { useHistory } from "react-router-dom";
import logOut from './logOut.svg';

export function Home() {

    let history = useHistory();
  
    function handleClickHome() {
      history.push("/");
    }
  
    return (
      <button type="submit" onClick={handleClickHome} className='btnHeader2'>
        <img src={logOut} className="btn-log-out" alt="logout"/>
      </button>
    );
  }