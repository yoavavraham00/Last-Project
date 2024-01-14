import React, { useState, useEffect } from 'react';

const CardsList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('/api/v1/cards') // Fetches cards from the API
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {cards.map(card => (
                <div key={card.id}>{card.title}</div> // Example of rendering cards
            ))}
        </div>
    );
};

export default CardsList;