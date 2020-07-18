import React, { memo, useState, useCallback } from 'react';

import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment';
import Icon, { IconName } from '../Icon';
import { useQuery } from '../../hooks/useQuery';

import styles from './DatePicker.module.scss';
import clsx from 'clsx';

const messages = defineMessages({
  startDate: {
    id: 'datePicker.startDate',
    defaultMessage: 'Start date',
  },
  endDate: {
    id: 'datePicker.endDate',
    defaultMessage: 'End date',
  },
});

export const toMomentObject = (unixTimestamp: string | null) => {
  if (!unixTimestamp) {
    return null;
  }
  const date = new Date(Number(unixTimestamp) * 1000);
  return moment(date);
};

interface DatePickerInputProps {
  iconClassName?: string;
  className?: string;
  onClick?: () => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  className,
  iconClassName,
  onClick,
}) => {
  const intl = useIntl();
  const query = useQuery();
  const fromDate = query.get('fromDate');
  const toDate = query.get('toDate');

  return (
    <div
      role="button"
      className={clsx(styles.dateInput, className)}
      onClick={onClick}
    >
      <span>
        {fromDate
          ? toMomentObject(fromDate)?.format('DD MMM YY')
          : intl.formatMessage(messages.startDate)}
      </span>
      <Icon
        width="24"
        iconName={IconName.arrowRight}
        className={clsx(styles.arrowRightIcon, iconClassName)}
      />
      <span>
        {toDate
          ? toMomentObject(toDate)?.format('DD MMM YY')
          : intl.formatMessage(messages.endDate)}
      </span>
    </div>
  );
};

export default memo(DatePickerInput);
