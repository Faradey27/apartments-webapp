import React, { memo, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import styles from './Payment.module.scss';
import Icon, { IconName } from '../../components/Icon';
import CreditCardForm from '../../components/CreditCardForm';
import Dialog from '../../components/Dialog';
import { Helmet } from 'react-helmet';

const messages = defineMessages({
  pageTitle: {
    id: 'payment.pageTitle',
    defaultMessage: 'BOB W. - Some title',
  },
});

const Payment = () => {
  const intl = useIntl();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.push('/apartments/2');
  }, [history]);

  return (
    <Dialog title="BOOK CENTRAL DESIGN STUDIO HOME" onClose={handleClose}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <div className={styles.metadata}>
        <div>
          <span className={styles.price}>67$</span>
          <span className={styles.duration}>for 1 night</span>
        </div>
        <div className={styles.date}>
          <span>24 July</span>
          <Icon
            width="24"
            iconName={IconName.arrowRight}
            className={styles.arrowRightIcon}
          />
          <span>25 July</span>
        </div>
      </div>
      <CreditCardForm />
    </Dialog>
  );
};

export default memo(Payment);
