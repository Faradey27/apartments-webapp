import React, { memo } from 'react';

import styles from './BookWidget.module.scss';
import DatePicker from '../DatePicker';
import { useMediaQuery } from 'react-responsive';
import theme from '../../theme.scss';

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
      <button className={styles.bookNow}>Book Now</button>
    </div>
  );
};

export default memo(BookWidget);
