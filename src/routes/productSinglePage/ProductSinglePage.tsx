import "./ProductSinglePage.css";
import { useEffect, useState } from "react";
import { OrderDetail, Product, Role } from "../../types";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getOneProduct } from "../../services/ServicesMock.mock";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../hooks/useUser";

export const ProductSinglePage = () => {
  const loaderData = useLoaderData();
  const [product, setProduct] = useState<Product>({
    id: 0,
    denomination: "",
    brand: "",
    model: "",
    price: 0,
    availableStock: 0,
    description: "",
    category: {
      id: 6,
      denomination: "undefined",
    },
    image: "",
  });
  const [quantity, setQuantity] = useState<number>(1);
  const { addCartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(loaderData);
  }, []);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity => quantity - 1);
    }
  };

  const handleIncrease = () => {
    quantity < product.availableStock
      ? setQuantity(quantity => quantity + 1)
      : alert("There is not enough stock available");
  };

  const handleAddToCart = () => {
    if ((user.role as Role) === Role.VISITOR) {
      navigate("/login");
      return;
    }

    const orderDetail: OrderDetail = {
      amount: quantity,
      product: product,
    };

    addCartItem(orderDetail);
    alert(`Added ${quantity} ${product.denomination} to cart`);
  };

  return (
    <div className="product-single-page">
      <div className="picture">
        <img src={product.image} alt={`Image of ${product.denomination}`} />
      </div>
      <div className="data">
        <div className="title">{product.denomination}</div>
        <div className="details">
          <div className="price">$ {product.price}</div>
          <div className="available-stock">
            {product.availableStock} items available
          </div>
          <div>
            Brand: {product.brand}. Model: {product.model}
          </div>
          <div>{product.description}</div>
        </div>
        <div className="add-to-cart">
          {(user.role as Role) === (Role.CLIENT as Role) && (
            <div className="quantity-selector">
              <button onClick={handleDecrease} className="actionButton">
                Remove one
              </button>
              <div className="quantity">{quantity}</div>
              <button onClick={handleIncrease} className="actionButton">
                Add one
              </button>
            </div>
          )}
          <button onClick={handleAddToCart} className="addButton">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const singleProductLoader: LoaderFunction = (
  args: LoaderFunctionArgs,
) => {
  const { id } = args.params;
  const foundProduct = getOneProduct(Number(id));

  if (!foundProduct) {
    return redirect("/list");
  }

  return foundProduct;
};
