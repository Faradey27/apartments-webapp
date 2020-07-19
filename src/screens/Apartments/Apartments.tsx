import React, { memo, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import ApartmentsCard from '../../components/ApartmentsCard';
import IntroSection from '../../components/IntroSection';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import { useQuery } from '../../hooks/useQuery';
import {
  fetchApartmentsAction,
  selectApartments,
  selectApartmentsRequestState,
} from '../../state/apartments';
import styles from './Apartments.module.scss';

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
  const apartemntsRequestState = useSelector(selectApartmentsRequestState);

  const query = useQuery();
  const fromDate = query.get('fromDate');
  const toDate = query.get('toDate');

  const handleSearch = useCallback(() => {
    dispatch(fetchApartmentsAction(fromDate, toDate));
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    // fetch default apartments
    dispatch(fetchApartmentsAction(null, null));
  }, [dispatch]);

  return (
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <IntroSection onSearch={handleSearch} />
      <RequestStateVisualize requestState={apartemntsRequestState}>
        <div className={styles.content}>
          {apartments.map((apartment) => (
            <ApartmentsCard
              key={apartment.id}
              id={apartment.id}
              name={apartment.name}
              capacity={apartment.capacity}
              location={apartment.location}
              image={apartment.image}
              price={apartment.price}
            />
          ))}
        </div>
      </RequestStateVisualize>
    </main>
  );
};

export default memo(Apartments);
