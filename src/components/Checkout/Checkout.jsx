import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";

const Checkout = () => {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const totalCartPrice = items.reduce((totalPrice, item) => {
    return (totalPrice += item.price * item.quantity);
  }, 0);

  const formattedPrice = currencyFormatter.format(totalCartPrice);

  const handleCloseCheckout = () => {
    hideCheckout()
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {formattedPrice}</p>

        <Input label="Full Name" id="full-name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
