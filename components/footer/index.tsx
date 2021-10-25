import { makeStyles } from "@mui/styles";
import { NextPage } from "next";

const useStyles = makeStyles(() => ({
  footer: {
    fontSize: "0.9rem",
    width: "100%",
    backgroundColor: "#F5F5F5",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    padding: "10px 10px",
  },
}));

const Footer: NextPage = () => {
  const classes = useStyles();
  return (
    <>
      <footer className={classes.footer}>
        2021 Kenny Leung Blog Opensource Project
      </footer>
    </>
  );
};

export default Footer;
