import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/Order/Action";
import { useEffect } from "react";

const order_status = [
  { label: "On the Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
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
          <div className="w-full">
            {order.orders?.map((item, index) => (
              <OrderCard key={index} order={item} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
