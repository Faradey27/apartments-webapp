import React, { memo, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ApartmentsTitle from '../../components/ApartmentsTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/reducer';
import {
  selectApartmentsDetails,
  fetchApartmentsDetailsAction,
} from '../../state/apartments';

import styles from './Apartment.module.scss';
import Icon, { IconName } from '../../components/Icon';
import BookWidget from '../../components/BookWidget';

const messages = defineMessages({
  pageTitle: {
    id: 'apartment.pageTitle',
    defaultMessage: 'BOB W. - Some apartment',
  },
  d3Tour: {
    id: 'apartment.d3Tour',
    defaultMessage: 'Take a 3D tour of the Vibrant studio home',
  },
});

const Apartment = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { id } = useParams();
  const apartmentsDetails = useSelector((state: RootState) =>
    selectApartmentsDetails(state, id)
  );

  useEffect(() => {
    dispatch(fetchApartmentsDetailsAction(id));
  }, [dispatch, id]);

  if (!apartmentsDetails) {
    return null;
  }

  return (
    <main className={styles.root}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <ApartmentsTitle
        size="large"
        name={apartmentsDetails.name}
        capacity={apartmentsDetails.capacity}
        location={apartmentsDetails.location}
      />
      <div
        className={styles.image}
        style={{ backgroundImage: `url("${apartmentsDetails.image}")` }}
      />
      <div className={styles.content}>
        <div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: apartmentsDetails.description }}
          ></div>
          <div className={styles.gallery}>
            {apartmentsDetails.gallery.map((src) => (
              <img src={src} alt="" key={src} className={styles.galleryItem} />
            ))}
          </div>
          <div className={styles.d3tour}>
            <h3 className={styles.d3tourTitle}>
              {intl.formatMessage(messages.d3Tour)}
            </h3>
            <iframe
              className={styles.d3TourContent}
              src="https://mpembed.com/show/?m=WkgN8bjGuQ6&mpu=290"
            />
          </div>
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
        </div>
        <div>
          <BookWidget />
        </div>
      </div>
    </main>
  );
};

export default memo(Apartment);
