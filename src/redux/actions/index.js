import { fetchCurrencyFiltered } from '../../services/currenciesAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const fetchCurrencySuccess = (currencies) => ({
  type: FETCH_CURRENCY_SUCCESS,
  payload: currencies,
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  const currencies = await fetchCurrencyFiltered();

  dispatch(fetchCurrencySuccess(currencies));
};
