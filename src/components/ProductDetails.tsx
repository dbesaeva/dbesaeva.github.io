import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import { RootState } from '../services/store';
import { useSelector } from 'react-redux';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((prod) => prod.id === parseInt(id || '', 10));

  // Проверка наличия товара и разбиение ошибок
  if (!product) {
    return <Typography variant="h5">Товар не найден</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">{product.title}</Typography>
      <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Вернуться к списку
      </Button>
    </Container>
  );
};

export default ProductDetails;
