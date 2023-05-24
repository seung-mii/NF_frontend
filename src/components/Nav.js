import React from "react";
import "../Css/Shoppingbasket/Nav.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
const Nav = (props) => {
  const title = props.title;
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
    // <div className="nav">
    //   <span class="material-symbols-rounded" onClick={() => goBack()}>
    //     chevron_left
    //   </span>
    //   <h4>{title}</h4>
    // </div>
  );
};

export default Nav;
