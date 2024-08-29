import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../redux/Order/Action";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, []);

  useEffect(() => {
    if (order.order?.orderStatus === "CANCELED") {
      setActiveStep(0);
    } else if (order.order?.orderStatus === "PAID") {
      setActiveStep(1);
    }
  }, [order]);

  return (
    <div className="px-5 lg:px-[90px] py-5 lg:py-[45px]">
      <div>
        <h1 className="text-xl font-bold py-5">Dispatch Destination</h1>
        <AddressCard address={order.order?.shippingAddr} />
      </div>

      <div className="py-10">
        <OrderTracker activeStep={activeStep} />
      </div>

      <Grid container className="pl-10 ">
        {order.order?.orderItems.map((item, index) => (
          <Grid
            key={index}
            item
            container
            className="py-4 border-b-[1px]"
            sx={{ alignContent: "space-between" }}>
            <Grid item xs={10}>
              <div className="flex cursor-pointer relative">
                <img
                  src={item.product.imageUrl}
                  alt=""
                  className="h-[9rem] w-[6rem] object-cover object-top"
                />
                <div className="flex flex-col ml-5 ">
                  <p className="">{item.product.title}</p>
                  <div className="flex gap-2 mt-2">
                    <p className="opacity-50 font-semibold text-sm">
                      Size: {item.size},
                    </p>
                    <p className="opacity-50 font-semibold text-sm">
                      Color: {item.product.color},
                    </p>
                    <p className="opacity-50 font-semibold text-sm">
                      Quantity: {item.quantity},
                    </p>
                  </div>
                  <p className="absolute bottom-0">${item.discountPrice}</p>
                </div>
              </div>
            </Grid>

            {activeStep === 4 && (
              <Grid item>
                <Box>
                  <StarIcon sx={{ fontSize: "2rem" }} className="px-2" />
                  <span>Rate & Review</span>
                </Box>
              </Grid>
            )}
          </Grid>
        ))}

        {activeStep === 0 && (
          <Grid
            item
            xs={16}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}>
            <Button
              sx={{
                bgcolor: "black",
                color: "white",
                width: "50%",
                "&:hover": {
                  bgcolor: "gray",
                  color: "white",
                },
              }}
              onClick={() => navigate(`/checkout?step=2&order_id=${orderId}`)}>
              Check out
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OrderDetails;
