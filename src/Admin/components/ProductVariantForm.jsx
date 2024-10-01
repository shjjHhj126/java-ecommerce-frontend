import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const ProductVariantForm = ({
  variant,
  productVariants,
  setProductVariants,
  index,
}) => {
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "quantity") {
      value = parseInt(value);
    }
    const newVariants = [...productVariants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    setProductVariants(newVariants);
  };

  return (
    <div className="px-5 py-1 w-full">
      <Typography sx={{ marginBottom: 1 }}>
        Variant {index + 1}: {variant.combination.join(", ")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="SKU"
            name="sku"
            value={variant.sku || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={variant.quantity || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductVariantForm;
