import React, { memo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  pageTitle: {
    id: 'payment.pageTitle',
    defaultMessage: 'BOB W. - Some title',
  },
});

const Payment = () => {
  const intl = useIntl();

  return (
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      PAYMENT
      <Link to="/thank-you">Pay</Link>
    </main>
  );
};

export default memo(Payment);
