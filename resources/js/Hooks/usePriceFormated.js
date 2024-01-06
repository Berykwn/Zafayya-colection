const usePriceFormated = (price) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  
    return formattedPrice;
  };

  export default usePriceFormated