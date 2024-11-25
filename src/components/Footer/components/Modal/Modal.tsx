import React from 'react';
import styles from './Modal.module.scss';

interface AccountInfo {
  name: string;
  description: string;
  link: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountInfo: AccountInfo;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, accountInfo }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          <h2>{accountInfo.name}</h2>
          <p>{accountInfo.description}</p>
          <a href={accountInfo.link} target="_blank" rel="noopener noreferrer">Перейти на аккаунт</a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
