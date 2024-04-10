import { useEffect } from "React";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../redux/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className="flex flex-col">
      <div className="uppercase font-semibold text-lg tracking-wider px-5 py-6">
        shopping bag (2)
      </div>
      <div className="flex flex-col lg:flex-row">
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
          {cart.cart?.cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
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
                <p>${cart.cart?.totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>DISCOUNT</p>
                <p>-${cart.cart?.discount}</p>
                {/*change sign of discount */}
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
                <p className="font-semibold">
                  ${cart.cart?.totalDiscountPrice}
                </p>
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
                "&:hover": {
                  bgcolor: "black",
                },
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

export default Cart;
