import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_domain}/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-center">Product categories </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Category></Category>
        ))}
      </div>
    </div>
  );
};

export default Categories;
