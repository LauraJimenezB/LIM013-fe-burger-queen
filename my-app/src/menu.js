import { useState} from 'react';
import menuPic from './menu.svg';
import breakfastPic from './coffee.svg';
import dishPic from './dish.svg';
import bebidasPic from './tea.svg';
import burgerPic from './hamburger.svg';
import friesPic from './french-fries.svg';


export function Menu (props) {
    const items = props.items;
    let someItems = items;
    const [selectedItems, setSelectedItems] = useState([]);

    const desayunoClick = () => {
        someItems = items.filter((item)=>item.categoria==='desayuno');
        setSelectedItems(someItems);
      }
      const almuerzoClick = () => {
        someItems = items.filter((item)=>item.categoria==='almuerzo');
        setSelectedItems(someItems)
      }
      const bebidasClick = () => {
        someItems = items.filter((item)=>item.tipo==='Para tomar');
        setSelectedItems(someItems);
      }
      const hamburguesasClick = () => {
        someItems = items.filter((item)=>item.tipo==='hamburguesas');
        setSelectedItems(someItems);
      }
      const acompañamientosClick = () => {
        someItems = items.filter((item)=>item.tipo==='Acompañamientos');
        setSelectedItems(someItems);
      }
      const todoClick = () => {
        someItems = items;
        setSelectedItems(someItems);
      }

    return (
            <section className='menuSection'>
            <div className='menuHeader'>
              <button type="button" className='btnMenuType' onClick={todoClick}><img src={menuPic} className="iconLogo" alt="menuIcon"/><span className="nameCategory">Menu</span></button>
              <button type="button" className='btnMenuType' onClick={desayunoClick}><img src={breakfastPic} className="iconLogo" alt="breakfastIcon"/><span className="nameCategory">Desayuno</span></button>
              <button type="button" className='btnMenuType' onClick={almuerzoClick}><img src={dishPic} className="iconLogo" alt="dishIcon"/><span className="nameCategory">Almuerzo / Cena</span></button>
              <button type="button" className='btnMenuType' onClick={bebidasClick}><img src={bebidasPic} className="iconLogo" alt="bebidasIcon"/><span className="nameCategory">Bebidas</span></button>
              <button type="button" className='btnMenuType' onClick={hamburguesasClick}><img src={burgerPic} className="iconLogo" alt="burgerIcon"/><span className="nameCategory">Hamburguesas</span></button>
              <button type="button" className='btnMenuType' onClick={acompañamientosClick}><img src={friesPic} className="iconLogo" alt="friesIcon"/><span className="nameCategory">Acompañamientos</span></button>
            </div>
            <ul className="listItems">
                  {selectedItems.map((item)=>
                    <li className="menuItem" onClick={()=>props.addItem(item)} key={item.id}>
                        <div className='divImgItem'>
                            <img className='imgItem' src={item.img} alt={item.id}/>
                        </div>
                        <div className='divNameItem'>
                            <span>{item.nombre}</span>
                            <span>{'$'+item.precio}</span>
                        </div>
                    </li>

                )}
                </ul>
          </section>
      );
  }