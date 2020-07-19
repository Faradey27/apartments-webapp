import React, { memo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import Dialog from '../../components/Dialog';
import EmptyState from '../../components/EmptyState';
import { IconName } from '../../components/Icon';

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
      <EmptyState
        iconName={IconName.hosted}
        title="Thank you!"
        description="Payment was successful! Booking information is sent to your e-mail. See you soon at Bob’s!"
      />
    </Dialog>
  );
};

export default memo(ThankYou);
