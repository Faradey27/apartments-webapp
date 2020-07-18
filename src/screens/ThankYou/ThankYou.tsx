import React, { memo, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import styles from './ThankYou.module.scss';
import Icon, { IconName } from '../../components/Icon';
import Dialog from '../../components/Dialog';

const messages = defineMessages({
  pageTitle: {
    id: 'payment.pageTitle',
    defaultMessage: 'BOB W. - Some title',
  },
});

const ThankYou = () => {
  const intl = useIntl();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Dialog onClose={handleClose}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <div className={styles.content}>
        <Icon iconName={IconName.hosted} width={50} height={50} />
        <p className={styles.title}>Thank You!</p>
        <p className={styles.description}>
          Payment was successful! Booking information is sent to your e-mail.
          See you soon at Bob’s!
        </p>
      </div>
    </Dialog>
  );
};

export default memo(ThankYou);
