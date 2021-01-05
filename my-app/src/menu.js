import { useEffect, useState, React} from 'react';
import firebase from './firebase';
import 'firebase/storage';
import './Pedidos.css';
import deletePic from './delete.svg';

export function VistaMenu (props) {
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

  const listItems = items.map((item)=>
  <li className="menuItem" onClick={()=>addItem(item)} key={item.id}>
    <span>{item.nombre}</span>
    <span>{'$'+item.precio}</span>
  </li>
  );

  //Agregar item a array de ORDER
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

  //Quitar item
  const deleteItem = (idItem) => {
    const newItems = selecteditems.filter((item)=>item.id !== idItem);
    menuItems(newItems);
  }

  //Aumentar cantidad del item
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

  //Disminuir cantidad del item
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

//Mostrar items seleccionados
  const listMenu = selecteditems.map((item)=>
  <li className="selectedItem" key={item.id} data-id={item.id}>
    <div className="nameSelectedItem">{item.nombre}</div> 
    <div> 
      <button name="button1" onClick={() => updateItemMore(item.id)}>+</button> {" "+ item.cantidad+ " "}
      <button name="button2" onClick={() => updateItemLess(item.id)}>-</button>
    </div> 
    <div>{'$'+item.precio}</div>
    <div>{'$'+item.total}</div>
    <button onClick={()=> deleteItem(item.id)}><img src={deletePic} className="deleteBtn" alt="deleteBtn"/></button>
  </li>
  );

  //Mostrar monto total
  const total = selecteditems.reduce(function(prev, curr){
    return prev + curr.total;
  },0);

  //Enviar orden (a firebase)
  const [input, setInput] = useState('');
  const orderedItems = selecteditems.map((item)=>({nombre: item.nombre, cantidad: item.cantidad}))

  const sendOrder = (input, listValue, totalValue) => {
    firebase.firestore().collection('orders').add({
      cliente: input,
      list: listValue,
      total: totalValue,
    });
  };

return (<div>
  <section className="menu"><ul className='listItems'>{listItems}</ul></section>
  <section className="order">
    <h2>ORDEN</h2>
    <input type="text" placeholder="Nombre del cliente" id="nombreCliente" value={input} onInput={e => setInput(e.target.value)}/>
    <ul className='listSelectedItems'>{listMenu}</ul>
    <h3>{'Total: $'+total}</h3>
    <button type="submit" className="btnSend" onClick={()=>sendOrder(input, orderedItems, total)}>Enviar la orden</button>
    </section>
  </div>)
}
  