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
          fontWeight: "900",
          color: "#7CA380",
        }}
      >
        chevron_left
      </span>

      <h4>{title}</h4>
    </div>
  );
};

export default Nav;
