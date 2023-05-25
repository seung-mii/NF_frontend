import React, { useState, useEffect } from "react";
import "../../Css/Shoppingbasket/Nav.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../../Css/Shoppingbasket/MenuView.css";
import { call } from "../../Service/ApiService";
import { useParams } from "react-router-dom";
function MenuView() {
  const [title, setTitle] = useState("메뉴 조회");
  const [res, setRes] = useState({ name: "", id: "" });
  const [menulist, setMenulist] = useState([]);
  // const board_no = 12;
  const { board_no } = useParams();
  useEffect(() => {
    call(`/api/board/get/${board_no}`, "GET", null)
      .then((response) =>
        setRes({
          id: response.data.restaurant.restaurant_no,
          name: response.data.restaurant.name,
        })
      )
      .catch((error) => {
        alert(error.error);
      });
  }, []);
  useEffect(() => {
    if (res.id) {
      call(`/api/menu/restaurant/${res.id}`, "GET", null)
        .then((response) =>
          // console.log(response)
          setMenulist(response.data)
        )
        .catch((error) => {
          alert(error.error);
        });
    }
  }, [res.id]);

  const detailFood = (item) => {
    console.log(item);
    window.location.href = `/menudetail/${board_no}/${res.name}/${item.menu_no}`;
  };
  const basketViewFunc = () => {
    window.location.href = `/basket/${board_no}`;
  };
  var menulistitems = menulist.length > 0 && (
    <List className="list">
      {menulist.map((item, idx) => (
        <>
          {/* 전체 아이템 */}
          <ListItem
            id={item.id}
            key={item.id}
            alignItems="flex-start"
            onClick={() => {
              detailFood(item);
            }}
            className="listitem"
          >
            {/* 아바타 */}
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt={item.name}
                src={item.src}
                className="avatar"
              />
            </ListItemAvatar>
            {/* 텍스트 */}
            <ListItemText
              primaryTypographyProps={{
                fontSize: "15px",
                fontWeight: "700",
                marginTop: "10px",
              }}
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    className="typography"
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.price}원
                  </Typography>
                </React.Fragment>
              }
              className="listitemtext"
            />
          </ListItem>
        </>
      ))}
    </List>
  );
  return (
    <>
      <div className="navbar">
        <span
          class="material-symbols-rounded"
          onClick={() => (window.location.href = `/board/${board_no}`)}
          style={{
            float: "left",
            fontWeight: "900",
            color: "#7CA380",
          }}
        >
          chevron_left
        </span>

        <h4 style={{ marginRight: "45px" }}>{title}</h4>
      </div>
      <div className="mvcontainer">
        <div className="mv-header">
          <p className="text">「 {res.name} 」</p>
        </div>

        {menulistitems}

        <div className="footer-container">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <button
              className="view_btt"
              variant="contained"
              onClick={basketViewFunc}
            >
              공동 장바구니 보기
            </button>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default MenuView;
