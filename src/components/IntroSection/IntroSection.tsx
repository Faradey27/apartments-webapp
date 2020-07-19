import React, { memo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import DatePicker from '../DatePicker';
import styles from './IntroSection.module.scss';

const messages = defineMessages({
  title: {
    id: 'introSection.title',
    defaultMessage: 'BEST OF BOTH WORLDS: suites where home meets hotel.',
  },
});

interface IntroSectionProps {
  onSearch: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onSearch }) => {
  const intl = useIntl();

  return (
    <section className={styles.root}>
      <div className={styles.image} />
      <div className={styles.content}>
        <h1 className={styles.title}>{intl.formatMessage(messages.title)}</h1>
        <div className={styles.controls}>
          <DatePicker />
          <button className={styles.search} onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(IntroSection);
