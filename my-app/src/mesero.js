import { VistaMenu } from './vistaMenu.js';
import burguer from './burguer.svg';
import './Pedidos.css';
import { PedidosListos } from './pedidosListos.js';
import { Home } from './toHome.js';
import { ToMenu } from './toMenu';
import { useState, useEffect, React } from 'react';
import firebase from './firebase';

export function Mesero(props) {
  const [orders, setOrders] = useState([]);

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

    return (
      <div>
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
        <VistaMenu/>
        
      </div>
      );
    }
