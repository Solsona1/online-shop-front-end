import { FC } from "react";
import "./ProductsGrid.css";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import {
  deleteProduct,
  getProductPDF,
} from "../../services/ServicesMock.mock";

interface IPropsProductsGrid {
  filteredData: Product[];
}

export const ProductsGrid: FC<IPropsProductsGrid> = ({ filteredData }) => {
  const navigate = useNavigate();

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
  };

  const handleActions = (event: any, productId: number) => {
    switch (event.target.value) {
      case "edit":
        navigate(`form/${productId}`);
        break;
      case "delete":
        handleDelete(productId);
        break;
      case "to-pdf":
        getProductPDF(productId);
        break;
      default:
        return;
    }
  };

  return (
    <div className="grid">
      <div className="row">
        <div className="title">id</div>
        <div className="title">Product</div>
        <div className="title only-bgs">Brand</div>
        <div className="title only-bgs">Model</div>
        <div className="title only-bgs">Price</div>
        <div className="title only-bgs">Stock</div>
        <div className="title only-bgs">Edit</div>
        <div className="title only-bgs">Delete</div>
        <div className="title only-bgs">Download PDF</div>
        <div className="title only-sms">Actions</div>
      </div>
      {filteredData &&
        filteredData.map((product: Product, k: number) => (
          <div className="row" key={k}>
            <div>{product.id}</div>
            <div>{product.denomination}</div>
            <div className="only-bgs">{product.brand}</div>
            <div className="only-bgs">{product.model}</div>
            <div className="only-bgs">{product.price}</div>
            <div className="only-bgs">{product.availableStock}</div>
            <div className="action only-bgs">
              <Link className="button" to={`form/${product.id}`}>
                Edit
              </Link>
            </div>
            <div className="action only-bgs">
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
            <div className="action only-bgs">
              <button>PDF</button>
            </div>
            <div className="only-sms">
              <select
                className="actions"
                onChange={e => {
                  handleActions(e, product.id);
                }}
              >
                <option value="0">Actions</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="to-pdf">PDF</option>
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};
