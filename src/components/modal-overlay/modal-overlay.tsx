import React, { FC } from 'react';

import styleModal from './modal-overlay.module.scss';

type TProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

const ModalOverlay: FC<TProps> = ({ closeModal, children }): JSX.Element => {
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className={styleModal.overlay} onClick={handleCloseModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
