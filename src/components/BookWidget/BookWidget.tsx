import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { Price } from '../../api';
import { useQuery } from '../../hooks/useQuery';
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
  const [error, setError] = useState('');
  const historyLocation = useLocation();
  const history = useHistory();
  const query = useQuery();
  const fromDate = query.get('fromDate');
  const toDate = query.get('toDate');
  const { id } = useParams();

  const nextLocation = useMemo(
    () => ({ ...historyLocation, pathname: `/apartments/${id}/payment` }),
    [historyLocation, id]
  );

  const handleOpenPaymentForm = useCallback(() => {
    if (toDate && fromDate) {
      history.push(nextLocation);
    } else {
      setError('You need to select date before');
    }
  }, [toDate, fromDate, history, nextLocation]);

  useEffect(() => {
    if (toDate && fromDate) {
      setError('');
    }
  }, [error, toDate, fromDate]);

  return (
    <div className={styles.root}>
      <PriceWidget price={price} />
      <DatePicker
        type="dark"
        error={error}
        position={isTabletOrMobileScreen ? 'top' : 'right'}
      />
      <button className={styles.bookNow} onClick={handleOpenPaymentForm}>
        Book now
      </button>
    </div>
  );
};

export default memo(BookWidget);
