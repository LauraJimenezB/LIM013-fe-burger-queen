export function Menu (props) {
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