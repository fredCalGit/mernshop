import React from 'react'
import { Card } from 'antd';
import {EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import imageNotFound from '../images/Image-not-found.jpg';
import {Link} from 'react-router-dom'

const { Meta } = Card;

const ProductCard = ({product}) => {
    const {images, title, description, slug} = product

    return (
        <Card
        cover={<img alt="product" src={images && images.length ? images[0].url : imageNotFound} />}
            style={{height: '150px', objectFit: 'cover'}}
            className="p-1"
            actions={[
            <Link to={`/product/${slug}`}>
                <EyeOutlined className="text-warning" /> <br /> View Product
            </Link>
                ,
                <>
                <ShoppingCartOutlined  className="text-danger"/> <br /> Add to Cart
                </>
                ]}
            
        >
            <Meta title={title} description={`${description && description.length > 30 ? description.substring(0, 30) + '...': description}`}/>
            
        </Card>
    )
}

export default ProductCard
