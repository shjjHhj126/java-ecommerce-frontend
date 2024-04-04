import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from "./MainCarouselData";
// import { useNavigate } from "react-router-dom";

const MainCarousel = () => {
  // const navigate = useNavigate();
  const items = MainCarouselData.map((item) => (
    <img
      key={item.path}
      className="cursor-pointer w-full h-[500px] object-cover "
      src={item.image}
      alt=""
    />
  ));

  return (
    <div className="z-10">
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      />
    </div>
  );
};

export default MainCarousel;
