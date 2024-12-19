import React from 'react';

const ProductDisplay = ({ products }) => (
  <div className="product-display">
    {products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))
    )}
  </div>
);

export default ProductDisplay;
