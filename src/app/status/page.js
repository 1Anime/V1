// pages/IframePage.js
import Navbarcomponent from '@/components/navbar/Navbar';
import dynamic from 'next/dynamic'; // Import dynamic for loading the x-frame-bypass component

const DynamicIframe = dynamic(() => import('@megatunger/x-frame-bypass'), {
  ssr: false, // Disable server-side rendering for this component
});

const IframePage = () => {
  const Url = 'https://stats.uptimerobot.com/3rm7LS7nJK'; // Replace with your URL

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbarcomponent />
      <DynamicIframe src={Url} frameBorder="0" allowFullScreen style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default IframePage;
