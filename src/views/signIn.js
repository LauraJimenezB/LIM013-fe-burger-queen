function signIn() {
    return (
    <div>
      <header>
       <img></img>
       <h1>BURGER QUEEN</h1>
      </header>
      <main>
        <div className="user">
         <input type="text" placeholder="Correo electrónico" id="emailUserM"/>
         <input type="text" placeholder="Contraseña" id="passwordUserM"/>
         <button type="submit">Ingresar</button>
        </div>
        <div className="user">
         <input type="text" placeholder="Correo electrónico" id="emailUserJ"/>
         <input type="text" placeholder="Contraseña" id="passwordUserJ"/>
         <button type="submit">Ingresar</button>
        </div>
      </main>
    </div>
    );
  };

  ReactDOM.render(
    <signIn
    />,
    document.getElementById('container')
  );