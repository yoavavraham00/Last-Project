import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import { ICard } from '../DB/Types/models.d';

interface ProductDisplayProps {
    cards: ICard[];
  }  

const ProductDisplay: React.FC<ProductDisplayProps> = ({ cards }) => {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-5">
        {cards.map(card => (
          <CardComponent key={card._id.toString()} card={card} />
        ))}
      </section>
    );
  };
  
  export default ProductDisplay;