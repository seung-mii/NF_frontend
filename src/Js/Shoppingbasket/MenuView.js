import React, { useState } from "react";
import Nav from "../../components/Nav";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../../Css/Shoppingbasket/MenuView.css";
function MenuView() {
  //식당 정보도 백엔드에서 가져온다.
  const res = { name: "구미가당김", id: "1" };
  //menulist는 백엔드에서 가져온다. 식당 > 전체메뉴
  const menulist = [
    {
      name: "우돌돌피자",
      price: "15000원",
      id: "1",
      src: "https://ldb-phinf.pstatic.net/20200908_256/1599494234060B5s40_JPEG/TebGb1il2yj38iY1vZ_F_ONM.jpg",
    },

    {
      name: "알리오올리오",
      price: "11000원",
      id: "2",
      src: "https://ldb-phinf.pstatic.net/20200908_59/1599496218694Nb1Ma_JPEG/jNVLwar76hndVy0GCEf2VEvt.jpg",
    },
    {
      name: "까르보나라",
      price: "15000원",
      id: "3",
      src: "https://ldb-phinf.pstatic.net/20200908_175/1599494729582nC75d_JPEG/sAi84ZssSVcnVKO_C_4tSelT.jpg",
    },
    {
      name: "명란크림 리조또",
      price: "15000원",
      id: "4",
      src: "https://ldb-phinf.pstatic.net/20200121_173/1579600389452jkvPD_JPEG/H4LjMH_92RgOlcqr44yE68fm.jpg",
    },
    {
      name: "우돌돌피자",
      price: "15000원",
      id: "5",
      src: "https://ldb-phinf.pstatic.net/20200908_256/1599494234060B5s40_JPEG/TebGb1il2yj38iY1vZ_F_ONM.jpg",
    },

    {
      name: "알리오올리오",
      price: "11000원",
      id: "6",
      src: "https://ldb-phinf.pstatic.net/20200908_59/1599496218694Nb1Ma_JPEG/jNVLwar76hndVy0GCEf2VEvt.jpg",
    },
    {
      name: "까르보나라",
      price: "15000원",
      id: "7",
      src: "https://ldb-phinf.pstatic.net/20200908_175/1599494729582nC75d_JPEG/sAi84ZssSVcnVKO_C_4tSelT.jpg",
    },
    {
      name: "명란크림 리조또",
      price: "15000원",
      id: "8",
      src: "https://ldb-phinf.pstatic.net/20200121_173/1579600389452jkvPD_JPEG/H4LjMH_92RgOlcqr44yE68fm.jpg",
    },
    {
      name: "우돌돌피자",
      price: "15000원",
      id: "9",
      src: "https://ldb-phinf.pstatic.net/20200908_256/1599494234060B5s40_JPEG/TebGb1il2yj38iY1vZ_F_ONM.jpg",
    },

    {
      name: "알리오올리오",
      price: "11000원",
      id: "10",
      src: "https://ldb-phinf.pstatic.net/20200908_59/1599496218694Nb1Ma_JPEG/jNVLwar76hndVy0GCEf2VEvt.jpg",
    },
    {
      name: "까르보나라",
      price: "15000원",
      id: "11",
      src: "https://ldb-phinf.pstatic.net/20200908_175/1599494729582nC75d_JPEG/sAi84ZssSVcnVKO_C_4tSelT.jpg",
    },
    {
      name: "명란크림 리조또",
      price: "15000원",
      id: "12",
      src: "https://ldb-phinf.pstatic.net/20200121_173/1579600389452jkvPD_JPEG/H4LjMH_92RgOlcqr44yE68fm.jpg",
    },
  ];
  const [title, setTitle] = useState("메뉴 조회");
  const mainFunc = () => {
    window.location.href = "/";
  };
  const detailFood = (item) => {
    console.log(item);
    window.location.href = `/menudetail/${res.name}/${item.id}`;
  };
  const basketViewFunc = () => {
    window.location.href = "/basket";
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
                    {item.price}
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
    <div className="mvcontainer">
      <Nav title={title} />
      <div className="mv-header">
        <p className="text">{res.name}</p>
      </div>
      <hr className="hr" />

      {menulistitems}

      <div className="footer-container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Button className="btt" variant="contained" onClick={basketViewFunc}>
            공동 장바구니 보기
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default MenuView;
