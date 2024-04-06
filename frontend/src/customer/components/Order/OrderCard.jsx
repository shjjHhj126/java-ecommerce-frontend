import { Grid } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/account/order/${3}`)}
      className="p-5 border-b-[1px] border-gray-500 hover:shadow-lg">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={5.5}>
          <div className="flex cursor-pointer">
            <img
              className="h-[9rem] w-[6rem] object-cover object-top"
              src="https://firebasestorage.googleapis.com/v0/b/java-ecommerce-69ec1.appspot.com/o/71EkSdyPDvL._AC_UY1000_.jpg?alt=media&token=7e84a2f8-8249-44a1-97fa-bbc914c4ca6e"
              alt=""
            />
            <div className="ml-5 space-y-2">
              <p className="">Casual Puff Sleeves Solid Women Black Top</p>
              <div className="flex gap-2">
                <p className="opacity-50 font-semibold text-sm">Size: M,</p>
                <p className="opacity-50 font-semibold text-sm">
                  Color: Black,
                </p>
                <p className="opacity-50 font-semibold text-sm">Quantity: 5,</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={0.5}>
          <p>$199</p>
        </Grid>
        <Grid item xs={4}>
          {true && (
            <div>
              <p>
                <ArrowRightIcon
                  sx={{ width: "30px", height: "30px" }}
                  className="text-black mr-2 text-sm"
                />
                <span>Delivered On March 03</span>
              </p>
              <p className="text-sm">Your Item Has Been Delivered</p>
            </div>
          )}
          {false && (
            <p>
              <ArrowRightIcon
                sx={{ width: "15px", height: "15px" }}
                className="text-black"
              />
              <span>Expected Delivery On March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
