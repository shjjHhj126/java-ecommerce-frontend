import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/Order/Action";
import { useEffect } from "react";

const order_status = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Shipping", value: "SHIPPING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "canceled", value: "CANCELED" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { order, orders } = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="mt-10">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-0">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold uppercase">order status</h1>
              {order_status.map((status) => (
                <div key={status.label} className="flex items-center">
                  <input
                    defaultValue={status.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-gray-700 focus:text-gray-900"></input>
                  <label
                    className="ml-3 text-sm text-gray-700"
                    htmlFor={status.value}>
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={9}>
          <div className="p-5 bg-gray-200 w-full">
            <Grid
              container
              spacing={2}
              sx={{ justifyContent: "space-between", height: "100%" }}>
              <Grid item xs={0.5}>
                <p>
                  <strong>Order ID</strong>
                </p>
              </Grid>
              <Grid item xs={1}>
                <p>
                  <strong>Serial Number</strong>
                </p>
              </Grid>
              <Grid item xs={0.5}>
                <p>
                  <strong>Selling Price</strong>
                </p>
              </Grid>
              <Grid item xs={2}>
                <p>
                  <strong>Payment Status</strong>
                </p>
              </Grid>
              <Grid item xs={2}>
                <p>
                  <strong>Order Status</strong>
                </p>
              </Grid>
              <Grid item xs={2}>
                <p>
                  <strong>Shipping Status</strong>
                </p>
              </Grid>
            </Grid>
          </div>
          <div className="w-full">
            {orders.orderList?.map((item, index) => (
              <OrderCard key={index} order={item} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
