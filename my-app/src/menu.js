import { useEffect, useState } from 'react';
import firebase from './firebase';
import './Pedidos.css';

export function VistaMenu (props) {
  /* const tipoMenu = props.tipoMenu; */

  const [items, setItems] = useState([]);
  const [selecteditems, menuItems] = useState([]);
  // const [count, setCount] = useState(0);
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
    if (selecteditems.some(selecteditemsElement=> (selecteditemsElement.id === item.id))) {
      menuItems(selecteditems);
    } else {
      const newItem = {
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: 1,
        total: item.precio,
      }
        menuItems([...selecteditems, newItem])
    }
    }

  const deleteItem = (idItem) => {
    const newItems = selecteditems.filter((item)=>item.id !== idItem);
    menuItems(newItems);
  }

  const updateItemMore = (idItem) => {
    const newItems = selecteditems.map((item) => {
      if (item.id === idItem) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
          total: item.precio*(item.cantidad+1),
        }
      }
      return item
    });
    menuItems(newItems);
  }

   const updateItemLess = (idItem) => {
    const newItems = selecteditems.map((item) => {
      if (item.id === idItem) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
          total: item.precio*(item.cantidad-1),
        }
      }
      return item
    });
    menuItems(newItems);
  }
 
const listItems = items.map((item)=>
<li className="menuItem" onClick={()=>addItem(item)} key={item.id}>
  <div>{item.nombre}</div>
  <div>{'$'+item.precio}</div>
</li>
);

const listMenu = selecteditems.map((item)=>
<li key={item.id} data-id={item.id}>
  <div>{item.nombre + " "}
    <button name="button1" onClick={() => updateItemMore(item.id)}>
    + 
    </button> {item.cantidad}
    <button name="button2" onClick={() => updateItemLess(item.id)}>
    -
      </button>
  </div> 
  <div>{'$'+item.precio}</div>
  <div>{'$'+item.total}</div>
  <button onClick={()=> deleteItem(item.id)}>x</button>
</li>
);
return (<div className='order'>
  <section className="menu"><ul className='listItems'>{listItems}</ul></section>
  <section>
    <h2>ORDEN:</h2>
    <input type="text" placeholder="Nombre del cliente" id="nombreCliente"/>
    <ul>{listMenu}</ul>
    <h3>Total</h3>
    <button type="submit">Enviar la orden</button>
    </section>
  </div>)
}
  