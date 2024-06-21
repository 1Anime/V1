// pages/IframePage.js
import Navbarcomponent from '@/components/navbar/Navbar';

const IframePage = () => {
  const Url = 'https://stats.uptimerobot.com/3rm7LS7nJK'; // Replace with your URL

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbarcomponent />
      <iframe is="x-frame-bypass" src={Url} frameBorder="0" allowFullScreen style={{ width: '100%', height: '100%' }}></iframe>
    </div>
  );
};

export default IframePage;
