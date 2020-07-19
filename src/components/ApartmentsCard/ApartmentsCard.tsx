import React, { memo, useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

import { Price } from '../../api';
import ApartmentsTitle from '../ApartmentsTitle';
import styles from './ApartmentsCard.module.scss';

interface ApartmentsCardProps {
  id: number;
  image: string;
  name: string;
  capacity: number;
  location: string;
  price: Price;
}

const messages = defineMessages({
  bookNow: {
    id: 'apartmentsCard.bookNow',
    defaultMessage: 'Book Now',
  },
  learnMore: {
    id: 'apartmentsCard.learnMore',
    defaultMessage: 'Learn More',
  },
  perNight: {
    id: 'apartmentsCard.perNight',
    defaultMessage: 'Per night',
  },
});

const ApartmentsCard: React.FC<ApartmentsCardProps> = ({
  id,
  image,
  capacity,
  name,
  location,
  price,
}) => {
  const intl = useIntl();
  const historyLocation = useLocation();
  const nextLocation = useMemo(
    () => ({ ...historyLocation, pathname: `/apartments/${id}` }),
    [historyLocation, id]
  );

  return (
    <article className={styles.root}>
      <Link to={nextLocation} className={styles.imageContent}>
        <img src={image} className={styles.image} alt="" />
      </Link>
      <ApartmentsTitle name={name} capacity={capacity} location={location} />
      <div className={styles.price}>
        <span className={styles.priceText}>
          {price.value}
          {price.currency}
        </span>
        <span>{intl.formatMessage(messages.perNight)}</span>
      </div>
      <div className={styles.footer}>
        <Link to={nextLocation} className={styles.bookNow}>
          {intl.formatMessage(messages.bookNow)}
        </Link>
        <Link to={nextLocation} className={styles.learnMore}>
          {intl.formatMessage(messages.learnMore)}
        </Link>
      </div>
    </article>
  );
};

export default memo(ApartmentsCard);
