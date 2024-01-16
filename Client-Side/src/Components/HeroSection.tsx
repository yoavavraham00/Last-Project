
import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="hero bg-cover " style={{ backgroundImage: "url('./Pictures/club-background.png')" }}>
          <div className="bg-fraternity-club-image bg-cover bg-center h-screen flex justify-center items-center">
    <div className="text-center">
        <h1 className="text-5xl text-gray-300 font-bold mb-4">Welcome to Our Exclusive Marketplace</h1>
        <p className="text-2xl text-gray-300 bold ">Discover timeless treasures and unique finds</p>
    </div>
</div>
        </section>
    );
};

export default HeroSection;