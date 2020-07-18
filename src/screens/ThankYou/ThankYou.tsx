import React, { memo, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import styles from './ThankYou.module.scss';
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

const ThankYou = () => {
  const intl = useIntl();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Modal isOpen={true} onRequestClose={handleClose} style={customStyles}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <section className={styles.content}>
        <div className={styles.titleWrap}>
          <div />
          <Icon
            iconName={IconName.close}
            className={styles.closeIcon}
            onClick={handleClose}
          />
        </div>
        <div className={styles.thankYouWrapper}>
          <div className={styles.thankYou}>
            <Icon iconName={IconName.hosted} width={50} height={50} />
            <p className={styles.thankYouTitle}>Thank You!</p>
            <p className={styles.description}>
              Payment was successful! Booking information is sent to your
              e-mail. See you soon at Bob’s!
            </p>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default memo(ThankYou);
