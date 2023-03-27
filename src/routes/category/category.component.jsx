import { useContext, useState, useEffect, Fragment } from 'react';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { useSelector } from 'react-redux';

import { selectCategories } from '../../store/categories/categories.selector';

import { CategoryContainer, Title } from './category.styles';

const Category = () => {
  
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategories);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;