import React from "react";
import "../Css/Shoppingbasket/Nav.css";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
const Nav = (props) => {
  const title = props.title;
  //   const history = useHistory();
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="nav">
      <div onClick={goBack}>
        <ArrowBackIosRoundedIcon className="icon" />
      </div>
      <p className="title">{title}</p>
    </div>
  );
};

export default Nav;
