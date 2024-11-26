import React, { useRef, useState } from 'react';
import './WheelOfFortune.css';
import rootStore from 'stores/RootStore/instance';

interface WheelOfFortuneProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Тип для функции setIsModalOpen
}

const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ setIsModalOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false); // Состояние для блокировки кнопки

  const handleSpin = () => {
    if (containerRef.current && !isSpinning) {
      setIsSpinning(true); // Блокируем кнопку
      const number = Math.ceil(Math.random() * 5000) + 360; // Угол вращения
      containerRef.current.style.transition = 'transform 3s ease-out';
      containerRef.current.style.transform = `rotate(${number}deg)`;

      // После завершения вращения
      setTimeout(() => {
        const finalAngle = number % 360;
        const winningSegment = getWinningSegment(finalAngle);
        alert(`Поздравляем! Вы выиграли: ${winningSegment}%`);

        // Закрытие модального окна
        setIsModalOpen(false);

        // Присваиваем выигранную скидку пользователю (в виде числа)
        if (rootStore.AuthStore.user) {
          rootStore.AuthStore.user.discount = parseInt(winningSegment); // Преобразуем в число
        }

        setIsSpinning(false); // Разблокируем кнопку
      }, 3000);
    }
  };

  // Функция для определения выигрышного сектора
  const getWinningSegment = (angle: number): string => {
    if (angle - 30 >= 0 && angle - 30 < 60) return '10';
    if (angle - 30 >= 60 && angle - 30 < 120) return '5';
    if (angle - 30 >= 120 && angle - 30 < 180) return '10';
    if (angle - 30 >= 180 && angle - 30 < 240) return '25';
    if (angle - 30 >= 240 && angle - 30 < 300) return '5';
    if (angle - 30 >= 300 && angle - 30 < 360) return '15';
    return '0'; // Если не попали в диапазон, вернем 0
  };

  return (
    <div className="wheel-container">
      <div className="stoper"></div>

      <div className="wheel" ref={containerRef}>
        <div className="segment one">Sale 10%</div>
        <div className="segment two">Sale 5%</div>
        <div className="segment three">Sale 10%</div>
        <div className="segment four">Sale 25%</div>
        <div className="segment five">Sale 5%</div>
        <div className="segment six">Sale 15%</div>
      </div>

      <button
        className="additional-spin-button"
        onClick={handleSpin}
        disabled={isSpinning} // Отключаем кнопку
      >
        {isSpinning ? 'Spinning...' : 'Spin Again'}
      </button>
    </div>
  );
};

export default WheelOfFortune;
