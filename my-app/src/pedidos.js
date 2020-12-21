import { useVista, useVista2 } from './firestore.js';
import { useState } from 'react';
import burguer from './burguer.svg';
import './Pedidos.css';

export function Pedidos() {
    const vista1 = useVista();
    const vista2 = useVista2();
    const [vista, setVista] = useState(0);

    const DesayunoClick = () => {
        setVista(0);
      }
      const AlmuerzoClick = () => {
        setVista(1);
      }
  /*
    const FirestoreCollection = () => {
      const {value, loading, error} = useCollection(
        firebase.firestore().collection('items'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
      return (
        <div>
          <p>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
              <span>
                Collection:{' '}
                {value.docs.map(doc => (
                  <React.Fragment key={doc.id}>
                    {JSON.stringify(doc.data())},{' '}
                  </React.Fragment>
                ))}
              </span>
            )}
          </p>
        </div>
      );
    };
  
  */
    return (
      <div>
        <header>
          <img src={burguer} className="Logo" alt="logo"/>
          <h1>BURGER QUEEN</h1>
        </header>
        <main>
          <section>
            <h2>Menú</h2> 
            <button type="button" onClick={DesayunoClick}>Desayuno</button>
            <button type="button" onClick={AlmuerzoClick}>Almuerzo y Cena</button>
            {vista === 0 ? <div>{vista1}</div> : <div>{vista2}</div>}
          </section>
          <section>
            <input type="text" placeholder="Nombre del cliente" id="nombreCliente"/>
            <div>
              <h2>ORDEN</h2>
            </div>
            <button type="submit">Enviar la orden</button>
          </section>
        </main>
      </div>
      );
    }