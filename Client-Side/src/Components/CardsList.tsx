import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import { ICard } from '../DB/Types/models.d';


const CardsList = () => {
    const [cards, setCards] = useState<ICard[]>([]);

    useEffect(() => {
        fetch('/api/v1/cards')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
                {cards.map(card => (
                    <CardComponent key={card._id.toString()} card={card} />
                ))}
            </div>
        </div>
    );
}

export default CardsList;