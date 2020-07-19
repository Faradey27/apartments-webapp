import React, { memo, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Price } from '../../api';
import theme from '../../theme.scss';
import DatePicker from '../DatePicker';
import PriceWidget from '../PriceWidget';
import styles from './BookWidget.module.scss';

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
