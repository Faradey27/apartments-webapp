import React, { memo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import clsx from 'clsx';
import moment from 'moment';

import { useQuery } from '../../hooks/useQuery';
import Icon, { IconName } from '../Icon';
import styles from './DatePicker.module.scss';

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
  error?: string;
  iconClassName?: string;
  className?: string;
  focusedInput?: 'startDate' | 'endDate';
  setFocusedInput?: (type: 'startDate' | 'endDate') => void;
  onClick?: () => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  error,
  className,
  iconClassName,
  focusedInput,
  setFocusedInput,
  onClick,
}) => {
  const intl = useIntl();
  const query = useQuery();
  const fromDate = query.get('fromDate');
  const toDate = query.get('toDate');

  return (
    <>
      <div
        role="button"
        className={clsx(styles.dateInputWrapper, className, {
          [styles.inputError]: error,
        })}
        onClick={onClick}
      >
        <div
          role="button"
          className={clsx(styles.dateInput, {
            [styles.dateInputFocused]: focusedInput === 'startDate',
          })}
          onClick={() => setFocusedInput?.('startDate')}
        >
          {fromDate
            ? toMomentObject(fromDate)?.format('DD MMM YY')
            : intl.formatMessage(messages.startDate)}
        </div>
        <Icon
          width="24"
          iconName={IconName.arrowRight}
          className={clsx(styles.arrowRightIcon, iconClassName)}
        />
        <div
          role="button"
          className={clsx(styles.dateInput, {
            [styles.dateInputFocused]: focusedInput === 'endDate',
          })}
          onClick={() => setFocusedInput?.('endDate')}
        >
          {toDate
            ? toMomentObject(toDate)?.format('DD MMM YY')
            : intl.formatMessage(messages.endDate)}
        </div>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
};

export default memo(DatePickerInput);
