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
        // Fetch the user's saved cards from your backend (you might need to send user authentication tokens here)
        const apiUrl = 'http://localhost:3000/api/v1/cards/my-cards'; // Update the URL with the correct endpoint
        const response = await axios.get(apiUrl);
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