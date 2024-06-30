import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  position: relative;
  padding-top: 60px;
`;

const AddButton = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #45a049;
  }
`;

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

const ProductLink = styled(Link)`
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
    <PageContainer>
      <AddButton style={{backgroundColor: "rgb(24, 24, 96)"}} to="/add">Add Product</AddButton>
      <h2 style={{textAlign: "center"}}>All Products</h2>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage 
              src={`https://imate.pythonanywhere.com${product.images}`} 
              alt={product.name} 
            />
            <ProductName>
              <ProductLink to={`/product/${product.id}`}>
                {product.name}
              </ProductLink>
            </ProductName>
          </ProductCard>
        ))}
      </ProductsContainer>
    </PageContainer>
  );
};

export default ProductsPage;