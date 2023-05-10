import React, { useState, useEffect } from 'react';
import '../../Css/Restaurant/Check.css';
import profile from '../../Images/profile.png';
import { call } from '../../Service/ApiService';

function Check() {
  const [list, setList] = useState([]);

  useEffect(() => {
    call("/api/restaurant/getList", "GET", null).then((response) => {
      console.log(response);
      // setList(list = response);
    });
  }, []);
  
  return (
    <div className='check'>
      <div className='header'>
        <a href="/"><span class="material-symbols-rounded">chevron_left</span></a>
        <h4>음식점 조회</h4>
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
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>배떡</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>1,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>17,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>맘스터치</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>3,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>9,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>배떡</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>1,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>17,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>배떡</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>1,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>17,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>배떡</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>1,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>17,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>배떡</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>1,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>17,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
        <div className='restaurant'>
          <img src={profile} alt='profile'/>
          <div className='price'>
            <div className='name'>
              <h4>배떡</h4>
            </div>
            <div className='tip'>
              <strong>배달팁</strong>
              <p>1,000원</p>
            </div>
            <div className='least'>
              <strong>최소주문</strong>
              <p>17,000원</p>
            </div>
            <button>선택</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Check;
