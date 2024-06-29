import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 250px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductName = styled.div`
  padding: 10px;
  text-align: center;
`;

const ProductLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: bold;
`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://imate.pythonanywhere.com/api/phones/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
   <div>
     <h2 style={{textAlign: "center"}}>All Products</h2>
    <ProductsContainer>
        
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage 
            src={`https://imate.pythonanywhere.com${product.images}`} 
            alt={product.name} 
          />
          <ProductName>
            <ProductLink href={`/product/${product.id}`}>
              {product.name}
            </ProductLink>
          </ProductName>
        </ProductCard>
      ))}
    </ProductsContainer>
   </div>
  );
};

export default ProductsPage;