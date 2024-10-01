const findVarByOptions = (product, selectedOptions) => {
  const selectedVar = product.productVariantList.find((variant) => {
    return selectedOptions.every((option) =>
      variant.propertyList.some(
        (property) =>
          property.name === option.name && property.value === option.value
      )
    );
  });

  return selectedVar ? selectedVar.id : null;
};

export default findVarByOptions;
