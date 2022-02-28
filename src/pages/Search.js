import React, { useContext, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import axios from "axios";
import { AppContext } from "../App";
import DishCard from "../components/DishCard";
import Swal from "sweetalert2";

const Search = () => {
  const appContext = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [dishes, setDishes] = useState([]);
  const maxDishes = 30;

  const { API_KEY, menu, setMenu, dishesQuantity, setDishesQuantity } =
    appContext;
  console.log(menu);
  const onClickHandler = () => {
    const valid = true;
    if (valid) {
      axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=${maxDishes}&query=${searchText}${
          isVegan ? "&diet=vegan" : ""
        }&apiKey=${API_KEY}`,
      })
        .then((callResult) => {
          setDishes(callResult.data.results);
        })
        .catch(() => {});
    }
  };

  const onAddDishHandler = (dishId) => {
    const dish = dishes.find((dish) => dish.id === dishId);
    if (menu.filter((dish) => dish.id === dishId).length < 1) {
      if (dish.vegan) {
        if (dishesQuantity?.vegan < dishesQuantity?.maxVegan) {
          setMenu((prevDishes) => [
            ...prevDishes,
            { ...dish, totalPrice: dish.pricePerServing * dish.servings },
          ]);
          setDishesQuantity((prevQuantities) => ({
            ...prevQuantities,
            vegan: prevQuantities.vegan + 1,
          }));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'No puede agregar plato "vegano"!',
          });
        }
      } else {
        if (dishesQuantity?.noVegan < dishesQuantity?.maxNoVegan) {
          setMenu((prevDishes) => [
            ...prevDishes,
            { ...dish, totalPrice: dish.pricePerServing * dish.servings },
          ]);
          setDishesQuantity((prevQuantities) => ({
            ...prevQuantities,
            noVegan: prevQuantities.noVegan + 1,
          }));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'No puede agregar plato "No Vegano"!',
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya elegiste este plato!",
      });
    }
  };

  return (
    <>
      <div className="searchBar">
        <TextField
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <FormControlLabel
          label="Vegan"
          control={
            <Checkbox onChange={(event) => setIsVegan(event.target.checked)} />
          }
        />
        <Button variant="contained" color="primary" onClick={onClickHandler}>
          Search
        </Button>
      </div>

      {}
      <div className="dishesContainer">
        {dishes.map((dish) => {
          return (
            <DishCard
              key={dish.id}
              addToMenu={true}
              id={dish.id}
              image={dish.image}
              summary={dish.summary}
              pricePerServing={dish.pricePerServing}
              servings={dish.servings}
              title={dish.title}
              vegan={dish.vegan}
              dairyFree={dish.dairyFree}
              glutenFree={dish.glutenFree}
              healthScore={dish.healthScore}
              readyInMinutes={dish.readyInMinutes}
              onAddDishHandler={onAddDishHandler}
            ></DishCard>
          );
        })}
      </div>
    </>
  );
};

export default Search;
