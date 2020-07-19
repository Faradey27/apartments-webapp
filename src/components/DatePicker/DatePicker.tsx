import React, { memo, useCallback, useState } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

import { useQuery } from '../../hooks/useQuery';
import theme from '../../theme.scss';
import styles from './DatePicker.module.scss';
import DatePickerInput from './DatePickerInput';

interface DatePickerProps {
  type?: 'light' | 'dark';
  position?: 'top' | 'left' | 'right';
}

export const toMomentObject = (unixTimestamp: string | null) => {
  if (!unixTimestamp) {
    return null;
  }
  const date = new Date(Number(unixTimestamp) * 1000);
  return moment(date);
};

const DatePicker: React.FC<DatePickerProps> = ({
  type = 'light',
  position = 'left',
}) => {
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

  const handleOpenCalendar = useCallback(() => {
    setCalendarState((prevState) => !prevState);
  }, []);

  const handleCloseCalendar = useCallback(() => {
    setCalendarState(false);
  }, []);

  const handleFocusChange = useCallback((res) => {
    setFocusedInput(res);
  }, []);

  const handleDatesChange = useCallback(
    ({ startDate, endDate }) => {
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
    [history]
  );

  return (
    <div className={clsx(styles.root, styles[type], styles[position])}>
      <DatePickerInput onClick={handleOpenCalendar} />
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
