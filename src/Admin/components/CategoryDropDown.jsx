import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import { findCategories } from "../../redux/Product/Action";
import { useSelector, useDispatch } from "react-redux";

const CategoryDropdown = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findCategories());
  }, []);

  const { categories } = useSelector((store) => store.product);

  const [selectedCategory, setSelectedCategory] = useState(""); // First-level category
  const [subcategories, setSubcategories] = useState([]); // Second-level subcategories

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };

  const handleSubcategoryChange = (event) => {
    setFormData({ ...formData, categoryId: event.target.value });
  };

  return (
    <Grid container spacing={2} direction="row">
      {/* First Dropdown: Select Main Category */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Select Category"
            onChange={handleCategoryChange}>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Second Dropdown: Select Subcategory */}
      <Grid item xs={4}>
        <FormControl fullWidth disabled={!selectedCategory}>
          <InputLabel id="subcategory-select-label">
            Select Subcategory
          </InputLabel>
          <Select
            labelId="subcategory-select-label"
            id="subcategory-select"
            value={formData.categoryId}
            label="Select Subcategory"
            onChange={handleSubcategoryChange}>
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CategoryDropdown;
