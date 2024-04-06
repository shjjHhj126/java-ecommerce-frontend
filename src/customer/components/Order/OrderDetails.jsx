import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-[90px] py-5 lg:py-[45px]">
      <div>
        <h1 className="text-xl font-bold py-5">Dispatch Destination</h1>
        <AddressCard />
      </div>

      <div className="py-10">
        <OrderTracker activeStep={3} />
      </div>

      <Grid container className="pl-10 ">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <Grid
            key={index}
            item
            container
            className="py-4 border-b-[1px]"
            sx={{ alignContent: "space-between" }}>
            <Grid item xs={10}>
              <div className="flex cursor-pointer relative">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/java-ecommerce-69ec1.appspot.com/o/71EkSdyPDvL._AC_UY1000_.jpg?alt=media&token=7e84a2f8-8249-44a1-97fa-bbc914c4ca6e"
                  alt=""
                  className="h-[9rem] w-[6rem] object-cover object-top"
                />
                <div className="flex flex-col ml-5 ">
                  <p className="">Casual Puff Sleeves Solid Women Black Top</p>
                  <div className="flex gap-2 mt-2">
                    <p className="opacity-50 font-semibold text-sm">Size: M,</p>
                    <p className="opacity-50 font-semibold text-sm">
                      Color: Black,
                    </p>
                    <p className="opacity-50 font-semibold text-sm">
                      Quantity: 5,
                    </p>
                  </div>
                  <p className="absolute bottom-0">$199</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box>
                <StarIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Rate & Review</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
