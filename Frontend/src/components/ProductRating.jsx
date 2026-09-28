function ProductRating({ rating, reviewCount, className }) {
  const numericRating = Number(rating);
  const fillPercentage = (Math.min(Math.max(numericRating, 0), 5) / 5) * 100;

  return (
    <p className={`m-0 flex items-center ${className}`} aria-label={`Rating ${rating} dari 5`}>
      <span
        className="bg-clip-text leading-none text-transparent"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(90deg, #f5b400 ${fillPercentage}%, #d8d8d8 ${fillPercentage}%)`,
        }}
      >
        {"\u2605\u2605\u2605\u2605\u2605"}
      </span>
      <small className="text-(--color-muted)">({reviewCount})</small>
    </p>
  );
}

export default ProductRating;
