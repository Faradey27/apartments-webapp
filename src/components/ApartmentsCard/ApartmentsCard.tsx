import React, { memo, useMemo } from 'react';
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

const ApartmentsCard: React.FC<ApartmentsCardProps> = ({
  id,
  image,
  capacity,
  name,
  location,
  price,
}) => {
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
        <span>Per night</span>
      </div>
      <div className={styles.footer}>
        <Link to={nextLocation} className={styles.bookNow}>
          Book Now
        </Link>
        <Link to={nextLocation} className={styles.learnMore}>
          Learn more
        </Link>
      </div>
    </article>
  );
};

export default memo(ApartmentsCard);
