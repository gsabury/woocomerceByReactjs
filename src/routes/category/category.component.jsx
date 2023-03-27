import { useContext, useState, useEffect, Fragment } from 'react';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { useSelector } from 'react-redux';

import { selectCategories } from '../../store/categories/categories.selector';

import './category.styles.scss';

const Category = () => {
  
  const { category } = useParams();
  // console.log("Category component rendered");
  const categoriesMap = useSelector(selectCategories);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // console.log("Set proudct rendered")
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;