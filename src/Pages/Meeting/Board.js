import React from 'react';
import './Board.css';
import profile from '../../Images/profile.png';

function Board() {
  return (
    <>
      <div className='entire'>
        <div className='header'>
          <a href="/"><span class="material-symbols-rounded">chevron_left</span></a>
          <a href="/"><span class="material-symbols-rounded" id='basket'>shopping_basket</span></a>
        </div>
        <hr />
        <div className='main'>
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
          </div>
          <div className='ing'>
            <h4>모임중인 사용자</h4>
            <div className='users'>
              <div className='user'>
                <img src={profile} alt='profile'/>
                <p className='name'>김민지</p>
              </div>
              <div className='user'>
                <img src={profile} alt='profile'/>
                <p className='name'>이민지</p>
              </div>
              <div className='user'>
                <img src={profile} alt='profile'/>
                <p className='name'>강민지</p>
              </div>
              <div className='user'>
                <img src={profile} alt='profile'/>
                <p className='name'>구민지</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='comment'>
          <div className='user'>
            <img src={profile} alt='profile'/>
            <p>구민지</p>
          </div>
          <p>몇 시에 만나는 게 좋을까요?</p>
        </div>
        <hr />
        <div className='comment'>
          <div className='user'>
            <img src={profile} alt='profile'/>
            <p>김민지</p>
          </div>
          <p>8시 어떠신가요?</p>
        </div>
        <hr />
        <div className='comment'>
          <div className='user'>
            <img src={profile} alt='profile'/>
            <p>강민지</p>
          </div>
          <p>좋아요</p>
        </div>
      </div>
      <div className='input'>
        <input placeholder='댓글을 입력하세요.' />
        <span class="material-symbols-rounded">check_circle</span>
      </div>
    </>
  );
}

export default Board;
