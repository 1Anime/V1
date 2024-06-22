// pages/IframePage.js (or .jsx)

import Navbarcomponent from '@/components/navbar/Navbar'
import React from 'react';

const IframePage = () => {
  const Url = 'https://saucekudasai.com/'; // Replace with your URL

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbarcomponent/>
      <iframe
        src={Url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default IframePage;