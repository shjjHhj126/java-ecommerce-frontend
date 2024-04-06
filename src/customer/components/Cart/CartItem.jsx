import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";

const CartItem = () => {
  return (
    <div className="py-4 border-b-[1px] border-gray-200">
      <div className="flex">
        <img
          className="h-[10rem] w-[6rem] object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/java-ecommerce-69ec1.appspot.com/o/71EkSdyPDvL._AC_UY1000_.jpg?alt=media&token=7e84a2f8-8249-44a1-97fa-bbc914c4ca6e"
          alt=""
        />
        <div className="flex flex-1 flex-col ml-4">
          <p className="text-normal font-semibold text-gray-900">
            Universaloutfit
          </p>
          <p className="text-normal  text-gray-900 pt-1">
            Casual Puff Sleeves Solid Women Black Top
          </p>
          <div className="flex">
            <p>Size:&nbsp;L,&nbsp; </p>
            <p>Color:&nbsp;black ,</p>
          </div>
          <div className="flex space-x-3 items-center text-sm text-gray-900 mt-4">
            <p className="font-semibold">$199</p>
            <p className="opacity-50 line-through">$2000</p>
            <p className="text-green-600 font-semibold">5% OFF</p>
          </div>

          <div className="flex items-center mt-4">
            <IconButton>
              <RemoveCircleOutlineIcon className="text-gray-300" />
            </IconButton>
            <span className="py-1 px-9 border rounded-3xl">6</span>
            <IconButton>
              <AddCircleOutlineIcon className="text-gray-500 " />
            </IconButton>
            <div className="ml-6 text-sm text-gray-500 underline">remove</div>
          </div>
        </div>
        <p className="font-semibold">$199.00</p>
      </div>
    </div>
  );
};

export default CartItem;
