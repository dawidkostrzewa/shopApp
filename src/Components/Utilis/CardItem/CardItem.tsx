import { Img } from '../Img/Img';
import Style from './CardItem.module.scss';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

type CardItemProps = {
  data: Product;
  otherData: string;
};

export const CardItem = ({ data }: CardItemProps) => {
  const product = data;

  return (
    <div className={Style.wrapProduct} key={product.id}>
      <Img img={product.images} />
      <div className={Style.wrapDescription}>
        <p className={Style.descriptionTitle}>{product.title}</p>
        <p className={Style.description}>{product.description}</p>
        <div className={Style.wrapPrince}>
          <p className={Style.prince}>{product.price} $</p>
          <button className={Style.btnAdd} onClick={() => console.log('ok')}>
            Learn More Now!
          </button>
        </div>
      </div>
    </div>
  );
};
