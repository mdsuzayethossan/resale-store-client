import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
const AdvertiseItems = () => {
  const [advertisedProducts, setAdvertisedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_domain}/advertised-products`)
      .then((response) => {
        setAdvertisedProducts(response.data);
      });
    setLoading(false);
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      {(advertisedProducts?.length && (
        <div className="py-20">
          <h2 className="text-2xl font-bold text-center mb-10">
            Advertised Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {advertisedProducts.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      )) ||
        ""}
    </>
  );
};

export default AdvertiseItems;
