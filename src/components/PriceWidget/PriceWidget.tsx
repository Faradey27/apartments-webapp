import React, { memo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import clsx from 'clsx';

import { Price } from '../../api';
import { useQuery } from '../../hooks/useQuery';
import { toMomentObject } from '../DatePicker';
import styles from './PriceWidget.module.scss';

interface PriceWidgetProps {
  className?: string;
  price: Price;
}

const messages = defineMessages({
  duration: {
    id: 'priceWidget.duration',
    defaultMessage: 'for {value} {value, plural, one{night} other{nights}}',
  },
});

const PriceWidget: React.FC<PriceWidgetProps> = ({ price, className }) => {
  const query = useQuery();
  const intl = useIntl();

  const fromDate = toMomentObject(query.get('fromDate'));
  const toDate = toMomentObject(query.get('toDate'));

  const days = toDate?.diff(fromDate, 'days') || 1;

  return (
    <div className={clsx(styles.header, className)}>
      <span className={styles.price}>
        {price.value * days}
        {price.currency}
      </span>
      <span className={styles.duration}>
        {intl.formatMessage(messages.duration, { value: days })}
      </span>
    </div>
  );
};

export default memo(PriceWidget);
