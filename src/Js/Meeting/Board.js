import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../../Css/Meeting/Board.css';
import profile from '../../Images/profile.png';
import { call } from '../../Service/ApiService';

function Board() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [reply, setReply] = useState({
    reply_no: 0,
    contents: "",
    reg_date: "",
    mod_date: "",
    writer: ""
  });

  const onCommentChange = (e) => { setReply({ contents: e.target.value }); }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    let time = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate(), hours: new Date().getHours(), minutes: new Date().getMinutes() };
    let timestring = `${time.year}-${time.month}-${time.date}T${time.hours}:${time.minutes}:00`;

    setReply({ reply_no: reply.reply_no + 1, reg_date: timestring, writer: localStorage.getItem("username") });
    call(`/api/reply/create`, "POST", reply).then((response) => {
      setReply(response.data);
    });
  };

  const onDelete = (replyNo) => {
    // console.log(replyNo);
    call(`/api/reply/delete/${replyNo}`, "GET", null).then((response) => {
      setList(response.data);
    });
  }

  useEffect(() => {
    call(`/api/board/get/${id}`, "GET", null).then((response) => {
      setList(response.data);
    });
  }, []);

  // console.log(id); 
  // console.log(list);
  // console.log(list.member['name']);

  return (
    <>
      {list &&
        <>
          <div className='entire'>
            <div className='header'>
              <a href="/home"><span class="material-symbols-rounded">chevron_left</span></a>
              <a href="/basket"><span class="material-symbols-rounded" id='basket'>shopping_basket</span></a>
            </div>
            <hr />
            <div className='main'>
              <div className='board'>
                <div className='user'>
                  <img src={profile} alt='profile' />
                  <div className='infor'>
                    <p className='name'>{list.member.name}</p>
                    <p className='date'>{list.reg_date.slice(0, 4)}년 {list.reg_date.slice(5, 7)}월 {list.reg_date.slice(8, 10)}일</p>
                  </div>
                </div>
                <h4 className='title'>{list.title}</h4>
                <p className='content'>{list.contents}</p> 
                <div className='location'>
                  <span class="material-symbols-rounded">location_on</span>
                  <p>경상북도 구미시 대학로 62 오름관 1동 1층</p>
                </div>
                <div className='restaurant'>
                  <span class="material-symbols-rounded">home</span>
                  <p>{list.restaurant.name}</p>
                </div>
              </div>
              <div className='ing'>
                <h4>모임중인 사용자</h4>
                <div className='users'>
                  {list.participant && list.participant.map((item) => 
                    <div className='user' id={item.participation_no}>
                      <img src={profile} alt='profile' />
                      <p className='name'>{item.participant_name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr />
            {list.reply && list.reply.map((item) =>
              <>
                <div className='comment' id={item.reply_no}>
                  <div className='user'>
                    <img src={profile} alt='profile'/>
                    <p>{item.writer}</p>
                    <p className='time'>{item.reg_date.slice(0, 4)}.{item.reg_date.slice(5, 7)}.{item.reg_date.slice(8, 10)} {item.reg_date.slice(11, 13)}:{item.reg_date.slice(14, 16)}</p>
                  </div>
                  <p>{item.contents}</p>
                  {/* 본인 댓글만 삭제할 수 있도록 */}
                  { localStorage.getItem("username") == item.writer &&
                    <button onClick={() => onDelete(item.reply_no)}>
                      <span class="material-symbols-rounded">delete</span>
                    </button>
                  }
                </div>
                <hr />
              </>
            )}
          </div>
          <form noValidate onSubmit={handleSubmit} className='input'>
            <input placeholder='댓글을 입력하세요.' onChange={onCommentChange}/>
            <button type="submit">
              <span class="material-symbols-rounded">check_circle</span>
            </button>
          </form>
        </>
      }
    </>
  );
}

export default Board;
