import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";
const Products = () => {
  const loadProducts = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }
  return (
    <div className="container py-20">
      {(loadProducts.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {loadProducts.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      )) || (
        <p className="font-bold text-xl text-primary text-center">
          There are no products in this category.
        </p>
      )}
    </div>
  );
};

export default Products;
