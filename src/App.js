import React from 'react';
import './App.css';
import PhoneForm from './Components/PhoneForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Add from './Components/Add';
import ProductsPage from './Components/ProductsPage';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<ProductsPage/>}/>
        <Route path='/product/:id' element={<PhoneForm/>}/>
        <Route path='/add' element={<Add/>}/>
      </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;