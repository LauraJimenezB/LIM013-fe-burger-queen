import { React, useRef, useState } from 'react';
import { useAuth } from './AuthContext.js';
import { Link, useHistory } from 'react-router-dom';
import burguer from './burguer.svg';

export function LogIn () {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {logIn} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const meseroRef = useRef();
    const cocinaRef = useRef();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
           await logIn(emailRef.current.value, passwordRef.current.value);
           if(meseroRef.current.checked) {
            history.push('/Mesero')
           } else if (cocinaRef.current.checked) {
            history.push('/Cocina')
           }
        } catch {
            setError('Error al ingresar')
        }
        setLoading(false);
    }

    return (
        <div className='signUpBody'>
        <main className='signUpMain'>
            <section className='signUpSection1'>
                <h1>BURGER QUEEN </h1>
            </section>
            <section className='signUpSection2'>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
            <h2>INICIO DE SESIÓN</h2>
            <input type="text" placeholder="Correo electrónico" ref={emailRef}></input>
            <input type="password" placeholder="Contraseña" minLength="6" ref={passwordRef}></input>
            <div className='divInputRadio'>
            <p>Selecciona tu cargo:</p>
            <div className='inputRadios'>
                <input type="radio" id="mesero" name="cargo" value="mesero" ref={meseroRef} className='radioInput'/>
                <label htmlFor="mesero">Mesero/a</label>
            </div>
            <div className='inputRadios'>
                <input type="radio" id="cocina" name="cargo" value="cocina" ref={cocinaRef} className='radioInput'/>
                <label htmlFor="cocina">Jefe de cocina</label>
            </div>
            </div>
            <button type='submit' disabled={loading} className='submitForm'>Ingresar</button>
            <p>No tienes una cuenta? <Link to="/signUp">Regístrate</Link></p>
        </form>
        </section>
        </main>
    </div>
    )
}