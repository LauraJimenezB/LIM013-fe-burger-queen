import { useState, useEffect } from 'react';
import firebase from './firebase';

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
     
    const checkClick = () => {
      const timeFinal = new Date().toLocaleTimeString()
      return <div>Preparación finalizada:{timeFinal}</div>
     } 
    const listOrders = orders.map((order)=> 
    <div key={order.id} className='divSingleOrder'>
        <span>Cliente: {order.cliente}</span>
        <div>Fecha: {order.date}</div>
        <div>Inicio de preparación: {order.time}</div>
        {checkClick}
        <div className='hola'> <button type="radio" value="check" onClick={checkClick}> Preparado</button></div>
        <ul className="listItems-order">
            { items.length > 0 ?
                 order.list.map((element)=>
                    <li key={element.id}>
                        <span>{element.cantidad}</span>
                        <span>{getName(element.id)}</span>
                    </li>)
            : 'loading' }
        </ul>
        <span>Total: ${order.total}</span>
    </div>
    )
    return(<ul className='orderSpace'>{listOrders}</ul>
    )
    
}

