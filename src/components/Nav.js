import React from "react";
import "../Css/Shoppingbasket/Nav.css";

const Nav = (props) => {
  const title = props.title;

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="navbar">
      <span
        class="material-symbols-rounded"
        onClick={() => goBack()}
        style={{
          float: "left",
          marginLeft: "20px",
          fontWeight: "900",
          color: "#5a9367",
        }}
      >
        chevron_left
      </span>

      <h4 style={{ marginRight: "45px" }}>{title}</h4>
    </div>
  );
};

export default Nav;
