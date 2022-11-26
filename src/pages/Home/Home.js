import React from "react";
import AdvertiseItems from "./AdvertiseItems";
import Banner from "./Banner";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="container">
      <Banner></Banner>
      <Categories></Categories>
      <AdvertiseItems></AdvertiseItems>
    </div>
  );
};

export default Home;
