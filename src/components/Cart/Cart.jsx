import { useContext } from "react";
import CartContext from "../../store/CartContext.jsx";
import Modal from "../UI/Modal.jsx";
import { currencyFormatter } from "./../../util/formatting.js";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

const Cart = () => {
  const { items } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);

  const totalCartPrice = items.reduce((totalPrice, item) => {
    return (totalPrice += item.price * item.quantity);
  }, 0);

  const formattedPrice = currencyFormatter.format(totalCartPrice);

  const handleHideCart = () => {
    hideCart()
  }

  return (
    <Modal className="cart" open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{formattedPrice}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
