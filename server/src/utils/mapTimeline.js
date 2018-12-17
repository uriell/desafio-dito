module.exports = function Util(events) {
  const receiptProducts = events.filter(event => event.key === 'comprou-produto');

  const receipts = events
    .filter(event => event.key === 'comprou')
    .map((event) => {
      const { custom_data, timestamp } = event;
      const revenue = custom_data.find(({ key }) => key === 'revenue').value;
      const store_name = custom_data.find(({ key }) => key === 'store_name').value;
      const transaction_id = custom_data.find(({ key }) => key === 'transaction_id').value;

      const products = receiptProducts
        .filter(({ custom_data }) => custom_data
          .find(({ key }) => key === 'transaction_id').value === transaction_id)
        .map(({ custom_data }) => {
          const name = custom_data.find(({ key }) => key === 'product_name').value;
          const price = custom_data.find(({ key }) => key === 'product_price').value;

          return { name, price };
        });

      return { timestamp, revenue, transaction_id, store_name, products };
    });

  return { timeline: receipts };
}