import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectItems = ({ topLevel, secondLevel, formData, handleChange }) => {
  switch (topLevel) {
    case "men":
      switch (secondLevel) {
        case "clothing":
          return (
            <Select
              label="Third Level Category"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}>
              <MenuItem value="men_suits">Suits</MenuItem>
              <MenuItem value="men_pants">Pants</MenuItem>
              <MenuItem value="men_shirts">Shirts</MenuItem>
            </Select>
          );

        case "accessories":
          return (
            <Select
              label="Third Level Category"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}>
              <MenuItem value="men_watches">Watches</MenuItem>
              <MenuItem value="men_wallets">Wallets</MenuItem>
              <MenuItem value="men_bags">Bags</MenuItem>
            </Select>
          );

        case "brands":
          return (
            <Select
              label="Third Level Category"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}>
              <MenuItem value="brand_Counterfeit">Counterfeit</MenuItem>
              <MenuItem value="brand_Full_Nelson">Full Nelson</MenuItem>
              <MenuItem value="brand_My_Way">My Way</MenuItem>
            </Select>
          );

        default:
          return null;
      }

    case "women":
      switch (secondLevel) {
        case "clothing":
          return (
            <Select
              label="Third Level Category"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}>
              <MenuItem value="women_dresses">Dresses</MenuItem>
              <MenuItem value="women_pants">Pants</MenuItem>
              <MenuItem value="women_demin">Demin</MenuItem>
            </Select>
          );
        case "clothing":
          return (
            <Select
              label="Third Level Category"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}>
              <MenuItem value="women_watches">Watches</MenuItem>
              <MenuItem value="women_wallets">Wallets</MenuItem>
              <MenuItem value="women_bags">Bags</MenuItem>
            </Select>
          );
        case "brands":
          return (
            <Select
              label="Third Level Category"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}>
              <MenuItem value="brand_Counterfeit">Counterfeit</MenuItem>
              <MenuItem value="brand_Full_Nelson">Full Nelson</MenuItem>
              <MenuItem value="brand_My_Way">My Way</MenuItem>
            </Select>
          );
        default:
          return null;
      }

    default:
      return null;
  }
};

export default SelectItems;
