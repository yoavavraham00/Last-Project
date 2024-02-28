import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ICard } from '../DB/Types/models';
import CardComponent from "../Components/CardComponent"


interface HeroSectionProps {
  card: ICard[];
}


export function SavedCardsPage() {
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    async function fetchSavedCards() {
      try {
        const apiUrl = 'http://localhost:3000/api/v1/cards/my-cards'; 
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSavedCards(response.data);
      } catch (error) {
        console.error('Error fetching saved cards:', error);
      }
    }

    fetchSavedCards();
  }, []);

  return (
    <div>
      <h1>Your Saved Cards</h1>
      <div className="cards-page">
        {savedCards.map((card) => (
          <CardComponent
            key={card._id}
            card={card}
          />
        ))}
      </div>
    </div>
  );
}