import { Container, makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../App";
import DishCard from "../components/DishCard";

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
  container: {
    width: "1000px",
    justify: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    flex: 0.8,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  precioTotalMenu: {
    display: "flex",
    flexDirection: "column",
    flex: 0.2,
  },
});

const Home = () => {
  const classes = useStyles();
  const appContext = useContext(AppContext);
  const { menu, setMenu, setDishesQuantity } = appContext;
  const infoClickHandler = (dishId) => {
    const dish = menu.find((dish) => dish.id === dishId);
    Swal.fire({
      title: dish.title,
      html: dish.summary,
    });
  };

  const onCardClick = () => {
    const menuTotalPrice =
      menu.length > 0
        ? menu
            .map((dish) => dish.totalPrice)
            .reduce((acc, price) => acc + price)
        : "0";

    const healthScoreAverage =
      menu.length > 0
        ? menu
            .map((dish) => dish.healthScore)
            .reduce((acc, score) => acc + score) / menu.length
        : "0";

    const readyInMinutesAverage =
      menu.length > 0
        ? menu
            .map((dish) => dish.readyInMinutes)
            .reduce((acc, score) => acc + score) / menu.length
        : "0";

    Swal.fire({
      icon: "info",
      title: "Información Del Menú",
      html: `<p>Total Del Menú: <b>$${menuTotalPrice}</b></p>
                 <p>Health Score Promedio: <b>${healthScoreAverage}</b></p>
                 <p>Tiempo De Preparación Promedio: <b>${readyInMinutesAverage}</b></p>`,
    });
  };

  const deleteClickHandler = (dishId) => {
    const dish = menu.find((dish) => dish.id === dishId);
    const filteredMenu = menu.filter((dish) => dish.id !== dishId);
    Swal.fire({
      title: "¿ Seguro que quieres borrar el plato ?",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (dish.vegan) {
          setDishesQuantity((prevQuantities) => ({
            ...prevQuantities,
            vegan: prevQuantities.vegan - 1,
          }));
        } else {
          setDishesQuantity((prevQuantities) => ({
            ...prevQuantities,
            noVegan: prevQuantities.noVegan - 1,
          }));
        }
        setMenu(filteredMenu);
      }
    });
  };
  return (
    <>
      <Container>
        <Typography variant="h2" color="primary" component="h">
          Menú
        </Typography>
        <div className={classes.menuContainer}>
          {menu.map((dish) => (
            <DishCard
              key={dish.id}
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
              totalPrice={dish.totalPrice}
              deleteClickHandler={deleteClickHandler}
              infoClickHandler={infoClickHandler}
              onCardClick={onCardClick}
            ></DishCard>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
