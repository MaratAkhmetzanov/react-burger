import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styleModal from './modal-overlay.module.scss';

const ModalOverlay = ({ closeModal, children }) => {

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  const handleCloseModal = () => {
    closeModal();
  }

  return (
    <div className={styleModal.overlay} onClick={handleCloseModal}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default ModalOverlay;