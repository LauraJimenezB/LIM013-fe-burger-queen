import { useEffect, useState } from 'react';
import firebase from './firebase';

export function VistaMenu (props) {
  /* const tipoMenu = props.tipoMenu; */

  const [items, setItems] = useState([]);
  const [selecteditems, menuItems] = useState([]);
  const [count, setCount] = useState(0);
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
  <div>{item.nombre + " "}
    <button name="button1" onClick={() => setCount(count + 1)}>
    + 
    </button> {count+" "}
      <button name="button2" onClick={() => setCount(count - 1)}>
    -
      </button>
  </div> 
    
  <div>{'$'+item.precio}
 
    </div>
</li>
);
return (<div className="mainPedidos">
  <section><ul>{listItems}</ul></section>
  <section>
    <input type="text" placeholder="Nombre del cliente" id="nombreCliente"/>
    <div>
      <ul>{listMenu}</ul>
    </div>
    <button type="submit">Enviar la orden</button>
    </section>
  </div>)
}
  
/* function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}  */