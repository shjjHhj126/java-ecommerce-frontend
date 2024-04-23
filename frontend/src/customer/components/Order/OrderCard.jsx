import { Grid } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { useDispatch } from "react-redux";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function SelfDefPaper({ orderItem }) {
    return (
      <Paper
        style={{
          display: "flex",
          direction: "row",
          height: "100%",
          width: "100%",
        }}>
        <img
          className="h-full w-1/3 object-cover object-top"
          src={orderItem.product.imageUrl}
        />
        <div className="ml-5 space-y-2">
          <p className="font-semibold">{orderItem.product.title}</p>
          <div className="flex gap-2">
            <p className="opacity-50 font-semibold text-sm">
              Size: {orderItem.size},
            </p>
            <p className="opacity-50 font-semibold text-sm">
              Color: {orderItem.product.color},
            </p>
            <p className="opacity-50 font-semibold text-sm">
              Quantity: {orderItem.quantity},
            </p>
          </div>
        </div>
      </Paper>
    );
  }
  return (
    <div
      onClick={() => navigate(`/account/order/${3}`)}
      className="p-5 border-b-[1px] border-gray-500 hover:shadow-lg w-full">
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "space-between", height: "100%" }}>
        <Grid item xs={5.5}>
          <div className="flex cursor-pointer h-[150px] w-full">
            <Carousel
              className="w-full h-full"
              autoPlay={false}
              animation="fade"
              fullHeightHover={true} // We want the nav buttons wrapper to only be as big as the button element is
              NavButton={({ onClick, className, style, next, prev }) => {
                // Other logic

                return (
                  <Button
                    onClick={onClick}
                    className={className}
                    style={{ height: "100%", width: "100%" }}>
                    {next && <p></p>}
                    {prev && <p></p>}
                  </Button>
                );
              }}>
              {order.orderItems.map((orderItem, i) => (
                <SelfDefPaper key={i} orderItem={orderItem} />
              ))}
            </Carousel>
          </div>
        </Grid>
        <Grid item xs={0.5}>
          <p>${order.totalDiscountPrice}</p>
        </Grid>
        <Grid item xs={4}>
          {order.paymentDetails.paymentStatus === "PENDING" && (
            <div>
              <p>
                <ArrowRightIcon
                  sx={{ width: "30px", height: "30px" }}
                  className="text-black mr-2 text-sm"
                />
                <span>To be Charged</span>
              </p>
            </div>
          )}
          {order.paymentDetails.paymentStatus === "COMPLETED" && (
            <p>
              <ArrowRightIcon
                sx={{ width: "30px", height: "30px" }}
                className="text-black mr-2 text-sm"
              />
              <span>Waiting for Confirmed</span>
            </p>
          )}
          {/* {order.paymentDetails.orderStatus === "CONFIRMED" && (
            <p>
              <ArrowRightIcon
                sx={{ width: "15px", height: "15px" }}
                className="text-black"
              />
              <span>About to Deliver</span>
            </p>
          )} */}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
