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

    const getName = (idOrderElement) => {
        const item =  items.filter((item)=>item.id===idOrderElement)[0];
        return item.nombre;
    }
    
    const listOrders = orders.map((order)=> 
    <div key={order.id}>
        <span>{order.cliente}</span>
        <ul className="listItems-order">
            {order.list.map((element)=>
            <li key={element.id+element.nombre}>
                <span>{element.cantidad}</span>
                <span>{getName(element.id)}</span>
            </li>)}
        </ul>
        <span>{order.total}</span>
    </div>
    )
    return(<ul>{listOrders}</ul>)
}