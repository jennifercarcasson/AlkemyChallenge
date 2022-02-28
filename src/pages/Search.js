import React, { useContext, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import axios from "axios";
import { AppContext } from "../App";
import DishCard from "../components/DishCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [dishes, setDishes] = useState([]);
  const maxDishes = 30;

  const { API_KEY, menu, setMenu, dishesQuantity, setDishesQuantity } =
    appContext;
  console.log(menu);
  const onClickHandler = () => {
    if (searchText.length >= 2) {
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
    const filteredDishes = dishes.filter((dish) => dish.id !== dishId);
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
          const filteredDishes = dishes.filter((dish) => dish.id !== dishId);
          setDishes(filteredDishes);
          Swal.fire({
            title: "¿ Deseas agregar otro plato al menú ?",
            text: `Has agregado ${dish.title} al menú`,
            showDenyButton: true,
            confirmButtonText: "Si, agregar otro",
            denyButtonText: `No, ir al menú`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
              navigate("/");
            }
          });
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
          setDishes(filteredDishes);
          Swal.fire({
            title: "¿ Deseas agregar otro plato al menú ?",
            text: `Has agregado ${dish.title} al menú`,
            showDenyButton: true,
            confirmButtonText: "Si, agregar otro",
            denyButtonText: `No, ir al menú`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
              navigate("/");
            }
          });
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
      <Container>
        <TextField
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && onClickHandler()}
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
      </Container>

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
              totalPrice={dish.pricePerServing * dish.servings}
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
