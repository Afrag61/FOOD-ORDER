import Error from "../UI/Error";
import useHttp from "./../../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://192.168.1.3:3000/meals", requestConfig, []);

  if(error){
    return <Error title="Failed to fetch meals" message={error}/>
  }

  if (isLoading) {
    return <h1 className="load-meals-text">Fetching meals...</h1>;
  }

  return (
    <ul id="meals">
      {loadedMeals &&
        loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
};

export default Meals;
