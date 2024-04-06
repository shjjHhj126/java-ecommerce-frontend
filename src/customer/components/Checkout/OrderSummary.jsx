import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";

const OrderSummary = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard />
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
          {[1, 1, 1].map((item, index) => (
            <CartItem key={index} />
          ))}
        </div>

        {/*right part */}
        <div className="w-[400px] flex flex-col items-center bg-gray-300">
          <div className="flex flex-col px-8 ">
            <p className="w-full text-xs font-semibold uppercase tracking-wider text-center pb-3">
              order summary
            </p>
            <div className="w-[350px] h-[240px] border-[1px] border-black px-4 py-5 tracking-wider flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Subtotal (3)</p>
                <p>$500.00</p>
              </div>
              <div className="flex justify-between">
                <p>DISCOUNT</p>
                <p>-$200.00</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>$20.00</p>
              </div>
              <p className="text-gray-400 text-sm tracking-wide">
                Taxes calculated at checkout
              </p>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="font-semibold tracking-normal">Estimated Total</p>
                <p className="font-semibold">$124.95</p>
              </div>
            </div>
          </div>

          <div className="w-full px-6 mt-3">
            <Button
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
