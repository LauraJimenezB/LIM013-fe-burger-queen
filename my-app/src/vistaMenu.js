import { useEffect, useState, React} from 'react';
import firebase from './firebase';
import 'firebase/storage';
import './Pedidos.css';
import { Menu } from './menu.js';
import { Order } from './order.js';

export function VistaMenu (props) {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

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

  //Agregar items a la ORDEN
  const addItem = (item) => {
    if (selectedItems.some(selecteditemsElement=> (selecteditemsElement.id === item.id))) {
      setSelectedItems(selectedItems);
    } else {
      const newItem = {
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: 1,
        total: item.precio,
      }
        setSelectedItems([...selectedItems, newItem])
    }
    }

  //Quitar item
  const deleteItem = (idItem) => {
  const newItems = selectedItems.filter((item)=>item.id !== idItem);
  setSelectedItems(newItems);
}

//Aumentar cantidad del item
const updateItem = (idItem, isMore) => {
  const cant = (isMore) ?  1 :  -1;
  const newItems = selectedItems.map((item) => {
    if (item.id === idItem) {
      if (item.cantidad === 0 && !isMore) {
        return item;
      }
      return {
        ...item,
        cantidad: item.cantidad + cant,
        total: item.precio*(item.cantidad+cant),
      }
    }
    return item
  });
  setSelectedItems(newItems);
}
return (
  <div className='mainMenu'>
    <Menu items={items} addItem={addItem}/>
    <Order selectedItems={selectedItems} setSelectedItems={setSelectedItems} updateItemHandler={updateItem} deleteItemHandler={deleteItem}/>
  </div>
)
  }
  
  