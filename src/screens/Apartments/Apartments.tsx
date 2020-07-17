import React, { memo, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchApartmentsAction,
  selectApartments,
} from '../../state/apartments';
import ApartmentsCard from '../../components/ApartmentsCard';

const messages = defineMessages({
  pageTitle: {
    id: 'apartments.pageTitle',
    defaultMessage: 'BOB W. - Apartments with hotel like features',
  },
});

const Apartments = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const apartments = useSelector(selectApartments);

  useEffect(() => {
    dispatch(fetchApartmentsAction());
  }, [dispatch]);

  return (
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      APARTMENTS
      {apartments.map((apartment) => (
        <ApartmentsCard key={apartment.id} id={apartment.id} />
      ))}
    </main>
  );
};

export default memo(Apartments);
