/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../Css/Restaurant/Check.css';
import profile from '../../Images/profile.png';
import { call } from '../../Service/ApiService';
import * as AppStorage from "../../AppStorage";

function Check() {
  const [categroy, setCategroy] = useState("전체");
  const [entireType, setEntireType] = useState(true);
  const [koreanType, setKoreanType] = useState(false);
  const [schoolType, setSchoolType] = useState(false);
  const [chineseType, setChineseType] = useState(false);
  const [japaneseType, setJapaneseType] = useState(false);
  const [westernType, setWesternType] = useState(false);
  const [cafeType, setCafeType] = useState(false);
  const [midnightType, setMidnightType] = useState(false);
  const [list, setList] = useState([]);
  const [entireList, setEntireList] = useState([]);
  const [koreanList, setKoreanList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [chineseList, setChineseList] = useState([]);
  const [japaneseList, setJapaneseList] = useState([]);
  const [westernList, setWesternList] = useState([]);
  const [cafeList, setCafeList] = useState([]);
  const [midnightList, setMidnightList] = useState([]);

  const allTypeOff = () => {
    setEntireType(false);
    setKoreanType(false);
    setSchoolType(false);
    setChineseType(false);
    setJapaneseType(false);
    setWesternType(false);
    setCafeType(false);
    setMidnightType(false);
  };

  const onEntireClick = () => {
    setCategroy("전체")
    setList(entireList);
    allTypeOff();
    setEntireType(true);
  };
  const onKoreanClick = () => {
    setCategroy("한식")
    setList(koreanList);
    allTypeOff();
    setKoreanType(true);
  };
  const onSchoolClick = () => {
    setCategroy("분식")
    setList(schoolList);
    allTypeOff();
    setSchoolType(true);
  };
  const onChineseClick = () => {
    setCategroy("중식")
    setList(chineseList);
    allTypeOff();
    setChineseType(true);
  };
  const onJapaneseClick = () => {
    setCategroy("일식")
    setList(japaneseList);
    allTypeOff();
    setJapaneseType(true);
  };
  const onWesternClick = () => {
    setCategroy("양식")
    setList(westernList);
    allTypeOff();
    setWesternType(true);
  };
  const onCafeClick = () => {
    setCategroy("카페")
    setList(cafeList);
    allTypeOff();
    setCafeType(true);
  };
  const onMidnightClick = () => {
    setCategroy("야식")
    setList(midnightList);
    allTypeOff();
    setMidnightType(true);
  };

  const onChoose = (restaurant_no, category) => {
    AppStorage.setItem("restaurant_no", restaurant_no);
    AppStorage.setItem("category", category);
  }

  useEffect(() => {
    call("/api/restaurant/getList", "GET", null).then((response) => { setList(response.data); });
    call("/api/restaurant/getList", "GET", null).then((response) => { setEntireList(response.data); });
    call("/api/restaurant/getListByCategory?category=한식", "GET", null).then((response) => { setKoreanList(response.data); });
    // call("/api/restaurant/getListByCategory?category=분식", "GET", null).then((response) => { setSchoolList(response.data); });
    call("/api/restaurant/getListByCategory?category=중식", "GET", null).then((response) => { setChineseList(response.data); });
    call("/api/restaurant/getListByCategory?category=일식", "GET", null).then((response) => { setJapaneseList(response.data); });
    call("/api/restaurant/getListByCategory?category=양식", "GET", null).then((response) => { setWesternList(response.data); });
    call("/api/restaurant/getListByCategory?category=카페", "GET", null).then((response) => { setCafeList(response.data); });
    call("/api/restaurant/getListByCategory?category=야식", "GET", null).then((response) => { setMidnightList(response.data); });
  }, []);

  // console.log(list);
  
  return (
    <div className='check'>
      <div className='header'>
        <a href='/make'>
          <span class='material-symbols-rounded'>chevron_left</span>
        </a>
        <h4>음식점 조회</h4>
      </div>
      <hr />
      <div className='main'>
        <div className='type'>
          <p className={`${entireType ? 'this' : ''}`} onClick={onEntireClick}>전체</p>
          <p className={`${koreanType ? 'this' : ''}`} onClick={onKoreanClick}>한식</p>
          <p className={`${schoolType ? 'this' : ''}`} onClick={onSchoolClick}>분식</p>
          <p className={`${chineseType ? 'this' : ''}`} onClick={onChineseClick}>중식</p>
          <p className={`${japaneseType ? 'this' : ''}`} onClick={onJapaneseClick}>일식</p>
          <p className={`${westernType ? 'this' : ''}`} onClick={onWesternClick}>양식</p>
          <p className={`${cafeType ? 'this' : ''}`} onClick={onCafeClick}>카페</p>
          <p className={`${midnightType ? 'this' : ''}`} onClick={onMidnightClick}>야식</p>
        </div>
        {list.map((item) => (
          <div className='restaurant' id={item.restaurant_no} key={item.restaurant_no}>
            <img src={profile} alt='profile' />
            <div className='price'>
              <div className='name'>
                <h4>{item.name}</h4>
              </div>
              <div className='tip'>
                <strong>배달팁</strong>
                <p>{item.delivery_tip}원</p>
              </div>
              <div className='least'>
                <strong>최소주문</strong>
                <p>{item.min_order_price}원</p>
              </div>
              <Link to="/make" state={{restaurant_no: item.restaurant_no}} onClick={() => onChoose(item.id, item.category)}>
                <button>선택</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Check;
