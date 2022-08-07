import React, { FC, SyntheticEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import styleModal from './modal.module.scss';

const modalRoot: HTMLElement = document.getElementById('modal_root') as HTMLElement;

type TProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal: FC<TProps> = ({ closeModal, children }): JSX.Element => {
  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={styleModal.modal_wrapper} onClick={stopPropagation}>
        <div className={clsx(styleModal.close, 'mt-10 mr-10')} onClick={handleCloseModal}>
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
