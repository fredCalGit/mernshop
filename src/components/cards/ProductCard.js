import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import imageNotFound from '../images/Image-not-found.jpg';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug } = product;

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">'Not rated yet'</div>
      )}

      <Card
        cover={
          <img
            alt="product"
            src={images && images.length ? images[0].url : imageNotFound}
            style={{ height: '200px', objectFit: 'cover' }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${
            description && description.length > 30
              ? description.substring(0, 30) + '...'
              : description
          }`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
