import { useEffect, useState } from 'react';
import firebase from './firebase';

export function VistaMenu (props) {
  /* const tipoMenu = props.tipoMenu; */

  const [items, setItems] = useState([]);
  const [selecteditems, menuItems] = useState([]);
useEffect(() => {
  firebase.firestore().collection('items').where("categoria", "==", props.tipoMenu).onSnapshot((snapshot)=>{
    const items = snapshot.docs.map((doc)=> ({
      id: doc.id,
      ...doc.data()
    }))
    setItems(items);
  })
}, [props.tipoMenu])

  const addItem = (item) => {
    const newItem = {
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
    }
    menuItems([...selecteditems, newItem])
  }

const listItems = items.map((item)=>
<li onClick={()=>addItem(item)} key={item.id}>
  <div>{item.nombre}</div>
  <div>{'$'+item.precio}</div>
</li>
);

const listMenu = selecteditems.map((item)=>
<li key={item.id}>
  <div>{item.nombre}</div>
  <div>{'$'+item.precio}</div>
</li>
);
return (<div>
  <ul>{listItems}</ul>
  <ul>ORDEN {listMenu}</ul>
  </div>)
}
  