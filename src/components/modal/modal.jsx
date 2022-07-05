import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styleModal from './modal.module.scss';
const modalRoot = document.getElementById('modal_root');

const Modal = ({ closeModal, children }) => {

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

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={styleModal.modal_wrapper} onClick={stopPropagation}>
        <div className={clsx(styleModal.close, 'mt-10 mr-10')} onClick={handleCloseModal}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}


Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;