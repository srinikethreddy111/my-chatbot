import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './components/Chatbot';
import ProductDisplay from './components/ProductDisplay';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://127.0.0.1:5000/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(response.data,()=>{console.log(products)});
  };

  return (
    <div className="app-container">
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <>
          <Chatbot setProducts={setProducts}/>
          <ProductDisplay products={products} />
          <button onClick={fetchProducts}>Fetch Products</button>
        </>
      )}
    </div>
  );
};

export default App;
