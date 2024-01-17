import React from 'react';
import '../App.css';

const HeroSection: React.FC = () => {
    return (
        <>
          <section className="hero bg-cover" style={{ backgroundImage: "url('./Pictures/club-background.png')" }}>
            <div className="bg-fraternity-club-image bg-cover bg-center h-screen flex justify-center items-center">
              <div className="text-center">
                  <h1 className="text-5xl text-gray-300 font-bold mb-4">Welcome to Our Exclusive Marketplace</h1>
                  <p className="text-2xl text-gray-300 bold">Discover timeless treasures and unique finds</p>      
                  <div className="club-elements" ></div>
                  <div className="smoke" style={{ top: '30%', left: '50%' }}></div>
                  <div className="person"></div>
                  <div className="wood-panel">
                {/* Here you will map your products to display them */}
          </div>      
              </div>
            </div>
          </section>
        </>
    );
};

export default HeroSection;