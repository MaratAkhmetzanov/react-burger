import React from 'react';
import PropTypes from 'prop-types';

import styleModal from './modal-overlay.module.scss';

const ModalOverlay = ({ closeModal, children }) => {

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