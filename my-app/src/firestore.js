import { useEffect, useState } from 'react';
import firebase from './firebase';

export function VistaMenu (props) {
  /* const tipoMenu = props.tipoMenu; */

  const [items, setItems] = useState([]);
useEffect(() => {
  firebase.firestore().collection('items').where("categoria", "==", props.tipoMenu).onSnapshot((snapshot)=>{
    const items = snapshot.docs.map((doc)=> ({
      id: doc.id,
      ...doc.data()
    }))
    setItems(items);
  })
}, [props.tipoMenu])

const listItems = items.map((item)=>
<li key={item.id}>
  <div>{item.nombre}</div>
  <div>{item.precio}</div>
</li>
);
return (<ul>{listItems}</ul>)
}
  