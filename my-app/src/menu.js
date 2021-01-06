import { useEffect, useState, React} from 'react';
import firebase from './firebase';
import 'firebase/storage';
import './Pedidos.css';
import deletePic from './delete.svg';

function Menu (props) {
  const listItems = props.items.map((item)=>
  <li className="menuItem" onClick={()=>props.addItem(item)} key={item.id}>
    <div className='divImgItem'>
      <img className='imgItem' src={item.img} alt={item.id}/>
    </div>
    <div className='divNameItem'>
      <span>{item.nombre}</span>
      <span>{'$'+item.precio}</span>
    </div>
  </li>
  );
  return (<section className="menu"><ul className='listItems'>{listItems}</ul></section>)
}

function Order (props) {
const [input, setInput] = useState('');

//Mostrar items seleccionados
const listMenu = props.selectedItems.map((item)=>
<li className="selectedItem" key={item.id}>
  <div className="nameSelectedItem">{item.nombre}</div> 
  <div> 
    <button name="button1" onClick={() => props.updateItemHandler(item.id, true)}>+</button> {" "+ item.cantidad+ " "}
    <button name="button2" onClick={() => props.updateItemHandler(item.id, false)}>-</button>
  </div> 
  <div>{'$'+item.precio}</div>
  <div>{'$'+item.total}</div>
  <button onClick={()=> props.deleteItemHandler(item.id)}><img src={deletePic} className="deleteBtn" alt="deleteBtn"/></button>
</li>
);

//Mostrar monto total
const total = props.selectedItems.reduce(function(prev, curr){
  return prev + curr.total;
},0);

//Enviar orden (a firebase)
const orderedItems = props.selectedItems.map((item)=>({id: item.id, cantidad: item.cantidad}))

const sendOrder = (input, listValue, totalValue) => {
  firebase.firestore().collection('orders').add({
    cliente: input,
    list: listValue,
    total: totalValue,
  });
};

return (
<section className="order">
  <h2>ORDEN</h2>
  <input type="text" placeholder="Nombre del cliente" id="nombreCliente" value={input} onInput={e => setInput(e.target.value)}/>

{/* {" "}-{input}- */}
  <ul className='listSelectedItems'>{listMenu}</ul>
  <h3>{'Total de'} {input}{': $'}{total}</h3>
  <button type="submit" className="btnSend" onClick={()=>sendOrder(input, orderedItems, total)}>Enviar la orden</button>
  </section>)
}

export function VistaMenu (props) {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

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
  <div>
    <Menu items={items} addItem={addItem}/>
    <Order selectedItems={selectedItems} updateItemHandler={updateItem} deleteItemHandler={deleteItem}/>
  </div>
)
  }
  
  