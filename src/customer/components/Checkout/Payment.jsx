import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/ApiConfig";
import { Avatar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";

const Payment = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [orderId, setOrderId] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState(String);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    setOrderId(query.get("order_id"));

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
      setMsg("success");
      //set payment status
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
      setMsg("canceled");
    }
  }, []);

  useEffect(() => {
    const fetchSessInfo = async () => {
      const { data } = await api.post(`/api/payment/setStatus/${orderId}`);
      //set email, amount

      setEmail(data.message.split(",")[0]);
      setAmount(data.message.split(",")[1]);
    };

    if (orderId !== -1) {
      fetchSessInfo();
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen ">
      <div className="w-1/3  ">
        <div className="bg-black text-white text-xl text-center p-3">
          PAY ${amount / 100.0}
        </div>
        <div className="flex items-center justify-start bg-white p-2 gap-2">
          <PersonIcon />
          <div className=" text-black">{email}</div>
        </div>
        {amount != 0 ? (
          <div className=" text-white text-center bg-green-100 pb-20">
            <CheckIcon
              style={{ height: "80px", width: "80px" }}
              className=" text-green-500 mt-6"
            />
            <div className="text-black text-2xl font-bold">Payment Success</div>
            <div className="text-black mt-2">
              Your payment of{" "}
              <span className="font-bold">${amount / 100.0}</span> was
              successfully completed
            </div>
          </div>
        ) : (
          <div className=" text-white text-center bg-gray-100 pb-20">
            <ClearIcon
              style={{ height: "80px", width: "80px" }}
              className=" text-gray-500 mt-6"
            />
            <div className="text-black text-2xl font-bold">Payment Cancel</div>
            <div className="text-black mt-2">Your payment is canceled</div>
          </div>
        )}

        <div className=" bg-gray-200 flex justify-center ">
          <img
            className="h-10 object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/java-ecommerce-69ec1.appspot.com/o/5968382.png?alt=media&token=2f9292fe-1100-413a-b302-104a00214130"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
