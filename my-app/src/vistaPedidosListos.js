import { PedidosListos } from './pedidosListos.js';
import { Home } from './toHome.js';
import { ToMenu } from './toMenu';
import burguer from './burguer.svg';
import { useState, useEffect, React } from 'react';
import firebase from './firebase';

export function Hola(props) {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  //Traer orders de firebase
  useEffect(() => {
      let mounted = true;
      firebase.firestore().collection('orders').where('delivered','==',false).orderBy('time', 'desc').orderBy('date', 'desc').onSnapshot((snapshot)=>{
        if (mounted) {
          const orders = snapshot.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
          }))
          setOrders(orders);
        }
        })
        return function cleanup() {
          mounted = false;
        }
      }, [])

  //Traer items de firebase
  useEffect(() => {
    let mounted = true;
    firebase.firestore().collection('items').onSnapshot((snapshot)=>{
      if (mounted) {
      const items = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(items);
    }
    })
    return function cleanup() {
      mounted = false;
    }
  }, [])


const getName = (idElement) => {
  const getItem =  items.filter((item)=>item.id===idElement)[0];
  return (getItem.nombre);
}

const delivered = (idOrder) => {
  const newOrders = orders.filter((order)=>order.id !== idOrder);
  setOrders(newOrders);
  firebase.firestore().collection('orders').doc(idOrder).update({delivered: true});
}; 

      const listOrders = orders.map((order)=> 
      <div key={order.id} className='divOrderCocina'>
          <div className='heightOrder'>
            <div className='dateOrder'><span className='spanDateOrder'>Fecha: {order.date}</span></div>
            <div className='spanOrder'><span>Cliente: {order.cliente}</span></div>
            <ul className="listItems-order">
              { items.length > 0 ?
                   order.list.map((element)=>
                      <li key={element.id}>
                          <span>{element.cantidad}</span>
                          <span>{getName(element.id)}</span>
                      </li>)
              : 'loading' }
            </ul>
          <div className='spanOrder'><span>Total: ${order.total}</span></div>
          </div>
          <div className='divEstadoPreparación'>
            <button type="button" className='btnPreparado'>Preparado</button>
            <div>Inicio de preparación: {order.time}</div>
            <div>Fin de preparación: {order.timeFinal}</div>
            {/*<div>Tiempo: {timePassed(order.timeFinal, order)}</div>*/}
          </div>
          <div className='divListo'>
            <div className='tiempoListo'>
              <span>Tiempo:</span>
              <span>{order.timePrep}</span>
            </div>
            <button type="submit" className="btnSendToMesero" onClick={()=>delivered(order.id)}>Entregar</button>
          </div>
      </div>
      )

     return(<div>
       <header className='headerLogo'>
        <div className='divLogo'>
          <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
          <h1>BURGER QUEEN </h1> 
        </div>
        <div className='btnHeader'>
            <div><ToMenu/></div>
            <div className='listoNotif'>
              <PedidosListos/>
              <div className='notif'><span>{orders.length}</span></div>
            </div>
            <div><Home/></div>
        </div>
     </header>
    <ul className='orderSpace'>{listOrders}</ul>
    </div>
    )
}
