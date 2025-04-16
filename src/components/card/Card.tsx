import { FC } from "react";
import { Product } from "../../types";
import "./Card.css";
import { Link } from "react-router-dom";

interface IPropsCard {
  product: Product;
}

export const Card: FC<IPropsCard> = ({ product }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={product.image} alt={"Image of " + product.denomination} />
      </div>
      <div className="card-content">
        <p className="name">{product.denomination}</p>
        <p className="detail">$ {product.price}</p>
        {product.availableStock < 10 ? (
          <p className="detail highlight">
            Last {product.availableStock} products available!
          </p>
        ) : (
          <p className="detail">{product.availableStock} products available</p>
        )}
        <Link to={`${product.id}`} className="button">
          See more
        </Link>
      </div>
    </div>
  );
};
