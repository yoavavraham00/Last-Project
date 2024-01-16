import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';
import { ICard } from '../DB/Types/models.d';

const ProductDisplay: React.FC = () => {
    const [cards, setCards] = useState<ICard[]>([]);

    useEffect(() => {
        axios.get('/api/v1/cards')
            .then(response => setCards(response.data))
            .catch(error => console.error('Error fetching cards:', error));
    }, []);

    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-5">
            {cards.map(card => (
                <CardComponent key={card._id.toString()} card={card} />
            ))}
        </section>
    );
};

export default ProductDisplay;