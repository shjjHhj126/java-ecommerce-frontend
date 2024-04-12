import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../redux/Cart/Action";

const CartItem = ({ item, isCart }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?.id,
    };
    dispatch(updateCartItem(data));
  };
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <div className="py-4 border-b-[1px] border-gray-200">
      <div className="flex">
        <img
          className="h-[10rem] w-[6rem] object-cover"
          src={item.product.imageUrl}
          alt=""
        />
        <div className="flex flex-1 flex-col ml-4">
          <p className="text-normal font-semibold text-gray-900">
            {item.product.brand}
          </p>
          <p className="text-normal  text-gray-900 pt-1">
            {item.product.title}
          </p>
          <div className="flex">
            <p>
              Size:&nbsp;
              {item.size},&nbsp;
            </p>
            <p>Color:&nbsp;{item.product.color},</p>
          </div>
          <div className="flex space-x-3 items-center text-sm text-gray-900 mt-4">
            <p className="font-semibold">${item.discountPrice}</p>
            <p className="opacity-50 line-through">${item.price}</p>
            <p className="text-green-600 font-semibold">
              {Math.round((item.price - item.discountPrice) / item.price) * 100}
              % OFF
            </p>
          </div>

          {isCart && (
            <div className="flex items-center mt-4">
              <IconButton
                onClick={() => handleUpdateCartItem(-1)}
                disabled={item.quantity <= 1}>
                <RemoveCircleOutlineIcon className="text-gray-300" />
              </IconButton>
              <span className="py-1 px-9 border rounded-3xl">
                {item.quantity}
              </span>
              <IconButton
                onClick={() => handleUpdateCartItem(1)}
                disabled={
                  item.quantity >=
                  item.product.sizes.find(
                    (sizeObj) => sizeObj.name == item.size
                  )?.quantity
                }>
                <AddCircleOutlineIcon className="text-gray-500 " />
              </IconButton>
              <Button
                variant="text"
                sx={{
                  marginLeft: 6,
                  fontSize: "14px",
                  textTransform: "none",
                  textDecoration: "underline",
                  color: "gray",
                }}
                onClick={handleRemoveCartItem}
                className="ml-6 text-sm text-gray-500 underline">
                remove
              </Button>
            </div>
          )}
          {!isCart && (
            <p className="text-lg font-semibold mt-3">x {item.quantity}</p>
          )}
        </div>
        <p className="font-semibold">${item.discountPrice}</p>
      </div>
    </div>
  );
};

export default CartItem;
