import type { Price } from '@commercetools/platform-sdk';

const findPriceInCurrency = (prices?: Price[], currencyCode?: string) => {
  if (prices === undefined || currencyCode === undefined) return;

  const find = prices.find((price) => price.value.currencyCode === currencyCode);

  if (find === undefined) return;

  let symbolCurrency = '$';
  if (find.value.currencyCode === 'RUB') symbolCurrency = 'P';
  if (find.value.currencyCode === 'EUR') symbolCurrency = 'Э';
  const resultPrice = ` ${find.value.centAmount / 100}`;

  return { price: resultPrice, currency: symbolCurrency };
};

export default findPriceInCurrency;
