import React from 'react'
import { Card } from 'antd';
import imageNotFound from '../images/Image-not-found.jpg';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'


const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    const {title, description, images, slug} = product
    return (
        <div>
            <Card 
            // hoverable
            cover={
                <img alt="product" src={images && images.length ? images[0].url : imageNotFound} />
            }
            style={{height: '150px', objectFit: 'cover'}}
            actions={[<Link to={`/admin/product/${slug}`}>
            <EditOutlined className="text-warning" />
            </Link>
                ,
                <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger"/>]}
            className='p-1'
            >
                <Meta title={title} description={`${description && description.length > 30 ? description.substring(0, 30) + '...': description}`}/>
            </Card>
        </div>
    )
}

export default AdminProductCard

