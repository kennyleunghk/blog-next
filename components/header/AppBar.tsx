import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { makeStyles } from "@mui/styles";

import { authActions } from "../../store/slices/auth-slice";
import { rootState } from "../../store";

const useStyle = makeStyles((theme) => ({
  toolbar: {
    //   borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  toolbarTitleLink: {
    fontFamily: 'Gill Sans", sans-serif',
    fontWeight: "bold",
    color: "black",
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "none",
      color: "black",
    },
  },
  toggleDiv: {
    width: "100%",
    textAlign: "center",
  },
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
  newPost: {
    backgroundColor: "#06FF9B",
    border: "2px solid",
    fontSize: "15px",
    color: "white",
    fontWeight: "bold",
    padding: "10px 10px",
    borderRadius: "10px",
    "&:hover": {
      fontWeight: "bold",
      border: "2px solid #AEAEAE",
      textDecoration: "none",
      color: "#007391",
    },
  },
}));

const AppBar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);

  const logoff = () => {
    dispatch(authActions.logout());
    router.push("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand className={classes.toolbarTitle} href="/">
        KennyLeung Blog
      </Navbar.Brand>
      <Nav className="me-auto">
        {isLoggedIn ? (
          <Button
            variant="contained"
            onClick={() => router.push("/Publish")}
            size={"small"}
            color="primary"
          >
            New Post
          </Button>
        ) : null}
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <div className={classes.toggleDiv}>
            <IconButton onClick={() => router.push("/Search")}>
              <SearchIcon />
            </IconButton>

            <IconButton>
              <GitHubIcon
                onClick={() =>
                  window.open("https://gitlab.com/users/kennycha87/projects")
                }
              />
            </IconButton>

            <IconButton onClick={() => router.push("/about")}>
              <InfoIcon />
            </IconButton>

            {isLoggedIn ? (
              <IconButton onClick={logoff}>
                <ExitToAppIcon>Log off</ExitToAppIcon>
              </IconButton>
            ) : (
              <IconButton>
                <AccountCircleIcon onClick={() => router.push("/Login")} />
              </IconButton>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppBar;
