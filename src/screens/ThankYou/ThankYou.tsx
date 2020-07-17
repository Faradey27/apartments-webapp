import React, { memo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  pageTitle: {
    id: 'thankYou.pageTitle',
    defaultMessage: 'BOB W. - Thank You!',
  },
});

const ThankYou = () => {
  const intl = useIntl();

  return (
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      ThankYou
      <Link to="/">Go to main page</Link>
    </main>
  );
};

export default memo(ThankYou);
