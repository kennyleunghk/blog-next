import { useSelector } from "react-redux";
import Link from "next/link";
import { Toolbar } from "@mui/material";
import { rootState } from "../../store";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  toolbarLink: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#4A4A4A",
    color: "white",
    padding: "10px 10px",

    "&:hover": {
      backgroundColor: "#FFC250",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#007391",
    },
    "&:active": {
      backgroundColor: "#FFC250",
    },
  },
}));

const CategoryBar = () => {
  const categories = useSelector((state: rootState) => state.posts.categories);
  const classes = useStyle();
  return (
    <Toolbar
      component="nav"
      variant="dense"
      style={{ display: "flex", padding: "0 0 0 0" }}
    >
      {categories.map((section, index) => (
        <Link
          noWrap
          key={index}
          to={"/" + section.name}
          id={section.name}
          className={classes.toolbarLink}
        >
          {section.name}
        </Link>
      ))}
    </Toolbar>
  );
};

export default CategoryBar;
