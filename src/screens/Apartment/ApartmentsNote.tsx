import React, { memo } from 'react';

import Icon, { IconName } from '../../components/Icon';
import styles from './Apartment.module.scss';

const Apartment = () => {
  return (
    <div className={styles.notes}>
      <div className={styles.note}>
        <Icon iconName={IconName.keyless} width={60} height={60} />
        <p className={styles.noteTitle}>STAY HASSLE-FREE</p>
        <p className={styles.noteSubtitle}>
          24/7 keyless entry.
          <br /> No check-ins or outs.
        </p>
      </div>
      <div className={styles.note}>
        <Icon iconName={IconName.hosted} width={60} height={60} />
        <p className={styles.noteTitle}>STAY HOSTED</p>
        <p className={styles.noteSubtitle}>
          Dedicated & local concierge available 24/7.
        </p>
      </div>
      <div className={styles.note}>
        <Icon iconName={IconName.local} width={60} height={60} />
        <p className={styles.noteTitle}>STAY LOCAL</p>
        <p className={styles.noteSubtitle}>
          Hand picked apartments in the trendiest districts.
        </p>
      </div>
      <div className={styles.note}>
        <Icon iconName={IconName.coffeee} width={60} height={60} />
        <p className={styles.noteTitle}>STAY NOURISHED</p>
        <p className={styles.noteSubtitle}>
          {' '}
          Breakfast partners at nearby handpicked venues.
        </p>
      </div>
      <div className={styles.note}>
        <Icon iconName={IconName.rested} width={60} height={60} />
        <p className={styles.noteTitle}>STAY RESTED</p>
        <p className={styles.noteSubtitle}>
          Premium beds. Luxury pillows and duvets. Black out blinds.
        </p>
      </div>
      <div className={styles.note}>
        <Icon iconName={IconName.sustainable} width={60} height={60} />
        <p className={styles.noteTitle}>STAY SUSTAINABLE</p>
        <p className={styles.noteSubtitle}>
          All renewable energy. Smart recycling and minimizing waste.
        </p>
      </div>
    </div>
  );
};

export default memo(Apartment);
