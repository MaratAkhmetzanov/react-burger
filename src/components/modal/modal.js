import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styleModal from './modal.module.scss';

const Modal = ({ closeModal, children }) => {

  const handleCloseModal = () => {
    closeModal();
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  return (
    <div className={styleModal.modal_wrapper} onClick={stopPropagation}>
      <div className={clsx(styleModal.close, 'mt-10 mr-10')} onClick={handleCloseModal}>
        <CloseIcon type="primary" />
      </div>
      {children}
    </div>
  );
}


Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;