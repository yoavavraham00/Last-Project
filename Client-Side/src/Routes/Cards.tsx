import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  Card  from '../DB/Model/card.model';

const ProductDisplay: React.FC = () => {
    const [cards, setCards] = useState<typeof Card[]>([]);

    useEffect(() => {
        axios.get('/api/v1/cards')
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
        </div>
    );
};

export default ProductDisplay;