import "./ProductsListPage.css";
import { Card } from "../../components/card/Card";
import { Product } from "../../types";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getAllProducts } from "../../services/ServicesMock.mock";

export const ProductsListPage = () => {
  const products = useLoaderData();

  return (
    <div className="wrapper">
      <div className="products-list">
        {products.map((product: Product, index: number) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export const productsLoader: LoaderFunction = () => {
  return getAllProducts();
};
