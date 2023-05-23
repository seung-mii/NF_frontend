/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import '../../Css/Meeting/Make.css';
import { call } from '../../Service/ApiService';

function Make() {
  const location = useLocation();
  const restaurant_no = location.state?.restaurant_no;
  const [list, setList] = useState({
    title: "",
    contents: "",
    category: "",
    restaurant_no: restaurant_no,
    max_people: 1,
    latitude: "",
    longtitude: "",
    order_time: ""
  }); 

  const onDecrease = () => { setList((prevState) => ({ ...prevState, max_people: list.max_people - 1})); }
  const onIncrease = () => { setList((prevState) => ({ ...prevState, max_people: list.max_people + 1})); }
  const onInputTitleChange = (e) => { setList((prevState) => ({ ...prevState, title : e.target.value})); }
  const onInputContentsChange = (e) => { setList((prevState) => ({ ...prevState, contents: e.target.value})); }
  const onInputCategoryChange = (e) => { setList((prevState) => ({ ...prevState, category: e.target.value})); }
  // const onInputRestaurantChange = (e) => { setList((prevState) => ({ ...prevState, restaurant_no: e.target.value})); } 
  const onInputPeopleChange = (e) => { setList((prevState) => ({ ...prevState, max_people: e.target.value})); }
  const onInputTimeChange = (e) => { setList({ ...list, [e.target.name]: e.target.value })}  

  const handleSubmit = (e) => {
    e.preventDefault();

    setList((prevState) => ({ ...prevState, order_time: list.year + list.month + list.day + list.hour + list.minute}));
    call("/api/board/create", "POST", list).then((response) => {
      setList(response.data);
      window.location.href = "/home";
    });
  };

  console.log(list);
  console.log("restaurant_no :: ", restaurant_no);
  
  return (
    <div className='make'>
      <div className='header'>
        <a href='/home'><span className="material-symbols-rounded">chevron_left</span></a>
        <h4>모임 만들기</h4>
      </div>
      <form noValidate onSubmit={handleSubmit} className='main'>
        <div className='title'>
          <h4>제목</h4>
          <input required
            id='title' name='title' type='text'
            placeholder='제목을 작성해 주세요.'
            value={list.title}
            onChange={onInputTitleChange}
          />
        </div>
        <hr />
        <div className='content'>
          <h4>본문</h4>
          <textarea
            id='contents' name='contents' type='text'
            placeholder='본문을 작성해 주세요.'
            value={list.contents}
            onChange={onInputContentsChange}
          />
        </div>
        <hr />
        <div className='category'>
          <h4>음식 카테고리</h4>
          <select
            id='category' name='category'
            value={list.category}
            onChange={onInputCategoryChange}
          >
            <option selected>음식 카테고리를 선택해 주세요.</option>
            <option value="한식">한식</option>
            <option value="분식">분식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="카페">카페</option>
            <option value="야식">야식</option>
          </select>
        </div>
        <hr />
        <div className='restaurant'>
          <h4>음식점</h4>
          <a href='/check'>음식점 선택하기</a>
        </div>
        <hr />
        <div className='infor'>
          <div className='num'>
            <h4>인원</h4>
            <span onClick={onDecrease} className="material-symbols-rounded">remove</span>
            <input
              required
              id='max_people' name='max_people' type='number'
              value={list.max_people}
              onChange={onInputPeopleChange}
            />
            <span onClick={onIncrease} className="material-symbols-rounded">add</span>
          </div>
          <div className='location'>
            <h4>위치</h4>
            <a href='/map'>위치 선택하기</a>
          </div>
        </div>
        <hr />
        <div className='time'>
          <h4>희망 주문 시간 </h4>
          <div className='timeItem'>
            <div className='item'>
              <input required type='text' name='year' minLength='4' maxLength='4' value={list.year} onChange={onInputTimeChange}/><p>년</p>
            </div>
            <div className='item'>
              <input required type='text' name='month' minLength='2' maxLength='2' value={list.month} onChange={onInputTimeChange}/><p>월</p>
            </div>
            <div className='item'>
              <input required type='text' name='day' minLength='2' maxLength='2' value={list.day} onChange={onInputTimeChange}/><p>일</p>
            </div>
            <div className='item'>
              <input required type='text' name='hour' minLength='2' maxLength='2' value={list.hour} onChange={onInputTimeChange}/><p>시</p>
            </div>
            <div className='item'>
              <input required type='text' name='minute' minLength='2' maxLength='2' value={list.minute} onChange={onInputTimeChange}/><p>분</p>
            </div>
          </div>
        </div>
        <button className='makeBtn' type="submit">모임 만들기</button>
      </form>
    </div>
  );
}

export default Make;
