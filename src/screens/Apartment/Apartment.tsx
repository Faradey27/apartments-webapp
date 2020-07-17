import React, { memo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  pageTitle: {
    id: 'apartment.pageTitle',
    defaultMessage: 'BOB W. - Some apartment',
  },
});

const Apartment = () => {
  const intl = useIntl();

  return (
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      APARTMENT
      <Link to="/payment">Book now</Link>
    </main>
  );
};

export default memo(Apartment);
