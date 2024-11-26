import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './SalutPage.module.scss';
import './SalutPage.css'

const SalutPage: React.FC = () => {
  const [showConfettiRain, setShowConfettiRain] = useState(false);

  // Функция для запуска Canvas конфетти
  const launchCanvasConfetti = () => {
    confetti({
      particleCount: 250, // Количество частиц
      spread: 120, // Угол разлёта
      origin: { x: 0.5, y: 0.5 }, // Центр экрана
      colors: ['#405641', '#837983', '#cccbcb', '#94c2fe', '#c50200'], // Цвета конфетти
    });
  };

  // Функция для запуска CSS-конфетти
  const triggerConfettiRain = () => {
    setShowConfettiRain(true);
    setTimeout(() => setShowConfettiRain(false), 3000); // Убираем эффект через 3 сек
  };

  return (
    <div className="salut-page">
      <h1>Welcome to the Celebration Page! 🎉</h1>

      {/* Кнопка Canvas-конфетти */}
      <button className="confetti-button" onClick={launchCanvasConfetti}>
        Launch Canvas Confetti 🎊
      </button>

      {/* Эффект мишуры */}
      {showConfettiRain && (
        <div className="confetti-container">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="confetti" style={{ '--i': i } as React.CSSProperties}></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalutPage;
