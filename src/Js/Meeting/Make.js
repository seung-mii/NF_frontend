/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import '../../Css/Meeting/Make.css';
import { call } from '../../Service/ApiService';
import * as AppStorage from "../../AppStorage";

function Make() {
  const [detailAddress, setDetailAddress] = useState("");
  const [list, setList] = useState({
    title: "",
    contents: "",
    category: AppStorage.getItem("category"),
    restaurant_no: AppStorage.getItem("restaurant_no"),
    max_people: parseInt(AppStorage.getItem("max_people")),
    location: AppStorage.getItem("address"),
    order_time: ""
  }); 

  const onDecrease = () => { 
    if (AppStorage.getItem("max_people") > 2) {
      AppStorage.setItem("max_people", list.max_people - 1);
      setList((prevState) => ({ ...prevState, max_people: parseInt(AppStorage.getItem("max_people"))}))
    }
  }
  const onIncrease = () => { 
    AppStorage.setItem("max_people", list.max_people + 1);
    setList((prevState) => ({ ...prevState, max_people: parseInt(AppStorage.getItem("max_people"))}))
  }
  const onInputTitleChange = (e) => { setList((prevState) => ({ ...prevState, title : e.target.value})); }
  const onInputContentsChange = (e) => { setList((prevState) => ({ ...prevState, contents: e.target.value})); }
  const onInputTimeChange = (e) => { setList((prevState) => ({ ...prevState, [e.target.name]: e.target.value })); } 
  const onInputDetailAddressChange = (e) => { setDetailAddress(e.target.value) } 
  const onInputPeopleChange = (e) => { setList((prevState) => ({ ...prevState, max_people: list.max_people })); }

  const onClear = (e) => {
    AppStorage.setItem("restaurant_no", null);
    AppStorage.setItem("restaurant_name", null);
    AppStorage.setItem("max_people", null);
    AppStorage.setItem("category", null);
    AppStorage.setItem("address", null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (list.month != undefined && list.day != undefined && list.hour != undefined && list.minute != undefined) {
      if(list.month.length == 1) { list.month = "0" + list.month }
      if(list.day.length == 1) { list.day = "0" + list.day }
      if(list.hour.length == 1) { list.hour = "0" + list.hour }
      if (list.minute.length == 1) { list.minute = "0" + list.minute }
    }
    list.order_time = list.year + list.month + list.day + list.hour + list.minute;
    list.location = list.location + " " + detailAddress;
    setList((prevState) => ({ ...prevState, location: list.location }));
    call("/api/board/create", "POST", list).then((response) => {
      if (response != undefined) {
        setList(response.data);
        onClear();
        window.location.href = "/home";
      }
    });
  };

  // console.log(list);
  
  return (
    <div className='make'>
      <div className='header' onClick={onClear}>
        <a href='/home'><span className="material-symbols-rounded">chevron_left</span></a>
        <h4>모임 만들기</h4>
      </div>
      <form noValidate onSubmit={handleSubmit} className='main'>
        <hr />
        <div className='infor'>
          {list.restaurant_no == "null" ?
            <div className='restaurant'>
              <h4>음식점</h4>
              <a href='/check'>음식점 선택하기</a>
            </div>
            :
            <div className='restaurant_choose'>
              <h4>음식점</h4>
              <a href='/check'>{AppStorage.getItem("restaurant_name")}</a>
            </div>
          }
          <div className='num'>
            <h4>인원</h4>
            <span onClick={onDecrease} className="material-symbols-rounded">remove</span>
            <input
              required
              disabled
              id='max_people' name='max_people' type='number'
              value={list.max_people}
              onChange={onInputPeopleChange}
            />
            <span onClick={onIncrease} className="material-symbols-rounded">add</span>
          </div>
        </div>
        <hr />
        {list.location == "null" ?
          <div className='location'>
            <h4>음식 받을 위치</h4>
            <a href='/map'>위치 선택하기</a> 
            <input required
              id='detail_address' name='detail_address' type='text'
              placeholder='상세주소를 작성해 주세요.'
              onChange={onInputDetailAddressChange}
            />
          </div>
          : 
          <div className='location_choose'>
            <h4>음식 받을 위치</h4>
            <a href='/map'>{list.location}</a>
            <input required
              id='detail_address' name='detail_address' type='text'
              placeholder='상세주소를 작성해 주세요.'
              onChange={onInputDetailAddressChange}
            />
          </div>
        }
        <hr />
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
        <div className='time'>
          <div className='timeHeader'>
            <h4>희망 주문 시간 </h4>
            <p>24시간 기준으로 작성해주세요. (예. 오후 6시 → 18시)</p>
          </div>
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
