import { useState, useEffect, React } from 'react';
import firebase from './firebase';
import './Pedidos.css';
import burguer from './burguer.svg';
import { Home } from './toHome.js';
import { ToPedidosCocina } from './toPedidosCocina.js';
import { ToPedidosEnviados } from './toPedidosEnviados.js';

export function Cocina () {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    //Traer orders de firebase
    useEffect(() => {
        let mounted = true;
        firebase.firestore().collection('orders').where('listo','==',false).orderBy('time', 'desc').orderBy('date', 'desc').onSnapshot((snapshot)=>{
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

    const timePassed = (timeFinal, order) => {
      if(timeFinal) {
        let timeFinalB = timeFinal;
        let timeInit = order.time;
        if (timeFinalB.length===10) {
          timeFinalB = '0'+timeFinalB;
        }
        if (timeInit.length===10) {
          timeInit = '0'+timeInit;
        }
        let hoursPassed;
        if (timeFinalB.substr(9, 2)==='PM'){
          hoursPassed=timeFinalB.substr(0,2)-timeInit.substr(0, 2)+12;
        } else if (timeFinalB.substr(9, 2)==='AM'){
          hoursPassed=timeFinalB.substr(0, 2)-timeInit.substr(0, 2);
        }
        let minPassed = timeFinalB.substr(3, 2)-timeInit.substr(3, 2);
        let secPassed = timeFinalB.substr(6, 2)-timeInit.substr(6, 2);
        if(secPassed<0){
          minPassed--;
          secPassed=60+secPassed;
        }
        if(minPassed<0){
          hoursPassed--;
          minPassed=60+minPassed;
        }
        let hours = hoursPassed.toString();
        let minutes = minPassed.toString();
        let seconds = secPassed.toString();
        
        if (hours.length < 2) {
          hours = "0"+hours;
        }
        if (minutes.length < 2) {
          minutes = "0"+minutes;
        }
        if (seconds.length < 2) {
          seconds = "0"+seconds;
        }
        return hours+':'+minutes+':'+seconds;
      }
      return;
    }
  /*
    const sendToMesonero = (orderEl) => {
          const newOrders = orders.filter((order)=>order.id !== orderEl.id);
          setOrders(newOrders);
          const timePrep = timePassed(orderEl.timeFinal, orderEl);
          firebase.firestore().collection('orders').doc(orderEl.id).update({listo: true, delivered: false, timePrep:timePrep});
      }; 
      */

    const sendToMesero = (orderEl) => {
        const timeFinal = new Date().toLocaleTimeString();
        const newOrders = orders.filter((order)=>order.id !== orderEl.id);
          setOrders(newOrders);
          const timePrep = timePassed(timeFinal, orderEl);
          firebase.firestore().collection('orders').doc(orderEl.id).update({timeFinal: timeFinal, listo: true, delivered: false, timePrep:timePrep});
          } 

    const listOrders = orders.map((order)=> 
    <div key={order.id} className='divOrderCocina'>
        <div className='heightOrder'>
            <div className='dateOrder'><span className='spanDateOrder'>Fecha: {order.date}</span></div>
            <div className='spanOrder'><span>Cliente: {order.cliente}</span></div>
            <ul>
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
        <div className='divPreparación'>
          <div>Inicio de preparación: {order.time}</div>
          <button type="button" className="btnPreparacion" onClick={()=>sendToMesero(order)}>Preparado</button>
        </div>
    </div>
    )

    return(<div className='viewCocina'>
      <header className='headerLogo'>
        <div className='divLogo'>
          <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
          <h1>BURGER QUEEN</h1>
        </div>
        <div className='btnHeader'>
          <div> <ToPedidosCocina/></div>
          <div> <ToPedidosEnviados/></div>
          <div> <Home/></div>
        </div>
      </header>
      <main className='mainCocina'>
        <ul className='orderCocina'>{listOrders}</ul>
      </main>
    </div>
    )
}

