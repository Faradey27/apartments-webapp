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

const IntroSection: React.FC = () => {
  const intl = useIntl();

  return (
    <section className={styles.root}>
      <div className={styles.image} />
      <div className={styles.content}>
        <h1 className={styles.title}>{intl.formatMessage(messages.title)}</h1>
        <DatePicker />
      </div>
    </section>
  );
};

export default memo(IntroSection);
