import React, { memo } from 'react';

import styles from './BookWidget.module.scss';
import DatePicker from '../DatePicker';
import { useMediaQuery } from 'react-responsive';
import theme from '../../theme.scss';
import { Link } from 'react-router-dom';

interface BookWidgetProps {}

const BookWidget: React.FC<BookWidgetProps> = () => {
  const isTabletOrMobileScreen = useMediaQuery({
    maxWidth: parseInt(theme['breakpoints-tabletl']),
  });

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.price}>67$</span>
        <span className={styles.duration}>for 1 night</span>
      </div>
      <DatePicker
        type="dark"
        position={isTabletOrMobileScreen ? 'top' : 'right'}
      />
      <Link to="/apartments/2/payment">
        <button className={styles.bookNow}>Book bookNow</button>
      </Link>
    </div>
  );
};

export default memo(BookWidget);
