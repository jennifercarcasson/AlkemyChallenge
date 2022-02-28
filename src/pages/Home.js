import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
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
    display: "flex",
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

  const { menu } = appContext;

  return (
    <>
      <div className={classes.container}>
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
            ></DishCard>
          ))}
        </div>

        <div className={classes.precioTotalMenu}>
          <div className={classes.infoRow}>
            <Typography variant="body2" color="primary" component="p">
              {`Total del Menu: $${
                menu.length > 0
                  ? menu
                      .map((dish) => dish.totalPrice)
                      .reduce((acc, price) => acc + price)
                  : "0"
              }`}
            </Typography>
          </div>
          <div className={classes.infoRow}>
            <Typography variant="body2" color="primary" component="p">
              {`Health score Promedio: ${
                menu.length > 0
                  ? menu
                      .map((dish) => dish.healthScore)
                      .reduce((acc, score) => acc + score) / menu.length
                  : "0"
              }`}
            </Typography>
          </div>
          <div className={classes.infoRow}>
            <Typography variant="body2" color="primary" component="p">
              {`Tiempo de Preparación: ${
                menu.length > 0
                  ? menu
                      .map((dish) => dish.readyInMinutes)
                      .reduce((acc, score) => acc + score) / menu.length
                  : "0"
              }`}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
