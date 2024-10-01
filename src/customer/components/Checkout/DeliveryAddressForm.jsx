import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../redux/Order/Action";
import { useNavigate } from "react-router-dom";
import {
  addAddress,
  createAddress,
  deleteAddress,
  getAddresses,
} from "../../../redux/Address/Action";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, deletedAddressId } = useSelector((store) => store.address);
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("order_id");
  const [displayAddresses, setDisplayAddresses] = useState([]);

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  useEffect(() => {
    setDisplayAddresses(addresses);
  }, [addresses, deletedAddressId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const dataReq = {
      receiverName: data.get("receiverName"),
      addressLine1: data.get("address1").trim(),
      addressLine2: data.get("address2").trim(),
      country: data.get("country"),
      city: data.get("city"),
      stateProvinceRegion: data.get("state"),
      postalCode: data.get("postalCode"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      orderId,
    };

    dispatch(createAddress(dataReq));
    navigate(`/checkout?step=3&order_id=${orderId}`);
  };

  const handleAddExistedAddress = (address) => {
    const dataReq = {
      orderId,
      addressId: address.id,
    };

    dispatch(addAddress(dataReq));
    navigate(`/checkout?step=3&order_id=${orderId}`);
  };

  const deleteExistedAddress = (address) => {
    dispatch(deleteAddress(address.id));
  };

  return (
    <div className="">
      <Grid container spacing={4} justifyContent="center">
        {displayAddresses.length != 0 && (
          <Grid
            item
            xs={12}
            lg={5}
            className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll">
            {displayAddresses.map((address, index) => (
              <div key={index} className="p-5 py-7 border-b cursor-pointer">
                <AddressCard address={address} />
                <Button
                  type="button"
                  onClick={() => handleAddExistedAddress(address)}
                  sx={{ mt: 2, bgcolor: "black", color: "white" }}
                  size="large"
                  variant="contained">
                  Deliver Here
                </Button>

                <Button
                  type="button"
                  onClick={() => deleteExistedAddress(address)}
                  sx={{
                    mt: 2,
                  }}
                  size="large"
                  color="error"
                  variant="outlined">
                  Delete Address
                </Button>
              </div>
            ))}
          </Grid>
        )}
        <Grid item xs={12} lg={7} justifyContent="center">
          <Box className="border border-black rounded-s-md shodow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="receiverName"
                    name="receiverName"
                    label="Receiver Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    required
                    id="postalCode"
                    name="postalCode"
                    label="Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address1"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address2"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={13} sm={7}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={11} sm={5}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "black",

                      paddingX: 3,
                      paddingY: 1,
                    }}
                    size="large">
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
