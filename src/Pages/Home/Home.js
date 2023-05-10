import React from 'react';
import './Home.css';
import profile from '../../Images/profile.png';

function Home() {
  return (
    <div className='home'>
      <div className='header'>
        경북 구미시 대학로
        <span class="material-symbols-rounded">search</span>
      </div>
      <hr />
      <div className='main'>
        <div className='type'>
          <p>전체</p>
          <p>한식</p>
          <p>분식</p>
          <p>중식</p>
          <p>일식</p>
          <p>양식</p>
          <p>카페</p>
          <p>야식</p>
        </div>
        <div className='board'>
          <div className='user'>
            <img src={profile} alt='profile' />
            <div className='infor'>
              <p className='name'>김민지</p>
              <p className='date'>2023년 1월 23일</p>
            </div>
          </div>
          <h4 className='title'>로제떡볶이 드실 분</h4>
          <p className='content'>곱창떡볶이도 좋습니다 사실 떡볶이는 다 좋아요 글쓰면서 배고파진다....</p>
          <div className='location'>
            <span class="material-symbols-rounded">location_on</span>
            <p>경상북도 구미시 대학로 62 오름관 1동 1층</p>
          </div>
          <div className='restaurant'>
            <span class="material-symbols-rounded">home</span>
            <p>배떡 옥계점</p>
          </div>
          <div className='btn'>
            <a href='/board'><button>댓글 작성</button></a>
            <button className='primary'>모집 2/4명</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
