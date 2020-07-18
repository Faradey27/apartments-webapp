import React, { memo, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import styles from './Payment.module.scss';
import Icon, { IconName } from '../../components/Icon';
import clsx from 'clsx';

const messages = defineMessages({
  pageTitle: {
    id: 'payment.pageTitle',
    defaultMessage: 'BOB W. - Some title',
  },
});

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

const Payment = () => {
  const intl = useIntl();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.push('/apartments/2');
  }, [history]);

  const handleSubmit = useCallback(() => {
    history.push('/apartments/2/thank-you');
  }, []);

  return (
    <Modal isOpen={true} onRequestClose={handleClose} style={customStyles}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <form className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>
            <span>BOOK CENTRAL DESIGN STUDIO HOME</span>
          </h3>
          <Icon
            iconName={IconName.close}
            className={styles.closeIcon}
            onClick={handleClose}
          />
        </div>
        <div className={styles.metadata}>
          <div className={styles.header}>
            <span className={styles.price}>67$</span>
            <span className={styles.duration}>for 1 night</span>
          </div>
          <div className={styles.dateInput}>
            <span>24 July</span>
            <Icon
              width="24"
              iconName={IconName.arrowRight}
              className={styles.arrowRightIcon}
            />
            <span>25 July</span>
          </div>
        </div>
        <label className={styles.field}>
          Your Full Name
          <input className={styles.input} />
        </label>
        <label className={styles.field}>
          Card number
          <input className={styles.input} />
        </label>
        <div className={clsx(styles.field, styles.expiresAndCvv)}>
          <label className={styles.expires}>
            Expires at
            <input className={styles.input} />
          </label>
          <label className={styles.cvv}>
            CVV
            <input className={styles.input} />
          </label>
        </div>
        <button className={styles.pay} type="submit">
          Pay 67$
        </button>
      </form>
    </Modal>
  );
};

export default memo(Payment);
