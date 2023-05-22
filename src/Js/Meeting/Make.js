/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import '../../Css/Meeting/Make.css';
import { call } from '../../Service/ApiService';

function Make(props) {
  const [ordertime, setOrdertime] = useState("");
  const [list, setList] = useState({
    title: "",
    contents: "",
    category: "",
    restaurant_no: 0,
    max_people: 1,
    latitude: "",
    longtitude: "",
    order_time: ""
  }); 

  const handleSubmit = (e) => {
    e.preventDefault();

    list.order_time = ordertime.slice(0, 4).concat("-").concat(ordertime.slice(5, 7)).concat("-").concat(ordertime.slice(8, 10)).concat("T").concat(ordertime.slice(11, 13)).concat(":").concat(ordertime.slice(14, 16));
    call("/api/board/create", "POST", list).then((response) => {
      setList(response.data);
      // window.location.href = "/home";
    });
  };

  const onDecrease = () => { setList({max_people: list.max_people - 1}); }
  const onIncrease = () => { setList({max_people: list.max_people + 1}); }
  const onInputTitleChange = (e) => { setList({title : e.target.value}); }
  const onInputContentsChange = (e) => { setList({contents: e.target.value}); }
  const onInputCategoryChange = (e) => { setList({category: e.target.value}); }
  // const onInputRestaurantChange = (e) =>  //   setList({restaurant_no: e.target.value}); // }
  const onInputPeopleChange = (e) => { setList({max_people: e.target.value}); }
  const onInputYearChange = (e) => { setOrdertime(`${e.target.value}`); }  
  const onInputMonthChange = (e) => { setOrdertime(ordertime.concat(`${e.target.value}`)); }  
  const onInputDateChange = (e) => { setOrdertime(ordertime.concat(`${e.target.value}`)); }  
  const onInputHourChange = (e) => { setOrdertime(ordertime.concat(`${e.target.value}`)); }  
  const onInputMinuteChange = (e) => { setOrdertime(ordertime.concat(`${e.target.value}`)); }  

  // console.log(props);
  // console.log(ordertime);
  // console.log(ordertime.slice(0,4).concat("-").concat(ordertime.slice(5,7)).concat("-").concat(ordertime.slice(8,10)).concat("T").concat(ordertime.slice(11,13)).concat(":").concat(ordertime.slice(14,16)));
    
  return (
    <div className='make'>
      <div className='header'>
        <a href='/home'><span className="material-symbols-rounded">chevron_left</span></a>
        <h4>모임 만들기</h4>
      </div>
      <form noValidate onSubmit={handleSubmit} className='main'>
        <div className='title'>
          <h4>제목</h4>
          <input
            required
            id='title'
            name='title'
            type='text'
            placeholder='제목을 작성해 주세요.'
            value={list.title}
            onChange={onInputTitleChange}
          />
        </div>
        <hr />
        <div className='content'>
          <h4>본문</h4>
          <textarea 
            id='contents'
            name='contents'
            type='text'
            placeholder='본문을 작성해 주세요.'
            value={list.contents}
            onChange={onInputContentsChange}
          />
        </div>
        <hr />
        <div className='category'>
          <h4>음식 카테고리</h4>
          <select
            id='category'
            name='category'
            value={list.category}
            onChange={onInputCategoryChange}
          >
            <option defaultValue selected>음식 카테고리를 선택해 주세요.</option>
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
              id='max_people'
              name='max_people'
              type='number'
              value={Number(list.max_people)}
              onChange={onInputPeopleChange}
            />
            <span onClick={onIncrease} className="material-symbols-rounded">add</span>
          </div>
          <div className='location'>
            <h4>위치</h4>
            <a href='/check'>위치 선택하기</a>
          </div>
        </div>
        <hr />
        <div className='time'>
          <h4>희망 주문 시간 </h4>
          <div className='timeItem'>
            <div className='item'>
              <input required type='text' minLength='4' maxLength='4' onChange={onInputYearChange}/><p>년</p>
            </div>
            <div className='item'>
              <input required type='text' minLength='2' maxLength='2' onChange={onInputMonthChange}/><p>월</p>
            </div>
            <div className='item'>
              <input required type='text' minLength='2' maxLength='2' onChange={onInputDateChange}/><p>일</p>
            </div>
            <div className='item'>
              <input required type='text' minLength='2' maxLength='2' onChange={onInputHourChange}/><p>시</p>
            </div>
            <div className='item'>
              <input required type='text' minLength='2' maxLength='2' onChange={onInputMinuteChange}/><p>분</p>
            </div>
          </div>
        </div>
        <button className='makeBtn' type="submit">모임 만들기</button>
      </form>
    </div>
  );
}

export default Make;
