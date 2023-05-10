import React from 'react';
import './Make.css';

function Make() {
  return (
    <div className='make'>
      <div className='header'>
        <a href='/'><span class="material-symbols-rounded">chevron_left</span></a>
        <h4>모임 만들기</h4>
      </div>
      <div className='main'>
        <div className='title'>
          <h4>제목</h4>
          <input placeholder='제목을 작성해 주세요.'/>
        </div>
        <hr />
        <div className='content'>
          <h4>본문</h4>
          <textarea placeholder='본문을 작성해 주세요.'/>
        </div>
        <hr />
        <div className='category'>
          <h4>음식 카테고리</h4>
          <select>
            <option value="1" selected>음식 카테고리를 선택해 주세요.</option>
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
          <a href='/check'><button>음식점 선택하기</button></a>
        </div>
        <hr />
        <div className='infor'>
          <div className='num'>
            <h4>인원</h4>
            <p>
              <span class="material-symbols-rounded">remove</span>
              3
              <span class="material-symbols-rounded">add</span>
            </p>
          </div>
          <div className='location'>
            <h4>위치</h4>
            <a href='/check'><button>위치 선택하기</button></a>
          </div>
        </div>
        <hr />
        <div className='time'>
          <h4>희망 주문 시간 </h4>
          <div className='timeItem'>
            <p>2023년 3월 9일</p>
            <p>18:00</p>
          </div>
        </div>
        <button className='makeBtn'>모임 만들기</button>
      </div>
    </div>
  );
}

export default Make;
