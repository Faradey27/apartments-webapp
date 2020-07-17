import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as HumanIcon } from './assets/human.svg';
import { ReactComponent as PinIcon } from './assets/pin.svg';
import { ReactComponent as D3Icon } from './assets/3d.svg';

import styles from './ApartmentsCard.module.scss';

interface ApartmentsCardProps {
  id: number;
  image: string;
}

const ApartmentsCard: React.FC<ApartmentsCardProps> = ({ id, image }) => {
  return (
    <article className={styles.root}>
      <Link to={`/apartments/${id}`} className={styles.imageContent}>
        <img src={image} className={styles.image} />
      </Link>
      <div className={styles.description}>
        <h3 className={styles.descriptionTitle}>Bla bla bla</h3>
        <div className={styles.metadata}>
          <div className={styles.numberOfPeople}>
            <HumanIcon width={8} />
            <span>&nbsp; x 2</span>
          </div>
          <div className={styles.location}>
            <PinIcon width={16} className={styles.pinIcon} />
            <span>Telliskivi, Tallinn</span>
          </div>
        </div>
      </div>
      <Link to="/" className={styles.visualize}>
        <D3Icon width={24} />
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
