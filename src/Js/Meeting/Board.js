import React, { useState, useLayoutEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import '../../Css/Meeting/Board.css';
import profile from '../../Images/profile.png';
import { call } from '../../Service/ApiService';
import * as AppStorage from "../../AppStorage";

function Board() {
  const { board_no } = useParams();
  const [list, setList] = useState({
    member: { name: "" },
    reg_date: "",
    restaurant: { name: "" },
  });
  const [reply, setReply] = useState({
    board_no: board_no,
    contents: ""
  });

  const onCommentChange = (e) => { setReply((prevState) => ({...prevState, contents: e.target.value })); }
  const onCommentKeyPress = (e) => { if (e.key === 'Enter') { handleSubmit(); } }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    call("/api/reply/create", "POST", reply).then((response) => {
      setReply(response.data);
      window.location.reload();
    });
  };

  const onBoardDelete = (board_no) => {
    call(`/api/board/delete/${board_no}`, "GET", null).then((response) => {
      window.location.href = "/home";
    });
  }

  const onCommentDelete = (reply_no) => {
    call(`/api/reply/delete/${reply_no}`, "GET", null).then((response) => {
      window.location.reload();
    });
  }

  useLayoutEffect(() => {
    call(`/api/board/get/${board_no}`, "GET", null).then((response) => {
      setList(response.data);
    });
  }, []);

  console.log(list);
  // console.log(reply);
  // console.log(list.member['name']);

  return (
    <>
      <div className='entire'>
        <div className='header'>
          <a href="/home"><span class="material-symbols-rounded">chevron_left</span></a>
          <Link to={`/menuview/${list.board_no}`}>
            <span class="material-symbols-rounded" id='basket'>shopping_basket</span>
          </Link>
        </div>
        <hr />
        <div className='main'>
          <div className='board'>
            <div className='user'>
              <img src={profile} alt='profile' />
              <div className='infor'>
                <p className='name'>{list.member.name}</p>
                <p className='date'>{list.reg_date.slice(0, 14)}</p>
              </div>
              { AppStorage.getItem("username") == list.member.name &&
                <button onClick={() => onBoardDelete(list.board_no)}>
                  <span class="material-symbols-rounded">delete</span>
                </button>
              } 
            </div>
            <h4 className='title'>{list.title}</h4>
            <p className='content'>{list.contents}</p> 
            <div className='location'>
              <span class="material-symbols-rounded">location_on</span>
              <p>{list.location}</p>
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
              { AppStorage.getItem("username") == item.writer &&
                <button onClick={() => onCommentDelete(item.reply_no)}>
                  <span class="material-symbols-rounded">delete</span>
                </button>
              }
            </div>
            <hr />
          </>
        )}
      </div>
      <form noValidate onSubmit={handleSubmit} className='input'>
        <input placeholder='댓글을 입력하세요.' key={AppStorage.getItem("username")} onChange={onCommentChange} onKeyPress={onCommentKeyPress}/>
        <button type="submit">
          <span class="material-symbols-rounded">check_circle</span>
        </button>
      </form>
    </>
  );
}

export default Board;
