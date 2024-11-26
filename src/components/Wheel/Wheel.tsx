import React, { useRef, useState, useCallback } from 'react';
import styles from './Wheel.module.scss';
import rootStore from 'stores/RootStore/instance';

interface WheelOfFortuneProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onWin: (prize: string) => void;
}

const WheelOfFortune: React.FC<WheelOfFortuneProps> = React.memo(({ setIsModalOpen, onWin }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = useCallback(() => {
    if (containerRef.current && !isSpinning) {
      setIsSpinning(true);
      const number = Math.ceil(Math.random() * 5000) + 360;
      containerRef.current.style.transition = 'transform 3s ease-out';
      containerRef.current.style.transform = `rotate(${number}deg)`;

      setTimeout(() => {
        const finalAngle = number % 360;
        const winningSegment = getWinningSegment(finalAngle);
        onWin(`${winningSegment}%`);

        setIsModalOpen(false);

        if (rootStore.AuthStore.user) {
          rootStore.AuthStore.user.discount = parseInt(winningSegment);
        }

        setIsSpinning(false);
      }, 3000);
    }
  }, [isSpinning, setIsModalOpen]);

  const getWinningSegment = (angle: number): string => {
    if (angle - 30 >= 0 && angle - 30 < 60) return '10';
    if (angle - 30 >= 60 && angle - 30 < 120) return '5';
    if (angle - 30 >= 120 && angle - 30 < 180) return '10';
    if (angle - 30 >= 180 && angle - 30 < 240) return '25';
    if (angle - 30 >= 240 && angle - 30 < 300) return '5';
    if (angle - 30 >= 300 && angle - 30 < 360) return '15';
    return '15';
  };

  return (
    <div className={styles['wheel-container']}>
      <div className={styles.stoper}></div>

      <div className={styles.wheel} ref={containerRef}>
  <div className={`${styles.segment} ${styles.one}`}>Sale 15%</div>
  <div className={`${styles.segment} ${styles.two}`}>Sale 5%</div>
  <div className={`${styles.segment} ${styles.three}`}>Sale 25%</div>
  <div className={`${styles.segment} ${styles.four}`}>Sale 10%</div>
  <div className={`${styles.segment} ${styles.five}`}>Sale 5%</div>
  <div className={`${styles.segment} ${styles.six}`}>Sale 10%</div>
</div>


      <button
        className={styles['additional-spin-button']}
        onClick={handleSpin}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
});

export default WheelOfFortune;
