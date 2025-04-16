import "./ProductsCrud.css";
import { Link, useLoaderData } from "react-router-dom";
import { Filter } from "../../components/filter/Filter";
import { ProductsGrid } from "../../components/productsGrid/ProductsGrid";
import { useEffect, useState } from "react";
import { Product } from "../../types";

export const ProductsCrudPage = () => {
  const loaderData = useLoaderData();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(loaderData);
  }, []);

  return (
    <div className="crud">
      <div className="header">
        <Link className="button" to={"form"}>
          Create new
        </Link>
        <div className="filter-wrapper">
          <Filter setResults={setProducts} />
        </div>
      </div>
      <div className="table-wrapper">
        <ProductsGrid filteredData={products} />
      </div>
    </div>
  );
};
