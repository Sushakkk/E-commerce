import React from 'react';
import confetti from 'canvas-confetti';

const ConfettiButton: React.FC = () => {
  const launchConfetti = () => {
    confetti({
      particleCount: 500, // Количество частиц
      spread: 70, // Угол разлёта
      origin: { x: 0.5, y: 0.5 }, // Центр экрана
      colors: ['#405641', '#837983', '#cccbcb', '#94c2fe', '#c50200'], // Цвета конфетти
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <button
        onClick={launchConfetti}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#cf4762',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Celebrate!
      </button>
    </div>
  );
};

export default ConfettiButton;
