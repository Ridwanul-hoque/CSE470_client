import React, { useEffect } from 'react'; 
import Banner from './Banner/Banner';
import Products from './Banner/products';
import Review from '../Review/Review';
 

const Home = () => {
      useEffect(() => {
    // Inject the Botpress Webchat script
    const injectScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    // Inject the required scripts
    injectScript('https://cdn.botpress.cloud/webchat/v2.5/inject.js');
    injectScript('https://files.bpcontent.cloud/2025/05/03/18/20250503183802-I1967ZVL.js');

    // Cleanup function to remove scripts when the component unmounts
    return () => {
      const scripts = document.querySelectorAll(
        'script[src="https://cdn.botpress.cloud/webchat/v2.5/inject.js"], script[src="https://files.bpcontent.cloud/2025/05/03/18/20250503183802-I1967ZVL.js"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);
    return (
        <div className='bg-[#0D0D2B]'>
            <Banner></Banner>
            <Products></Products>
            <Review></Review>

        </div>
    );
};

export default Home;