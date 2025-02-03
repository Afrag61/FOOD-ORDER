import CartContext from "../../store/CartContext.jsx";
import { useContext } from "react";
import Button from "../UI/Button.jsx";
import logo from "./../../assets/logo.jpg";
import UserProgressContext from "../../store/UserProgressContext.jsx";

const Header = () => {
  const {items} = useContext(CartContext)
  const {showCart} = useContext(UserProgressContext)

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0)

  const handleShowCart = () => {
    showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
