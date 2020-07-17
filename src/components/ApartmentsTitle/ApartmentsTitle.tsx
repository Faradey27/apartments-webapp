import React, { memo } from 'react';

import styles from './ApartmentsTitle.module.scss';
import Icon, { IconName } from '../Icon';

interface ApartmentsTitleProps {
  name: string;
  capacity: number;
  location: string;
}

const ApartmentsTitle: React.FC<ApartmentsTitleProps> = ({
  name,
  capacity,
  location,
}) => {
  return (
    <div className={styles.description}>
      <h3 className={styles.descriptionTitle}>{name}</h3>
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

export default memo(ApartmentsTitle);
