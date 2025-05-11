import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import Review from '../Review/Review';
import Promotion from '../Promotion/Promotion';
import { Element } from 'react-scroll';

const Home = () => {
  useEffect(() => {
    // Function to inject a script into the DOM
    const injectScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    // Inject the Botpress Webchat scripts
    injectScript('https://cdn.botpress.cloud/webchat/v2.5/inject.js');
    injectScript('https://files.bpcontent.cloud/2025/05/03/18/20250503183802-I1967ZVL.js');


    // Cleanup function to remove the scripts when the component unmounts
    return () => {
      const scripts = document.querySelectorAll(
        'script[src="https://cdn.botpress.cloud/webchat/v2.5/inject.js"], script[src="https://files.bpcontent.cloud/2025/05/03/18/20250503183802-I1967ZVL.js"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);


    <div>
      <div className='bg-[#0D0D2B]'>
        <Banner />
      </div>
      {/* <Products></Products> */}
      <Review />


            
            {/* <Products></Products> */}
            <Element name="featured-section">
                <Promotion />
            </Element>

            <Element name="review-section">
                <Review />
            </Element>
     </div>
    );

};

export default Home;