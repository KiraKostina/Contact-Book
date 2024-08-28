import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import css from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={e => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <IoMdClose style={{ width: 24, height: 24, fill: '#407BFF' }} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
