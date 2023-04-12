export const fetchCurrencyFiltered = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');

  const data = await response.json();

  const dataFiltered = Object.keys(data).filter((currency) => currency !== 'USDT');

  return dataFiltered;
};
