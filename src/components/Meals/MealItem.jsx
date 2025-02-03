import {currencyFormatter} from './../../util/formatting.js'
import { useContext } from 'react';
import CartContext from '../../store/CartContext.jsx';
import Button from '../UI/Button.jsx';

const MealItem = ({ meal }) => {
    const {addItem} = useContext(CartContext)
    const formattedPrice = currencyFormatter.format(meal.price)

    const handleAddMealToCart = () => {
      addItem(meal)
    }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://192.168.1.3:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formattedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart} >Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
