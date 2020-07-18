import React, { memo, useMemo } from 'react';

import styles from './BookWidget.module.scss';
import DatePicker from '../DatePicker';
import { useMediaQuery } from 'react-responsive';
import theme from '../../theme.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import PriceWidget from '../PriceWidget';
import { Price } from '../../api';

interface BookWidgetProps {
  price: Price;
}

const BookWidget: React.FC<BookWidgetProps> = ({ price }) => {
  const isTabletOrMobileScreen = useMediaQuery({
    maxWidth: parseInt(theme['breakpoints-tabletl']),
  });
  const historyLocation = useLocation();
  const { id } = useParams();

  const nextLocation = useMemo(
    () => ({ ...historyLocation, pathname: `/apartments/${id}/payment` }),
    [historyLocation, id]
  );

  return (
    <div className={styles.root}>
      <PriceWidget price={price} />
      <DatePicker
        type="dark"
        position={isTabletOrMobileScreen ? 'top' : 'right'}
      />
      <Link to={nextLocation}>
        <button className={styles.bookNow}>Book now</button>
      </Link>
    </div>
  );
};

export default memo(BookWidget);
