import React, { useState } from 'react';
import './App.css'
import BoardItem from './components/BoardItem';
import top3BoardListMock from './mocks/top3-board-list.mock';
import Top3Item from './components/Top3Item';
import CommentItem from './components/CommentItem';
import commentListMock from './mocks/comment-list.mock';
import favoriteListMock from './mocks/favorite-list.mock';
import FavoriteItem from './components/FavoriteItem';
import InputBox from './components/InputBox';


function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      {/* 댓글글
      <div style={{padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {commentListMock.map(commentListItem => <CommentItem commentListItem={commentListItem}/>)}
      </div> */}
      {/* 좋아요 리스트트
      <div style={{display: 'flex', columnGap: '30px', rowGap: '20px'}}>
        {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem}/>)}
      </div> */}
      <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={false} setValue={setValue} message='aaaa'/>
    </>
  )
}

export default App
