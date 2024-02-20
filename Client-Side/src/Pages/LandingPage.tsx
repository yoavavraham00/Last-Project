import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./Style/LandingPage.css"; 
import { ICard } from '../DB/Types/models';


interface HeroSectionProps {
  cards: ICard[];
}

  const HeroSection: React.FC<HeroSectionProps> = ({ cards }) => {
    const [showBoard, setShowBoard] = useState(false); // State to show/hide the board
  
    const toggleBoard = () => {
      setShowBoard(!showBoard); // Toggle the state
    };

    return (
        <>
          <section className="background">
            <div className="bg-fraternity-club-image bg-cover bg-center h-screen flex justify-center items-center"></div>
            <div className='smoke'></div>
            <div className='walk'></div>
              <div className="text-center">
                  <h1 className="text-5xl text-gray-300 font-bold mb-4">Welcome to Our Exclusive Marketplace</h1>
                  <p className="text-2xl text-gray-300 bold">Discover timeless treasures and unique finds</p>      
                  </div>
                  <div className={`wood-panel ${showBoard  ?  'show' : 'hide'}`}>
          {cards.slice(0, 20).map(card => (
            <div className="show"  >
            <div className="card-container" key={card._id.toString()}>
              <Card className='card'>
                <Card.Img className='card-image' variant="top" src={card.image.url} />
                <Card.Body className='card-body'>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text> {card.description}</Card.Text>
                  <Card.Link className='card-button' href={`mailto:${card.email}`}>Email Us</Card.Link>
                </Card.Body>
              </Card>
              </div>
              </div>
                    ))}
                    </div> 
                    <button className="classic-button" onClick={toggleBoard} >TouchMe</button>            
          </section>
        </> 
    );
};

export default HeroSection;

