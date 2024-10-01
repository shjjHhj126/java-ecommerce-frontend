import {
  Alert,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/Product/Action";
import { MuiFileInput } from "mui-file-input";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import generateCombinations from "../helpers/generateCombinations";
import CategoryDropdown from "../components/CategoryDropDown";
import ProductPropertiesForm from "../components/ProductPropertiesForm";
import ProductVariantForm from "../components/ProductVariantForm";
import getPrdVarProperties from "../helpers/getPrdVarProperties";
import propertiesHasImg from "../helpers/propertiesHasImg";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    spu: "",
    price: 0,
    discountPrice: null,
    description: "",
    categoryId: 0,
    stockLevel: 0,
    imageFiles: [],
  });

  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [productVariants, setProductVariants] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (
      e.target.name == "stockLevel" ||
      e.target.name == "price" ||
      e.target.name == "discountPrice"
    ) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        value = null;
      }
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // upload images, replace url with firebase download
      let promises = formData.imageFiles.map((fileObj) => uploadImg(fileObj));
      let uploadedImageFiles = await Promise.all(promises);

      const data = {
        name: formData.name,
        spu: formData.spu,
        description: formData.description,
        price: formData.price,
        categoryId: formData.categoryId,
        hasImageProperty: propertiesHasImg(properties),
        imageList: uploadedImageFiles.map((imageFile) => imageFile.url),
      };

      let updatedProperties = properties;
      if (properties.length != 0 && data.hasImageProperty) {
        promises = [...properties[0].values.map((obj) => uploadImg(obj))];
        uploadedImageFiles = await Promise.all(promises);
        updatedProperties = [
          {
            ...properties[0],
            values: uploadedImageFiles,
          },
          ...properties.slice(1),
        ];
        setProperties((old) => updatedProperties);
      }

      // add discountPrice
      if (formData.discountPrice) {
        data.discountPrice = formData.discountPrice;
      }

      // add productVariantList
      if (properties.length != 0) {
        const updatedProductVariants = productVariants.map((prdVar) => {
          return {
            sku: prdVar.sku,
            quantity: prdVar.quantity,
            propertyRequestList: getPrdVarProperties(prdVar, updatedProperties),
          };
        });

        data.productVariantList = updatedProductVariants;
      } else {
        //only one variant
        data.productVariantList = [
          {
            sku: formData.spu + "_sku",
            quantity: formData.stockLevel,
            propertyRequestList: [],
          },
        ];
      }

      dispatch(createProduct(data));

      setUpload(false);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setSuccess(false);
      setError(err);
      setUpload(false);
    }
  };

  const uploadImg = async (obj) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + obj.file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, obj.file);

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
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ ...obj, url: downloadURL });
          } catch (error) {
            console.log("error in uploadImg()", error);
            reject(error);
          }
        }
      )
    );
  };

  const handleImgChange = (files) => {
    if (files) {
      const fileArray = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setFormData((prevData) => ({
        ...prevData,
        imageFiles: [...prevData.imageFiles, ...fileArray],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = formData.imageFiles.filter((_, i) => i != index);
    setFormData({ ...formData, imageFiles: newImageFiles });
  };

  useEffect(() => {
    const combinations = generateCombinations(properties);
    if (combinations.length != 0 && combinations[0].length != 0) {
      const newVariants = combinations.map((combination) => ({
        combination,
        sku: "",
        name: "",
        quantity: "",
      }));
      setProductVariants(newVariants);
    }
  }, [properties]);

  return (
    <div className="px-5 py-5 ">
      {/*Alert*/}
      {error !== null && (
        <Alert sx={{ paddingY: "0.5rem", marginY: "0.9rem" }} severity="error">
          error uploading product
          {console.log(error)}
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
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 1 }}>
          Create New Product
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 0.8 }}>Name</Typography>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 0.8 }}>SPU</Typography>
            <TextField
              name="spu"
              value={formData.spu}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 0.8 }}>Image</Typography>
            <MuiFileInput
              inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
              name="imageUrl"
              multiple
              onChange={handleImgChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {formData.imageFiles.map((image, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={image.url}
                      alt={`preview-${index}`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease",
                      }}
                    />

                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.8)" },
                      }}
                      size="small">
                      <RemoveCircleOutline sx={{ color: "red" }} />
                    </IconButton>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ marginBottom: 0.8 }}>Description</Typography>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 0.8 }}>Category</Typography>
            <CategoryDropdown formData={formData} setFormData={setFormData} />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={3}>
              <Typography sx={{ marginBottom: 0.8 }}>Price</Typography>
              <TextField onChange={handleChange} name="price" type="number" />
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ marginBottom: 0.8 }}>discount price</Typography>
              <TextField
                onChange={handleChange}
                name="discountPrice"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 0.8 }}>Stock level</Typography>
            <TextField
              onChange={handleChange}
              name="stockLevel"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 1.4, marginTop: 1 }}>
              product properties
            </Typography>
            <ProductPropertiesForm
              properties={properties}
              setProperties={setProperties}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 1.4, marginTop: 1 }}>
              Product Variants
            </Typography>

            {productVariants.map((variant, index) => (
              <ProductVariantForm
                key={index}
                index={index}
                variant={variant}
                productVariants={productVariants}
                setProductVariants={setProductVariants}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{ height: "100%", bgcolor: "#0e98ba" }}>
              Submit Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
