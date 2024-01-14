import React from 'react';


const ProductDisplay: React.FC = () => {
    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-5">
            {/* Replace with actual product components/cards */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                <img className="w-full" src="/path_to_product.jpg" alt="Product" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Product Name</div>
                    <p className="text-gray-700 text-base">
                        Product Description
                    </p>
                </div>
            </div>
            {/* Repeat the above div for each product */}
        </section>
    );
};

export default ProductDisplay;