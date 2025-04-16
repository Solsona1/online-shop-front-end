import { Link } from "react-router-dom";
import "./CartPage.css";
import { OrderDetail } from "../../types";
import { useCart } from "../../hooks/useCart";

export const CartPage = () => {
  const { cart, removeCartItem } = useCart();

  const handleDelete = (targetDetail: OrderDetail) => {
    removeCartItem(targetDetail);
    alert("Removed item: " + targetDetail.product.denomination);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total: number, detail: OrderDetail) =>
        total + detail.amount * detail.product.price,
      0,
    );
  };

  return (
    <div className="cart-page">
      <h1 className="only-sms">Cart</h1>
      {cart.length == 0 ? (
        <div className="empty-cart">
          The cart is empty, see our products <Link to={"/list"}>here</Link>
        </div>
      ) : (
        <div className="cart">
          <div className="products">
            {cart.map((detail: OrderDetail, k: number) => (
              <div className="row" key={k}>
                <div>{detail.product.denomination}</div>
                <div>$ {detail.product.price * detail.amount}</div>
                <div>
                  <span className="only-bgs">Amount: </span>x{detail.amount}
                </div>
                <div className="action">
                  <button onClick={() => handleDelete(detail)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="prices">
            <div className="total">Total: $ {calculateTotal()}</div>
            <button>CONTINUE</button>
          </div>
        </div>
      )}
    </div>
  );
};
