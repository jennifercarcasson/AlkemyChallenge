import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    flexgrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexgrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

export default function Header() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Hotel Canvas
            </Link>
          </Typography>

          <Link to="/search" className={classes.link}>
            Search
          </Link>
        </ToolBar>
      </AppBar>
    </div>
  );
}
