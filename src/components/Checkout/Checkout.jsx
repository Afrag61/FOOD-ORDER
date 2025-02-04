import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import useHttp from "../../hooks/useHttp.js";
import Error from "../UI/Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useHttp("http://192.168.1.3:3000/orders", requestConfig);

  const totalCartPrice = items.reduce((totalPrice, item) => {
    return (totalPrice += item.price * item.quantity);
  }, 0);

  const formattedPrice = currencyFormatter.format(totalCartPrice);

  const handleCloseCheckout = () => {
    hideCheckout();
  };

  const handleFinish = () => {
    hideCheckout()
    clearCart()
    clearData()
  }

  const checkoutAction = async (formData) => {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          we will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form action={checkoutAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {formattedPrice}</p>

        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title={"Failed to submit order"} message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
