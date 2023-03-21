import React from 'react';

const ProductCard = ({ item }) => (
  <div className="product-item">
    <div className="product-img-wrapper">
      <img src={item.thumbnail} alt={`${item.title} Thumbnail`} />
    </div>
    <div className="product-item-title">{item.title}</div>
    <div>{`$${item.price}`}</div>
  </div>
);

export default ProductCard;