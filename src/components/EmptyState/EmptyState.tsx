import React, { memo } from 'react';

import Icon, { IconName } from '../../components/Icon';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  iconName?: IconName;
  title: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = IconName.coffeee,
  title,
  description,
}) => {
  return (
    <div className={styles.root}>
      <Icon iconName={iconName} width={50} height={50} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default memo(EmptyState);
