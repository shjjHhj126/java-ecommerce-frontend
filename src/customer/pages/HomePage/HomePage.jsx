import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { men_suits } from "../../../Data/Men/men_suits";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="">
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel data={men_suits} sectionName={"Suits"} />
        <HomeSectionCarousel data={men_suits} sectionName={"Dresses"} />
        <HomeSectionCarousel data={men_suits} sectionName={"Shoes"} />
      </div>
    </div>
  );
};

export default HomePage;
