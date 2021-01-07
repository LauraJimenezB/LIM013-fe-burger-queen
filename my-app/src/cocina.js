import { useState, useEffect } from 'react';
import firebase from './firebase';

export function Cocina () {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('orders').onSnapshot((snapshot)=>{
          const orders = snapshot.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
          }))
          setOrders(orders);
        })
        }, [])

    const listOrders = orders.map((order)=> 
    <li key={order.id}>
        <span>{order.cliente}</span>
        <div>{order.list}</div>
        <span>{order.total}</span>
    </li>
    )
    return(<ul>{listOrders}</ul>)
}