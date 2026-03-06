function ProductPrice({ currency, price }) {
  return (
    <div>
      <span>
        {currency}
        <span>{price.toFixed(2)}</span>
      </span>
    </div>
  );
}

export default ProductPrice;
