import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Icon, { IconName } from '../Icon';
import styles from './HeaderBar.module.scss';

const HeaderBar: React.FC = () => {
  return (
    <nav className={styles.root}>
      <Link to="/" className={styles.logo}>
        <Icon iconName={IconName.bobw} className={styles.logoIcon} />
      </Link>
    </nav>
  );
};

export default memo(HeaderBar);
