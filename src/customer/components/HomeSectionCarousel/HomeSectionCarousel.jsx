import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 2 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const renderNextButton = ({ isDisabled }) => {
    return (
      <ArrowForwardIosIcon
        style={{
          position: "absolute",
          right: "-20px",
          top: "140px",
          cursor: "pointer",
        }}
      />
    );
  };

  const renderPrevButton = ({ isDisabled }) => {
    return (
      <ArrowBackIosIcon
        style={{
          position: "absolute",
          left: "-20px",
          top: "140px",
          cursor: "pointer",
        }}
      />
    );
  };

  const items = data.map((item, index) => (
    <HomeSectionCard key={index} product={item} />
  ));

  return (
    <div className="">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5 ">
        {sectionName}
      </h2>
      <div className="relative p-5 border">
        <AliceCarousel
          items={items}
          infinite
          responsive={responsive}
          disableDotsControls
          onSlideChanged={(e) => setActiveIndex(e.item)}
          renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
        />
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
