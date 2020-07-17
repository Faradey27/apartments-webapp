import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';

import styles from './HeaderBar.module.scss';

const HeaderBar: React.FC = () => {
  return (
    <nav className={styles.root}>
      <Link to="/" className={styles.logo}>
        <Logo className={styles.logoIcon} />
      </Link>
    </nav>
  );
};

export default memo(HeaderBar);
