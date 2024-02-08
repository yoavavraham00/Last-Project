import React from 'react';
import { ICard } from '../DB/Types/models.d';

type CardProps = {
    card: ICard;
};

const CardComponent: React.FC<CardProps> = ({ card }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4">
            <img className="w-full" src={card.image.url} alt={card.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.title}</div>
                {card.subtitle && <div className="text-gray-800 text-base">{card.subtitle}</div>}
                <p className="text-gray-700 text-base">{card.description}</p>
                <p className="text-gray-600 text-sm">Phone: {card.phone}</p>
                <p className="text-gray-600 text-sm">Email: {card.email}</p>
                {card.web && <p className="text-gray-600 text-sm">: {card.web}</p>}
                <p className="text-gray-600 text-sm">Address: {`${card.address.street}, ${card.address.city}`}</p>
                {/* Render other fields as needed */}
            </div>
        </div>
    );
};

export default CardComponent;