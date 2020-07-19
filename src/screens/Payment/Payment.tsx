import React, { memo, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import CreditCardForm from '../../components/CreditCardForm';
import { DatePickerInput } from '../../components/DatePicker';
import Dialog from '../../components/Dialog';
import PriceWidget from '../../components/PriceWidget';
import {
  fetchApartmentsDetailsAction,
  selectApartmentsDetails,
} from '../../state/apartments';
import { RootState } from '../../state/reducer';
import styles from './Payment.module.scss';

const messages = defineMessages({
  pageTitle: {
    id: 'payment.pageTitle',
    defaultMessage: 'BOB W. - Some title',
  },
});

const Payment = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const apartmentsDetails = useSelector((state: RootState) =>
    selectApartmentsDetails(state, id)
  );

  useEffect(() => {
    if (!apartmentsDetails) {
      dispatch(fetchApartmentsDetailsAction(id));
    }
  }, [apartmentsDetails, dispatch, id]);

  if (!apartmentsDetails) {
    return null;
  }

  return (
    <Dialog title="BOOK CENTRAL DESIGN STUDIO HOME" onClose={handleClose}>
      <Helmet>
        <title>{intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <div className={styles.metadata}>
        <PriceWidget
          price={apartmentsDetails.price}
          className={styles.priceWidget}
        />
        <DatePickerInput
          className={styles.date}
          iconClassName={styles.arrowRightIcon}
        />
      </div>
      <CreditCardForm price={apartmentsDetails.price} />
    </Dialog>
  );
};

export default memo(Payment);
