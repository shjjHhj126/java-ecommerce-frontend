import { Grid } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { useDispatch } from "react-redux";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(order);

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

  const renderPaymentStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "To be Charged";
      case "COMPLETED":
        return "About to Deliver";
      case "FAILED":
        return "Payment Failed";
      default:
        return "Unknown Status";
    }
  };

  const renderOrderState = (status) => {
    switch (status) {
      case "PENDING":
        return "Order Pending";
      case "CONFIRMED":
        return "Order Confirmed";
      case "SHIPPING":
        return "Order is Shipping";
      case "DELIVERED":
        return "Order Delivered";
      case "CANCELED":
        return "Order Canceled";
      default:
        return "Unknown State";
    }
  };

  const renderShippingStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Awaiting Shipment";
      case "SHIPPED":
        return "Shipped";
      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";
      case "DELIVERED":
        return "Delivered";
      case "CANCELED":
        return "Shipping Canceled";
      default:
        return "Unknown Shipping Status";
    }
  };

  return (
    <div
      onClick={() => navigate(`/account/order/${3}`)}
      className="p-5 border-b-[1px] border-gray-500 hover:shadow-lg w-full">
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "space-between", height: "100%" }}>
        {/* <Grid item xs={5.5}>
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
        </Grid> */}
        <Grid item xs={0.5}>
          <p>{order.id}</p>
        </Grid>
        <Grid item xs={1}>
          <p>{order.serialNum}</p>
        </Grid>
        <Grid item xs={0.5}>
          <p>${order.sellingPrice}</p>
        </Grid>
        <Grid item xs={2}>
          <p>{renderPaymentStatus(order.payment.status)}</p>
        </Grid>
        <Grid item xs={2}>
          <p>{renderOrderState(order.orderStateRecordList[0].state)}</p>
        </Grid>
        <Grid item xs={2}>
          <p>{renderShippingStatus(order.shippingRecordList[0].state)}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
