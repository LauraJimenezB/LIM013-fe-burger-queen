import { useEffect, useState } from 'react'; 
import firebase from './firebase';
import 'firebase/storage';

export function Cocina () {
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('orders').onSnapshot((snapshot)=>{
            const arrayOrder = []
            snapshot.forEach((unic) => {
              arrayOrder.push({
              id: unic.id,
              ...unic.data()
            });
        })
            setOrders(arrayOrder);
          })
        }, []);

        const listOrders = orders.map((order)=>
        <li key={order.id}>
            <span>{order.cliente}</span>
            <span>{order.total}</span>
            <ul className="listItems-order">
                {order.list.map((element)=>
                <li key={element.id}>{element.id}</li>)}
            </ul>
        </li>
        
        )

      //relacion logica en archivo
      //traer data de productos e ir conectando los id, con los productos que traemos
      //funcion que se encargue de esa logica y luego lo pintamos en el template
    // states *


      // KEY: para que react no vuelva a pintar toda la lista sino que se pinte el elemento que queremos
      //que cumpla funcionalidad

        return(<ul>{listOrders}</ul>)
}

