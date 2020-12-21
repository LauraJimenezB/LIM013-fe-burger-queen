import { useEffect, useState } from 'react';
import firebase from './firebase';

export function useVista () {
    const [vista1, setVista] = useState([0]);
  useEffect(() => {
    firebase.firestore().collection('items').where("categoria", "==", 'desayuno').onSnapshot((snapshot)=>{
      const item = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      }))
      setVista(item);
    })
  }, [])
  const listItems = vista1.map((item)=>
  <li key={item.id}>
    <div>{item.nombre}</div>
    <div>{item.precio}</div>
  </li>
  );
  return (<ul>{listItems}</ul>)
  }

  export function useVista2 () {
    const [vista2, setVista] = useState([1]);
  useEffect(() => {
    firebase.firestore().collection('items').where("categoria", "==", 'almuerzo').onSnapshot((snapshot)=>{
      const item = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      }))
      setVista(item);
    })
  }, [])
  const listItems = vista2.map((item)=>
  <li key={item.id}>
    <div>{item.nombre}</div>
    <div>{item.tipo}</div>
    <div>{item.precio}</div>
  </li>
  );
  return (<ul>{listItems}</ul>)
  }
  