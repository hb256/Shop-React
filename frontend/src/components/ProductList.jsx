import { useState, useEffect, useReducer } from "react";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import useProducts from "./hooks/useProducts";
import { useMemo } from "react";

const ProductList = ({ cartDispatch }) => {
  const { products, isError, isLoading } = useProducts();

  const productElements = useMemo(
    () =>
      products?.map((p) => (
        <ProductItem key={p.id} {...p} dispatch={cartDispatch} />
      )),
    [products]
  );

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        <p>ssError {isError.info}</p>
      </div>
    );
  // console.log("Render List: " + JSON.stringify(products));

  return (
    <div className="basis-2/3 ">
      <h2>P list</h2>
      <div className="flex flex-row ">
        <div className="flex flex-row gap-2 flex-wrap gap-y-6">
          {productElements}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
