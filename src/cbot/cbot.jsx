import { Fab, Webchat } from '@botpress/webchat';
import { useState } from 'react';

const Chatbot = () => {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <>
      {isWebchatOpen && (
        <Webchat
          clientId="2cb1d414-03fd-413e-99ea-a0301a356d2e" // Your client ID here
          style={{
            width: '400px',
            height: '600px',
            display: 'flex',
            position: 'fixed',
            bottom: '90px',
            right: '20px',
          }}
        />
      )}
      <Fab
        onClick={toggleWebchat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      />
    </>
  );
};

export default Chatbot;