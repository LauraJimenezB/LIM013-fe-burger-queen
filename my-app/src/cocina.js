import { useState, useEffect } from 'react';
import firebase from './firebase';

export function Cocina () {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    //Traer orders de firebase
    useEffect(() => {
        firebase.firestore().collection('orders').onSnapshot((snapshot)=>{
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

/*
    const getName = (idElement) => {
        const getItem =  items.filter((item)=>item.id===idElement)[0];
        return (getItem.nombre);
    }
    */
    
    
    const listOrders = orders.map((order)=> 
    <div key={order.id} className='divSingleOrder'>
        <span>Cliente: {order.cliente}</span>
        <div>Hora: {order.timeOfOrder}</div>
        <ul className="listItems-order">
            {order.list.map((element)=>
            <li key={element.id}>
                <span>{element.cantidad}</span>
                <span>{element.id}</span>
                {/*<span>{getName(element.id)}</span>*/}
            </li>)}
        </ul>
        <span>Total: {order.total}</span>
    </div>
    )
    return(<ul className='orderSpace'>{listOrders}</ul>)
}