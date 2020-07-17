import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';

import styles from './IntroSection.module.scss';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'introSection.title',
    defaultMessage: 'BEST OF BOTH WORLDS: suites where home meets hotel.',
  },
});

const IntroSection: React.FC = () => {
  const intl = useIntl();

  return (
    <article className={styles.root}>
      <div className={styles.image} />
      <h1 className={styles.title}>{intl.formatMessage(messages.title)}</h1>
    </article>
  );
};

export default memo(IntroSection);
