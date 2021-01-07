import { useState } from 'react';
import deletePic from './delete.svg';
import firebase from './firebase';
import 'firebase/storage';

export function Order (props) {
    const [input, setInput] = useState('');
    
    //Mostrar items seleccionados
    const listMenu = props.selectedItems.map((item)=>
    <li className="selectedItem" key={item.id}>
      <div className="nameSelectedItem">{item.nombre}</div> 
      <div> 
        <button className="button1" name="button1" onClick={() => props.updateItemHandler(item.id, true)}>+</button> {" "+ item.cantidad+ " "}
        <button className="button1" name="button2" onClick={() => props.updateItemHandler(item.id, false)}>-</button>
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
      <ul className='listSelectedItems'>{listMenu}</ul>
      <h3>{'Total de'} {input}{': $'}{total}</h3>
      <button type="submit" className="btnSend" onClick={()=>sendOrder(input, orderedItems, total)}>Enviar la orden</button>
      </section>)
    }