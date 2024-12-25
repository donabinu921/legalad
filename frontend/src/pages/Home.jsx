import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Welcome to LegalAD!
      </h1>
      <p className="text-justify text-base text-gray-800 font-normal">
        "Empowering you with the legal insights you need, 
        right at your fingertips. Whether you're drafting contracts,
        analyzing documents, or seeking quick answers to legal questions,
        we're here to make the law accessible, efficient, and 
        tailored to you. Get started today!"
      </p>
    </div>
  );
};

export default Home;