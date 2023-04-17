import { fetchCurrency, fetchCurrencyFiltered } from '../../services/currenciesAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const addExpense = (expenseDetails) => ({
  type: ADD_EXPENSE,
  payload: expenseDetails,
});

export const addExpenseThunk = (state) => async (dispatch) => {
  const currencies = await fetchCurrency();

  const expenses = { ...state, exchangeRates: currencies };

  dispatch(addExpense(expenses));
};

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  payload: expenses,
});

const fetchCurrencySuccess = (currencies) => ({
  type: FETCH_CURRENCY_SUCCESS,
  payload: currencies,
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  const currencies = await fetchCurrencyFiltered();

  dispatch(fetchCurrencySuccess(currencies));
};
