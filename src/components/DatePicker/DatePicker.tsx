import React, { memo, useState, useCallback } from 'react';

import styles from './DatePicker.module.scss';
import { DayPickerRangeController } from 'react-dates';
import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment';
import Icon, { IconName } from '../Icon';

import { useMediaQuery } from 'react-responsive';

import theme from '../../theme.scss';
import { useQuery } from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';

interface DatePickerProps {}

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

const toMomentObject = (unixTimestamp: string | null) => {
  if (!unixTimestamp) {
    return null;
  }
  const date = new Date(Number(unixTimestamp) * 1000);
  return moment(date);
};

const DatePicker: React.FC<DatePickerProps> = () => {
  const intl = useIntl();
  const history = useHistory();
  const [isCalendarVisible, setCalendarState] = useState(false);
  const query = useQuery();
  const fromDate = query.get('fromDate');
  const toDate = query.get('toDate');
  const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate'>(
    'startDate'
  );
  const isTabletOrMobileScreen = useMediaQuery({
    maxWidth: parseInt(theme['breakpoints-tablet']),
  });

  const handleOpenCalendar = useCallback(() => setCalendarState(true), []);
  const handleCloseCalendar = useCallback(() => setCalendarState(false), []);
  const handleFocusChange = useCallback((res, ...args) => {
    setFocusedInput(res);
  }, []);

  const handleDatesChange = useCallback(
    ({ startDate, endDate, ...args }) => {
      // TODO set proper types
      const query: any = {};

      if (startDate) {
        query.fromDate = startDate.unix();
      }

      if (endDate) {
        query.toDate = endDate.unix();
      }

      history.push({
        search: '?' + new URLSearchParams(query).toString(),
      });
    },
    [history, fromDate, toDate]
  );

  return (
    <div className={styles.root}>
      <div
        role="button"
        className={styles.dateInput}
        onClick={handleOpenCalendar}
      >
        <span>
          {fromDate
            ? toMomentObject(fromDate)?.format('DD MMMM YYYY')
            : intl.formatMessage(messages.startDate)}
        </span>
        <Icon
          width="24"
          iconName={IconName.arrowRight}
          className={styles.arrowRightIcon}
        />
        <span>
          {toDate
            ? toMomentObject(toDate)?.format('DD MMMM YYYY')
            : intl.formatMessage(messages.endDate)}
        </span>
      </div>
      <div className={styles.calendar}>
        {isCalendarVisible ? (
          <DayPickerRangeController
            keepOpenOnDateSelect
            orientation={isTabletOrMobileScreen ? 'vertical' : 'horizontal'}
            startDate={toMomentObject(fromDate)}
            endDate={toMomentObject(toDate)}
            onOutsideClick={handleCloseCalendar}
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={handleFocusChange}
            numberOfMonths={2}
          />
        ) : null}
      </div>
    </div>
  );
};

export default memo(DatePicker);
