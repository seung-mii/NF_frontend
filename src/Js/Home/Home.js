import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../Css/Home/Home.css';
import profile from '../../Images/profile.png';
import { call } from '../../Service/ApiService';
import * as AppStorage from "../../AppStorage";

function Home() {
  AppStorage.setItem("max_people", 2);
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

  const onParticipate = (board_no) => {
    call(`/api/participation/in/${board_no}`, "GET", null).then((response) => { });
    window.location.reload();
  }

  useEffect(() => {
    call("/api/board/getList", "GET", null).then((response) => { setList(response.data); });
    call("/api/board/getList", "GET", null).then((response) => { setEntireList(response.data); });
    call("/api/board/getListByCategory?category=한식", "GET", null).then((response) => { setKoreanList(response.data); });
    call("/api/board/getListByCategory?category=분식", "GET", null).then((response) => { setSchoolList(response.data); });
    call("/api/board/getListByCategory?category=중식", "GET", null).then((response) => { setChineseList(response.data); });
    call("/api/board/getListByCategory?category=일식", "GET", null).then((response) => { setJapaneseList(response.data); });
    call("/api/board/getListByCategory?category=양식", "GET", null).then((response) => { setWesternList(response.data); });
    call("/api/board/getListByCategory?category=카페", "GET", null).then((response) => { setCafeList(response.data); });
    call("/api/board/getListByCategory?category=야식", "GET", null).then((response) => { setMidnightList(response.data); });
  }, []);

  // console.log(list);
  
  return (
    <div className='home'>
      <div className='header'>
        ❝ NeighborFood ❞
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
        {list && list.map((item) => 
          <div className='board' id={item.board_no} key={item.board_no}>
            <div className='user'>
              <img src={profile} alt='profile' />
              <div className='infor'>
                <p className='name'>{item.member.name}</p>
                <p className='date'>{item.reg_date.slice(0, 14)}</p>
              </div>
            </div>
            <h4 className='title'>{item.title}</h4>
            <p className='content'>{item.contents}</p>
            <div className='location'>
              <span class="material-symbols-rounded">location_on</span>
              <p>{item.location}</p>
            </div>
            <div className='restaurant'>
              <span class="material-symbols-rounded">home</span>
              <p>{item.restaurant.name}</p>
            </div>
            <div className='btn'>
              <Link to={`/board/${item.board_no}`}>
                <button>댓글 작성</button>
              </Link>
              <button className='primary' onClick={() => onParticipate(item.board_no)}>
                참여 ({item.cur_people}/{item.max_people})
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='footer'>
        <div className='option'>
          <a href='/home'>
            <span class="material-symbols-rounded">home</span>
            <h2>홈</h2>
          </a>
        </div>
        <div className='option'>
          <a href='/make'>
            <span class="material-symbols-rounded">add_circle</span>
            <h2>모임 만들기</h2>
          </a>
        </div>
        <div className='option'>
          <a href='/mypage'>
            <span class="material-symbols-rounded">person</span>
            <h2>마이페이지</h2>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
