export default function currencyFormatter(amount: number, currency?: string) {
  const options = currency
    ? {
        style: 'currency',
        currency,
      }
    : undefined;

  return new Intl.NumberFormat('en-US', options).format(amount / 100);
}
