import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_domain}/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className="w-full mx-auto my-20">
      <h2 className="text-2xl font-bold text-center mb-10">
        Second-hand product categories{" "}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            to={`/category/${category._id}`}
            className="btn btn-primary"
            key={category._id}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
