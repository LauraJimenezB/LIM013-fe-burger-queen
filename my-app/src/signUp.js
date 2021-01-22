import { React, useRef, useState } from 'react';
import { useAuth } from './AuthContext.js';
import { Link, useHistory } from 'react-router-dom';
import burguer from './burguer.svg';

export function SignUp () {
    //const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signUp} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const meseroRef = useRef();
    const cocinaRef = useRef();

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError('Las contraseñas no coinciden')
        }


        try{
            setError('');
            setLoading(true);
           await signUp(emailRef.current.value, passwordRef.current.value);
           if(meseroRef.current.checked) {
            history.push('/Mesero')
           } else if (cocinaRef.current.checked) {
            history.push('/Cocina')
           }
        } catch {
            setError('Error al crear la cuenta')
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
            <h2>REGISTRO</h2>
            {/*<input type="text" placeholder="Nombre" ref={nameRef}></input>*/}
            <input type="text" placeholder="Correo electrónico" ref={emailRef}></input>
            <input type="password" placeholder="Contraseña" minLength="6" ref={passwordRef}></input>
            <input type="password" placeholder="Confirma tu contraseña" minLength="6" ref={passwordConfirmRef}></input>
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
            <button type='submit' disabled={loading} className='submitForm'>Registrate</button>
            <p>Ya tienes una cuenta? <Link to="/logIn">Inicia sesión</Link></p>
        </form>
            </section>
        </main>
    </div>
    )
}