import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import './AboutPage.css';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      style={{
        backgroundColor: 'lightblue',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export function AboutPage({ eventKey }) {
  return (

    <div className='bigDive2' style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
        Some Facts that you should know about us
      </h1>

      <p className='bigDive' style={{ fontSize: '18px', marginBottom: '20px', }}>
          In the early days, our business started as a small garage with a passion for cars.<br></br>
          We had a vision toprovide top-notch vehicles and excellent customer service.<br></br>
          Over time, our dedication led us to become a leading player in the used car industry.<br></br>
          As the demand for quality used cars increased, we expanded our operations and opened <br></br>
          multiple branchesacross the country.<br></br> 
          This growth was a testament to the trust our customers had in us and the quality of <br></br>
          our services. Our team consists of experienced professionals who share the same enthusiasm <br></br>
          for cars as our customers. We believe in transparency, integrity, and putting the customer's<br></br>
          needs first. Today, we stand proudly as a top choice for individuals looking for reliable used cars.<br></br>
          Our inventory is carefully curated to ensure that every vehicle meets our high standards<br></br>
          of quality and performance. With a strong online presence and a user-friendly website,<br></br>
          we make it easy for customers to explore our range of cars, compare options, and find the perfect <br></br>
          vehicle that suits their preferences and budget.<br></br>
          Over the years, we've had the privilege of serving thousands of satisfied customers. Our commitment to<br></br>
          customer satisfaction remains unwavering, and we continue to evolve and innovate to meet the changing<br></br>
          needs of the market. We are excited about the future and are dedicated to continuing our journey of<br></br>
          growth and excellence in the used car industry. Thank you for being a part of our story.<br></br>
        </p>
        <div className="image-container">
        </div>
      <br />
      <hr />
      </div>
  );
} 