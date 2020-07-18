import React, { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './ApartmentsCard.module.scss';
import ApartmentsTitle from '../ApartmentsTitle';
import Icon, { IconName } from '../Icon';

interface ApartmentsCardProps {
  id: number;
  image: string;
  name: string;
  capacity: number;
  location: string;
}

const ApartmentsCard: React.FC<ApartmentsCardProps> = ({
  id,
  image,
  capacity,
  name,
  location,
}) => {
  const historyLocation = useLocation();
  const nextLocation = useMemo(
    () => ({ ...historyLocation, pathname: `/apartments/${id}` }),
    [historyLocation, id]
  );

  return (
    <article className={styles.root}>
      <Link to={nextLocation} className={styles.imageContent}>
        <img src={image} className={styles.image} />
      </Link>
      <ApartmentsTitle name={name} capacity={capacity} location={location} />
      <Link to="/" className={styles.visualize}>
        <Icon iconName={IconName.d3} width={24} className={styles.pinIcon} />
        <span className={styles.visualizeText}>3D Virtual Tour</span>
      </Link>
      <div className={styles.footer}>
        <Link to="/" className={styles.bookNow}>
          Book Now
        </Link>
        <Link to="/" className={styles.learnMore}>
          Learn more
        </Link>
      </div>
    </article>
  );
};

export default memo(ApartmentsCard);
