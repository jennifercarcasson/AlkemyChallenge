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
import React from "react";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { Info } from "@material-ui/icons";
import { findByLabelText } from "@testing-library/react";

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
  summary,
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
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
        <Typography
          dangerouslySetInnerHTML={{ __html: summary }}
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>

        <div className={classes.infoContainer}>
          <div className={classes.infoRow}>
            {glutenFree && (
              <Typography variant="body2" color="textPrimary" component="p">
                Gluten Free
              </Typography>
            )}
            {dairyFree && (
              <Typography variant="body2" color="textPrimary" component="p">
                Diary Free
              </Typography>
            )}
            {vegan && (
              <Typography variant="body2" color="textPrimary" component="p">
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
                <Typography variant="body2" color="secondary" component="p">
                  {`Price per Serving: $${pricePerServing}`}
                </Typography>
                <Typography variant="body2" color="secondary" component="p">
                  Servings: {servings}
                </Typography>
                <Typography variant="body2" color="secondary" component="p">
                  {`Total: $${totalPrice}`}
                </Typography>
              </>
            }
          </div>
        </div>
      </CardContent>

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
            <IconButton aria-label="info" color="primary">
              <Info />
            </IconButton>
            <IconButton aria-label="info" color="primary">
              <Delete />
            </IconButton>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

export default DishCard;
