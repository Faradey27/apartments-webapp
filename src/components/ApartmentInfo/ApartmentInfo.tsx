import React, { memo } from 'react';
import clsx from 'clsx';

import Icon, { IconName } from '../Icon';
import styles from './ApartmentInfo.module.scss';

interface ApartmentInfoProps {
  name: string;
  capacity: number;
  location: string;
  size?: 'small' | 'large';
}

const ApartmentInfo: React.FC<ApartmentInfoProps> = ({
  name,
  capacity,
  location,
  size = 'small',
}) => {
  return (
    <div className={styles.description}>
      <h3 className={clsx(styles.descriptionTitle, styles[size])}>{name}</h3>
      <div className={styles.metadata}>
        <div className={styles.numberOfPeople}>
          <Icon iconName={IconName.human} width={8} />
          <span>&nbsp; x {capacity}</span>
        </div>
        <div className={styles.location}>
          <Icon iconName={IconName.pin} width={16} className={styles.pinIcon} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ApartmentInfo);
