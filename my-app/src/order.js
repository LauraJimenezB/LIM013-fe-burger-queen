import { useState } from 'react';
import deletePic from './delete.svg';
import orderPic from './orderC.svg';
import addPic from './addC.svg';
import lessPic from './lessC.svg';
import firebase from './firebase';
import 'firebase/storage';

export function Order (props) {
    const [input, setInput] = useState('');
    const [inputMesa, setInputMesa] = useState('');
    
    //Mostrar items seleccionados
    const listMenu = props.selectedItems.map((item)=>
    <li className="selectedItem" key={item.id}>
      <div className="divSelectedItem">{item.nombre}</div> 
      <div className="divSelectedItem"> 
        <button className="button1" name="button2" onClick={() => props.updateItemHandler(item.id, false)}>
            <img src={lessPic} className="iconBtn" alt="lessBtn"/>
        </button>
        {" "+ item.cantidad+ " "}
        <button className="button1" name="button1" onClick={() => props.updateItemHandler(item.id, true)}>
            <img src={addPic} className="iconBtn" alt="addBtn"/>
        </button> 
      </div> 
      <div className="divSelectedItem">{'$'+item.precio}</div>
      <div className="divSelectedItem">{'$'+item.total}</div>
      <div className="divSelectedItem"><button className="button1" onClick={()=> props.deleteItemHandler(item.id)}><img src={deletePic} className="deleteBtn" alt="deleteBtn"/></button></div>
    </li>
    );
    
    //Mostrar monto total
    const total = props.selectedItems.reduce(function(prev, curr){
      return prev + curr.total;
    },0);
    
    //Enviar orden (a firebase)
    const orderedItems = props.selectedItems.map((item)=>({id: item.id, cantidad: item.cantidad}));

    const resetOrder = () => {
        props.setSelectedItems([]);
        setInput('');
    }
    
    const sendOrder = (input, listValue, totalValue) => {
      firebase.firestore().collection('orders').add({
        cliente: input,
        list: listValue,
        total: totalValue,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    };
    
    return (
    <section className="order">
      <div className="orderHeader">
        <div className="inLine"><img src={orderPic} className="iconLogo" alt="orderLogo"/>
        <h2>ORDEN</h2></div>
        <div className="inLine">
            <div className="inLineSpace">Cliente: <input type="text" placeholder="Nombre del cliente" id="nombreCliente" value={input} onInput={e => setInput(e.target.value)}/></div>
            <div className="inLineSpace">Mesa: <input type="text" placeholder="Numero de mesa" id="numeroMesa" value={inputMesa} onInput={e => setInputMesa(e.target.value)}/></div>
        </div>
      </div>
      <ul className='listSelectedItems'>
          <li className='selectedItem'>
              <div className="divSelectedItemT">Item</div>
              <div className="divSelectedItemT">Cantidad</div>
              <div className="divSelectedItemT">Precio Unitario</div>
              <div className="divSelectedItemT">Precio total</div>
              <div className="divSelectedItemT"></div>
          </li>
          {listMenu}
      </ul>
      <h3>{'Monto Total'} {input}{': $'}{total}</h3>
      <button type="submit" className="btnSend" onClick={()=>{sendOrder(input, orderedItems, total); resetOrder()}}>Enviar la orden</button>
      </section>)
    }