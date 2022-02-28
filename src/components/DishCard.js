import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import DeleteIcon, { Delete, PlusOne } from "@material-ui/icons";
import React, { useContext } from "react";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { Info } from "@material-ui/icons";
import { findByLabelText } from "@testing-library/react";
import { AppContext } from "../App";

const useStyles = makeStyles({
  root: {
    width: 450,
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
  infoContainer: {},
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const DishCard = ({
  addToMenu = false,
  id,
  image,
  pricePerServing,
  servings,
  title,
  vegan,
  dairyFree,
  glutenFree,
  vegetarian,
  healthScore,
  readyInMinutes,
  onAddDishHandler,
  totalPrice,
  infoClickHandler,
  deleteClickHandler,
  onCardClick = () => {},
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onCardClick}>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
          characteristics=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          <div className={classes.infoContainer}>
            <div className={classes.infoRow}>
              {glutenFree && (
                <Typography variant="body2" color="primary" component="p">
                  Gluten Free
                </Typography>
              )}
              {dairyFree && (
                <Typography variant="body2" color="primary" component="p">
                  Diary Free
                </Typography>
              )}
              {vegan && (
                <Typography variant="body2" color="primary" component="p">
                  Vegan
                </Typography>
              )}
            </div>

            {
              <div className={classes.infoRow}>
                <Typography variant="body2" color="primary" component="p">
                  Health Score: {healthScore}
                </Typography>
                <Typography variant="body2" color="primary" component="p">
                  Ready in Minutes: {readyInMinutes}
                </Typography>
              </div>
            }

            <div className={classes.infoRow}>
              {
                <>
                  <Typography variant="body2" color="primary" component="p">
                    {`Price per Serving: $${pricePerServing}`}
                  </Typography>
                  <Typography variant="body2" color="primary" component="p">
                    Servings: {servings}
                  </Typography>
                  <Typography variant="body2" color="primary" component="p">
                    {`Total: $${totalPrice}`}
                  </Typography>
                </>
              }
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "right" }}>
        {addToMenu ? (
          <div>
            {" "}
            <IconButton
              aria-label="add"
              color="primary"
              onClick={() => onAddDishHandler(id)}
            >
              <PlusOne />
            </IconButton>
          </div>
        ) : (
          <div>
            <IconButton
              aria-label="info"
              color="primary"
              onClick={() => infoClickHandler(id)}
            >
              <Info />
            </IconButton>
            <IconButton
              aria-label="info"
              color="primary"
              onClick={() => deleteClickHandler(id)}
            >
              <Delete />
            </IconButton>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

export default DishCard;
