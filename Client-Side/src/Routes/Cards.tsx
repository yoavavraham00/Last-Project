import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICard } from '../DB/Types/models.d'; // Import the Icard type

const ProductDisplay: React.FC = () => {
    const [cards, setCards] = useState<ICard[]>([]); // Fix the type name

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