import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import { Container, Grid, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import store from '../services/store';
import { useAppDispatch } from '../services/store';
import { setProducts, removeProduct } from '../services/productsSlice';

export type AppDispatch = typeof store.dispatch

const RecipeReviewCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [showLikedOnly, setShowLikedOnly] = useState<boolean>(false);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
    };
    fetchProducts();
  }, [dispatch]);

  const handleToggleLike = (id: number) => {
    setLikedProducts((prevLiked) => {
      const updated = new Set(prevLiked);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const filteredProducts = showLikedOnly
    ? products.filter((product) => likedProducts.has(product.id))
    : products;

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => setShowLikedOnly(!showLikedOnly)}
        sx={{ margin: '16px' }}
      >
        {showLikedOnly ? 'Показать все' : 'Показать только залайканные'}
      </Button>
      {loading && <Typography variant="h5">Загрузка товаров...</Typography>}
      {error && <Typography variant="h5">Ошибка: {error}</Typography>}
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <CardItem
              product={product}
              isLiked={likedProducts.has(product.id)}
              onToggleLike={() => handleToggleLike(product.id)}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeReviewCard;