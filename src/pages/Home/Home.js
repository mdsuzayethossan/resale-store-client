import React from "react";
import About from "./About";
import AdvertiseItems from "./AdvertiseItems";
import Banner from "./Banner";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <Categories></Categories>
      <AdvertiseItems></AdvertiseItems>
      <About></About>
    </div>
  );
};

export default Home;
