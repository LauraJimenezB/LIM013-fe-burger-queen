import { useState, useEffect, React } from 'react';
import firebase from './firebase';
import './Pedidos.css';
import burguer from './burguer.svg';

export function Cocina () {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    //Traer orders de firebase
    useEffect(() => {
        firebase.firestore().collection('orders').where('listo','==',false).orderBy('time', 'desc').orderBy('date', 'desc').onSnapshot((snapshot)=>{
          const orders = snapshot.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
          }))
          setOrders(orders);
        })
        }, [])

      
        //Traer items de firebase
        useEffect(() => {
          firebase.firestore().collection('items').onSnapshot((snapshot)=>{
            const items = snapshot.docs.map((doc)=> ({
              id: doc.id,
              ...doc.data()
            }))
            setItems(items);
          })
        }, [])


    const getName = (idElement) => {
        const getItem =  items.filter((item)=>item.id===idElement)[0];
        return (getItem.nombre);
    }

    const checkClick = (order) => {
      const timeFinal = new Date().toLocaleTimeString();
      firebase.firestore().collection('orders').doc(order.id).update({timeFinal: timeFinal, estado: 'Preparado'});
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
        let hoursPassed = timeFinalB.substr(0, 2)-timeInit.substr(0, 2);
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
      
    const sendToMesonero = (idOrder) => {
          const newOrders = orders.filter((order)=>order.id !== idOrder);
          setOrders(newOrders);
          firebase.firestore().collection('orders').doc(idOrder).update({listo: true});
      }; 

    const listOrders = orders.map((order)=> 
    <div key={order.id} className='divSingleOrder'>
        <div className='dateOrder'><span className='spanDateOrder'>Fecha: {order.date}</span></div>
        <span>Cliente: {order.cliente}</span>
        <ul className="listItems-order">
            { items.length > 0 ?
                 order.list.map((element)=>
                    <li key={element.id}>
                        <span>{element.cantidad}</span>
                        <span>{getName(element.id)}</span>
                    </li>)
            : 'loading' }
            <span>Total: ${order.total}</span>
            <br></br>
        </ul>
        <span>Total: ${order.total}</span>
        <div className='divEstadoPreparación'>
          <button type="button" className={ order.estado==='En preparación' ? "btnPreparacion" : 'btnPreparado' } onClick={()=>checkClick(order)}>{order.estado}</button>
          <div>Inicio de preparación: {order.time}</div>
          <div>Fin de preparación: {order.timeFinal}</div>
          <div>Tiempo: {timePassed(order.timeFinal, order)}</div>
        </div>
        <div className='divListo'>
          <button type="submit" className="btnSendToMesonero" onClick={()=>{sendToMesonero(order.id)}}>Listo</button>
        </div>
    </div>
    )

    return(<div>
      <header>
      <div className='logoImg'><img src={burguer} className="Logo" alt="logo"/></div>
      <h1>BURGER QUEEN</h1>
    </header><ul className='orderSpace'>{listOrders}</ul>
    </div>
    )
    
}

