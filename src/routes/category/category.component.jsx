import {useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { useSelector } from 'react-redux';

import { selectCategories, selectIsLoading} from '../../store/categories/categories.selector';

import { CategoryContainer, Title } from './category.styles';

import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
  
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategories);

  const isLoading = useSelector(selectIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {
        isLoading ? (
          <Spinner></Spinner>
        )
        : (
          <CategoryContainer>
              {products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </CategoryContainer>
        )}
    </>
  );
};

export default Category;