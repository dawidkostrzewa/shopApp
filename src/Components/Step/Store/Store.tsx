import Style from './Store.module.scss';
import { api } from '../../Nav/API/API';
import { useState, useEffect } from 'react';
import { Product } from '../Home/Home';
import { CardItem } from '../../Utilis/CardItem/CardItem';

const Tile = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    api('products').then((result) => {
      setProducts(result);
    });
  }, []);
  const element = products.map((product) => {
    return (
      <>
        <CardItem data={product} />
      </>
    );
  });
  return <div className={Style.wrapTile}>{element}</div>;
};

const Store = () => {
  return (
    <div>
      <Tile />
    </div>
  );
};

export default Store;
