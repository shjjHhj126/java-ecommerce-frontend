import { Grid, Box, Avatar, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white "
              sx={{ width: 56, height: 56 }}></Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Raam</p>
              <p className="opacity-70">April 5, 2024</p>
            </div>
          </div>
          <Rating value={4.5} name="half-rating" readOnly precision={0.5} />
          <p>
            The Casual Puff Sleeves Solid Women Black Top offers chic
            sophistication with its timeless black hue and elegant puff sleeves.
            Its versatile design transitions seamlessly from day to night,
            adding a touch of effortless style to any outfit. Crafted with
            quality materials for comfort and durability.
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
