import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/Product/Action";
import { MuiFileInput } from "mui-file-input";
import SelectItems from "../components/SelectItems";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";

const sizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    imageUrl: "",
    color: "",
    quantity: 0,
    price: 0,
    discountPrice: 0,
    discountPercent: 0,
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    size: sizes,
  });
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  let firebaseImgUrl = "";
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSizeChange = (e, index) => {
    let sizes = formData.size;
    sizes[index].quantity = e.target.value;
    setFormData({ ...formData, size: sizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.price) < parseFloat(formData.discountPrice)) {
      setError("Discounted Price should be less then Price.");
      return;
    }

    setError(null);
    // Convert string prices, discount prices, and quantities to floats
    const priceAsFloat = parseFloat(formData.price);
    const discountPriceAsFloat = parseFloat(formData.discountPrice);
    const sizesWithFloatQuantity = formData.size.map((item) => ({
      ...item,
      quantity: parseFloat(item.quantity),
    }));

    // Calculate discount percent
    const discountPercent =
      ((priceAsFloat - discountPriceAsFloat) / priceAsFloat).toPrecision(3) *
      100;

    setFormData({
      ...formData,
    });

    try {
      setUpload(true);
      await uploadImg();
      console.log("hi");

      dispatch(
        createProduct({
          ...formData,
          imageUrl: firebaseImgUrl,
          price: priceAsFloat,
          discountPrice: discountPriceAsFloat,
          size: sizesWithFloatQuantity,
          quantity: sizesWithFloatQuantity.reduce(
            (partialSum, item) => partialSum + item.quantity,
            0
          ),
          discountPercent: parseFloat(discountPercent),
        })
      );
      console.log({ ...formData, imageUrl: firebaseImgUrl });
      setUpload(false);
      setSuccess(true);
    } catch (err) {
      setError(err);
      setUpload(false);
    }
  };
  const uploadImg = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) =>
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            // Get the download URL once the upload is complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            firebaseImgUrl = downloadURL;
            resolve(downloadURL); // Resolve the Promise with the download URL
          } catch (error) {
            reject(error); // Reject the Promise if an error occurs
          }
        }
      )
    );
  };

  const handleImgChange = (newFile) => {
    setFile(newFile);
    console.log(newFile);
  };
  return (
    <div className="px-5 py-5 ">
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 1 }}>
        Add New Product
      </Typography>

      {/*Alert*/}
      {error !== null && (
        <Alert sx={{ paddingY: "0.5rem", marginY: "0.9rem" }} severity="error">
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          sx={{ paddingY: "0.5rem", marginY: "0.9rem" }}
          severity="success">
          Successfully added!
        </Alert>
      )}
      {upload && (
        <Alert sx={{ paddingY: "0.5rem", marginY: "0.9rem" }} severity="info">
          Adding product...
        </Alert>
      )}

      <form className="h-[90%]" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MuiFileInput
              fullWidth
              label="Image"
              name="imageUrl"
              value={file}
              onChange={handleImgChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                label="Top Level Category"
                name="topLevelCategory"
                value={formData.topLevelCategory}
                onChange={handleChange}>
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                label="Second Level Category"
                name="secondLevelCategory"
                value={formData.secondLevelCategory}
                onChange={handleChange}>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/*third level */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Third Level Category</InputLabel>
              {formData.topLevelCategory === "women" &&
                formData.secondLevelCategory === "clothing" && (
                  <SelectItems
                    topLevel="women"
                    secondLevel="clothing"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              {formData.topLevelCategory === "women" &&
                formData.secondLevelCategory === "accessories" && (
                  <SelectItems
                    topLevel="women"
                    secondLevel="accessories"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              {formData.topLevelCategory === "women" &&
                formData.secondLevelCategory === "brands" && (
                  <SelectItems
                    topLevel="women"
                    secondLevel="brands"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              {formData.topLevelCategory === "men" &&
                formData.secondLevelCategory === "clothing" && (
                  <SelectItems
                    topLevel="men"
                    secondLevel="clothing"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              {formData.topLevelCategory === "men" &&
                formData.secondLevelCategory === "accessories" && (
                  <SelectItems
                    topLevel="men"
                    secondLevel="accessories"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              {formData.topLevelCategory === "men" &&
                formData.secondLevelCategory === "brands" && (
                  <SelectItems
                    topLevel="men"
                    secondLevel="brands"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              {(formData.topLevelCategory === null ||
                formData.secondLevelCategory === null) && (
                <Select
                  label="Third Level Category"
                  name="thirdLevelCategory"
                  value={formData.thirdLevelCategory}
                  onChange={handleChange}></Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              label="Size S quantity"
              name="s_quantity"
              type="number"
              value={formData.size.find((item) => item.name === "S")?.quantity}
              required
              fullWidth
              onChange={(e) => handleSizeChange(e, 0)}></TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Size M quantity"
              name="m_quantity"
              type="number"
              value={formData.size.find((item) => item.name === "M")?.quantity}
              required
              fullWidth
              onChange={(e) => handleSizeChange(e, 1)}></TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Size L quantity"
              name="l_quantity"
              type="number"
              value={formData.size.find((item) => item.name === "L")?.quantity}
              required
              fullWidth
              onChange={(e) => handleSizeChange(e, 2)}></TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ height: "100%", bgcolor: "#0e98ba" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
