/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import React from 'react';
import { render } from '@testing-library/react';
 
import Cocina from './cocina.js';
/*import Order from './order.js';

const setSelectedItems = () => {
  return;
}
const updateItem = () => {
  return;
}
const deleteItem = () => {
  return;
}
const selectedItems = [{id:'123', nombre:'Hola', precio:'12', total:'15'}, {id:'123', nombre:'Hola', precio:'12', total:'15'}]
*/
describe('Cocina', () => {
  test('renders Order component', () => {
    render(<Cocina/>);
    /*
    render(<Order selectedItems={selectedItems} setSelectedItems={setSelectedItems} 
      updateItemHandler={updateItem} deleteItemHandler={deleteItem}/>);
      */
  })
});