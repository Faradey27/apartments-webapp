import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  cvv as validateCVV,
  expirationDate as validateExpirationDate,
  number as validateCardNumber,
} from 'card-validator';
import { Formik } from 'formik';

import { Price } from '../../api';
import { useQuery } from '../../hooks/useQuery';
import { bookApartmentsAction } from '../../state/apartments';
import { toMomentObject } from '../DatePicker/DatePicker';
import CreditCardField from './CreditCardField';
import styles from './CreditCardForm.module.scss';

interface Fields {
  fullName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const initialValues: Fields = {
  fullName: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
};

const validateForm = (values: Fields) => {
  const errors: Partial<Fields> = {};
  if (!values.fullName) {
    errors.fullName = 'Full name required';
  }
  if (!values.cardNumber) {
    errors.cardNumber = 'Card number required';
  } else if (!validateCardNumber(values.cardNumber).isValid) {
    errors.cardNumber = 'Invalid card number';
  }
  if (!values.expirationDate) {
    errors.expirationDate = 'Expiration date required';
  } else if (!validateExpirationDate(values.expirationDate).isValid) {
    errors.expirationDate = 'Invalid expiration date';
  }
  if (!values.cvv) {
    errors.cvv = 'CVV requried';
  } else if (!validateCVV(values.cvv).isValid) {
    errors.cvv = 'Invalid cvv';
  }
  return errors;
};

interface CreditCardFormProps {
  price: Price;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ price }) => {
  const history = useHistory();
  const query = useQuery();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fromDate = toMomentObject(query.get('fromDate'));
  const toDate = toMomentObject(query.get('toDate'));

  const days = toDate?.diff(fromDate, 'days') || 1;

  const handleFormSubmit = useCallback(
    async (values: Fields, { setSubmitting }) => {
      // TODO remove await, side effect should happen inside async action
      await dispatch(
        bookApartmentsAction({
          id,
          fromDate: String(fromDate?.unix()),
          toDate: String(toDate?.unix()),
          ...values,
        })
      );
      setSubmitting(false);
      history.push('/apartments/2/thank-you');
    },
    [dispatch, fromDate, history, id, toDate]
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <CreditCardField
            name="fullName"
            label="Your Full Name"
            value={values.fullName}
            error={errors.fullName && touched.fullName && errors.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <CreditCardField
            name="cardNumber"
            label="Card number"
            suffix={validateCardNumber(values.cardNumber).card?.type}
            value={values.cardNumber}
            maskChar="X"
            mask="0000-0000-0000-0000"
            error={errors.cardNumber && touched.cardNumber && errors.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className={styles.expiresAndCvv}>
            <CreditCardField
              name="expirationDate"
              label="Expires at"
              value={values.expirationDate}
              maskString={'MM/YY'}
              mask={'00/00'}
              error={
                errors.expirationDate &&
                touched.expirationDate &&
                errors.expirationDate
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <CreditCardField
              name="cvv"
              label="CVV"
              value={values.cvv}
              maskChar="X"
              mask={'000'}
              error={errors.cvv && touched.cvv && errors.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <button className={styles.pay} type="submit">
            {isSubmitting
              ? 'Loading...'
              : `Pay ${price.value * days}${price.currency}`}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default CreditCardForm;
