import React, { memo } from 'react';
import Modal from 'react-modal';

import styles from './Dialog.module.scss';
import Icon, { IconName } from '../../components/Icon';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: 0,
  },
};

Modal.setAppElement(document.body);

interface DialogProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ children, title, onClose }) => {
  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title ? <span>{title}</span> : null}</h3>
        <Icon
          iconName={IconName.close}
          className={styles.closeIcon}
          onClick={onClose}
        />
      </div>
      {children}
    </Modal>
  );
};

export default memo(Dialog);
