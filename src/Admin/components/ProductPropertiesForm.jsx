import React, { useState } from "react";
import { Button, TextField, IconButton, Grid, Chip } from "@mui/material";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  Image,
} from "@mui/icons-material";

const ProductPropertiesForm = ({ properties, setProperties }) => {
  const addProperty = () => {
    setProperties([...properties, { name: "", values: [] }]);
  };

  const removeProperty = (index) => {
    const newProperties = properties.filter((_, i) => i !== index);
    setProperties(newProperties);
  };

  const updatePropertyName = (index, value) => {
    const isDuplicated = properties.some(
      (property, i) => i !== index && property.name === value
    );

    if (isDuplicated) {
      alert("The property name must be unique.");
      return;
    }
    const newProperties = [...properties];
    newProperties[index].name = value;
    setProperties(newProperties);
  };

  const addValue = (index, value) => {
    const newProperties = [...properties];
    if (value && !newProperties[index].values.some((v) => v.value === value)) {
      newProperties[index].values.push({
        value,
        file: null,
        url: "",
      });
      setProperties(newProperties);
    }
  };

  const removeValue = (propertyIndex, valueIndex) => {
    const newProperties = [...properties];
    newProperties[propertyIndex].values.splice(valueIndex, 1);
    setProperties(newProperties);
  };

  const handleImageUpload = (propertyIndex, valueIndex, event) => {
    const file = event.target.files[0];
    const newProperties = [...properties];
    newProperties[propertyIndex].values[valueIndex].file = file;
    newProperties[propertyIndex].values[valueIndex].url =
      URL.createObjectURL(file);
    setProperties(newProperties);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {properties.map((property, propertyIndex) => (
          <Grid item xs={12} key={propertyIndex}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={0.5}>
                <IconButton
                  onClick={() => removeProperty(propertyIndex)}
                  color="error">
                  <RemoveCircleOutline />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Property Name"
                  value={property.name || ""}
                  onChange={(e) =>
                    updatePropertyName(propertyIndex, e.target.value)
                  }
                  placeholder="e.g., Color, Size"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Add Value"
                  placeholder="e.g., Red, Blue"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addValue(propertyIndex, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="ml-2">
                  {property.values.map((value, valueIndex) => (
                    <div
                      key={valueIndex}
                      style={{ display: "block", marginRight: 10 }}>
                      {value.value && (
                        <Chip
                          label={value.value}
                          onDelete={() =>
                            removeValue(propertyIndex, valueIndex)
                          }
                          style={{ marginRight: 5, marginTop: 10 }}
                        />
                      )}
                      {propertyIndex === 0 && (
                        <div>
                          <label
                            htmlFor={`file-upload-${propertyIndex}-${valueIndex}`}>
                            <Button
                              variant="contained"
                              component="span"
                              color="primary"
                              startIcon={<Image />}
                              style={{ marginTop: 10 }}>
                              Upload Image
                            </Button>
                          </label>
                          <input
                            id={`file-upload-${propertyIndex}-${valueIndex}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(propertyIndex, valueIndex, e)
                            }
                            style={{ display: "none" }}
                          />
                          {value.file && (
                            <img
                              src={value.url}
                              alt={`preview-${valueIndex}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                marginTop: 10,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={addProperty}
        style={{ marginTop: 20 }}
        disabled={properties.length >= 3}>
        Add Property
      </Button>
    </div>
  );
};

export default ProductPropertiesForm;
