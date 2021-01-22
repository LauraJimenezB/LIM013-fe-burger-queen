import { useHistory } from "react-router-dom";
import logOutPic from './logOut.svg';
import React, {useState} from 'react';
import {useAuth} from './AuthContext';

export function Home() {
    const [error, setError] = useState('');
    let history = useHistory();
    const {currentUser, logOut} = useAuth();
  
    async function handleLogOut() {
      setError('');
      try {
        await logOut();
        history.push("/logIn");
      } catch {
        setError('Error al cerrar sesión')
      }
    }
  
    return ( 
      <div>
        {error && <span>{error}</span>}
        <span>{currentUser.email}</span>
        <button type="submit" onClick={handleLogOut} className='btnHeader2'>
          <img src={logOutPic} className="btn-log-out" alt="logout"/>
        </button>
      </div>
    );
  }