import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RequestState } from '../../api';
import ApartmentsTitle from '../../components/ApartmentsTitle';
import BookWidget from '../../components/BookWidget';
import RequestStateVisualize from '../../components/RequestStateVisualize';
import {
  fetchApartmentsDetailsAction,
  selectApartmentsDetails,
  selectApartmentsRequestStateDetails,
} from '../../state/apartments';
import { RootState } from '../../state/reducer';
import styles from './Apartment.module.scss';
import ApartmentsNote from './ApartmentsNote';

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
  const requestState = useSelector((state: RootState) =>
    selectApartmentsRequestStateDetails(state, id)
  );

  useEffect(() => {
    if (!apartmentsDetails && requestState !== RequestState.waiting) {
      dispatch(fetchApartmentsDetailsAction(id));
    }
  }, [apartmentsDetails, dispatch, id, requestState]);

  return (
    <main className={styles.root}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <RequestStateVisualize requestState={requestState}>
        <ApartmentsTitle
          size="large"
          name={apartmentsDetails?.name}
          capacity={apartmentsDetails?.capacity}
          location={apartmentsDetails?.location}
        />
        <div
          className={styles.image}
          style={{ backgroundImage: `url("${apartmentsDetails?.image}")` }}
        />
        <div className={styles.content}>
          <div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: apartmentsDetails?.description,
              }}
            ></div>
            <div className={styles.gallery}>
              {apartmentsDetails?.gallery.map((src) => (
                <img
                  src={src}
                  alt=""
                  key={src}
                  className={styles.galleryItem}
                />
              ))}
            </div>
            <div className={styles.d3tour}>
              <h3 className={styles.d3tourTitle}>
                {intl.formatMessage(messages.d3Tour)}
              </h3>
              <iframe
                title="3D tour"
                className={styles.d3TourContent}
                src="https://mpembed.com/show/?m=WkgN8bjGuQ6&mpu=290"
              />
            </div>
            <ApartmentsNote />
          </div>
          <div>
            <BookWidget price={apartmentsDetails?.price} />
          </div>
        </div>
      </RequestStateVisualize>
    </main>
  );
};

export default memo(Apartment);
