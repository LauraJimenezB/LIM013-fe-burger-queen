import { useState, useEffect, React } from 'react';
import firebase from './firebase';
import './Pedidos.css';

export function Cocina () {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    //Traer orders de firebase
    useEffect(() => {
        firebase.firestore().collection('orders').orderBy('time', 'desc').orderBy('date', 'desc').onSnapshot((snapshot)=>{
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
        const timeFinal = new Date().toLocaleTimeString()
        firebase.firestore().collection('orders').doc(order.id).update({timeFinal: timeFinal, estado: 'Preparado'});
       } 
        const sendToMesonero = (idOrder) => {
          const newOrders = orders.filter((order)=>order.id !== idOrder);
          setOrders(newOrders);
      }; 
    const listOrders = orders.map((order)=> 
    <div key={order.id} className='divSingleOrder'>
      <div>Fecha: {order.date}</div>
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
            <button type="button" className="btnPreparado" onClick={()=>checkClick(order)}>{order.estado}</button>
            <div>Inicio de preparación: {order.time}</div>
        <div>Fin de preparación: {order.timeFinal}</div>
        </ul>
        
        <button type="submit" className="btnSendToMesonero" onClick={()=>{sendToMesonero(order.id)}}>Listo</button>
    </div>
    )
    return(<ul className='orderSpace'>{listOrders}</ul>
    )
    
}

