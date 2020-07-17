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
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <ApartmentsTitle
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
            <h3>{intl.formatMessage(messages.d3Tour)}</h3>
            <iframe src="https://mpembed.com/show/?m=WkgN8bjGuQ6&mpu=290" />
          </div>
          <div className={styles.notes}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div>
          <Link to="/payment">Book now</Link>
        </div>
      </div>
    </main>
  );
};

export default memo(Apartment);
