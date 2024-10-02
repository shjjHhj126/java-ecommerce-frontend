import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../redux/Order/Action";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/ApiConfig";

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("order_id");
  const { order } = useSelector((store) => store.order);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  useEffect(() => {
    if (order && order.orderItemList?.length !== 0) {
      const calculatedPrice = order.orderItemList.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setPrice(calculatedPrice);

      const calculatedDiscountPrice = order.orderItemList.reduce(
        (total, item) => total + (item.discountPrice * item.quantity || 0),
        0
      );
      setDiscountPrice(calculatedDiscountPrice);
    }
  }, [order]);

  const handleCheckout = () => {
    const stripeCheckout = async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const orderId = urlSearchParams.get("order_id");
      const { data } = await api.post(
        `/payments`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ); //return the stripe checkout page url
      window.location.href = data; //do not use navigate()
    };
    stripeCheckout();
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order} />
      </div>
      <div className="flex flex-col lg:flex-row mt-10">
        {/*left part */}
        <div className="flex flex-col flex-1 px-8">
          <div className="flex justify-between ">
            <p className="text-xs font-semibold tracking-wider uppercase">
              item
            </p>
            <p className="text-xs font-semibold tracking-wider uppercase">
              price
            </p>
          </div>
          <hr />
          {order?.orderItemList?.map((item, index) => {
            return <CartItem key={index} item={item} isCart={false} />;
          })}
        </div>

        {/*right part */}
        <div className="w-[400px] flex flex-col items-center bg-gray-300">
          <div className="flex flex-col px-8 ">
            <p className="w-full text-xs font-semibold uppercase tracking-wider text-center pb-3">
              order summary
            </p>
            <div className="w-[350px] h-[240px] border-[1px] border-black px-4 py-5 tracking-wider flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Subtotal ({order?.orderItemList.length})</p>
                <p>${price}</p>
              </div>
              <div className="flex justify-between">
                <p>DISCOUNT</p>
                <p>-${price - discountPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>+$20.00</p>
              </div>
              <p className="text-gray-400 text-sm tracking-wide">
                Taxes calculated at checkout
              </p>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="font-semibold tracking-normal">Estimated Total</p>
                <p className="font-semibold">${discountPrice + 20}</p>
              </div>
            </div>
          </div>

          <div className="w-full px-6 mt-3">
            <Button
              onClick={handleCheckout}
              variant="contained"
              sx={{
                height: "50px",
                width: "100%",
                border: "2px",
                fontSize: "15px",
                letterSpacing: "0.2rem",
                bgcolor: "black",
              }}
              className="uppercase text-white w-full">
              check out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
