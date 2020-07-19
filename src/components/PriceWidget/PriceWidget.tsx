import React, { memo } from 'react';
import clsx from 'clsx';

import { Price } from '../../api';
import { useQuery } from '../../hooks/useQuery';
import { toMomentObject } from '../DatePicker';
import styles from './PriceWidget.module.scss';

interface PriceWidgetProps {
  className?: string;
  price: Price;
}

const PriceWidget: React.FC<PriceWidgetProps> = ({ price, className }) => {
  const query = useQuery();

  const fromDate = toMomentObject(query.get('fromDate'));
  const toDate = toMomentObject(query.get('toDate'));

  const days = toDate?.diff(fromDate, 'days') || 1;

  return (
    <div className={clsx(styles.header, className)}>
      <span className={styles.price}>
        {price.value * days}
        {price.currency}
      </span>
      <span className={styles.duration}>for {days} night</span>
    </div>
  );
};

export default memo(PriceWidget);
