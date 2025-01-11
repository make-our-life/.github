import React, { useState } from 'react';
import './App.css'
import Footer from './layouts/Footer';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import Authentication from './views/Authentication';
import Search from './views/Search';
import User from './views/User';
import BoardDetail from './views/Board/Detail';
import BoardWrite from './views/Board/Write';
import BoardUpdate from './views/Board/Update';

// component: Application 컴포넌트트
function App() {

  // const [value, setValue] = useState<string>('');
  
  // discription: 메인 화면 : '/' - Main 
  // discription: 로그인 + 회원가입 : '/auth' - Authentication
  // discription: 검색 화면 : '/search/:word' - Search
  // discription: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail
  // discription: 게시물 작성하기 : '/board/write' - BoardWrite
  // discription: 게시물 수정하기 : '/board/update/:boardNumber' - BoardUpdate
  // discription: 유저 페이지 : '/user/email' - User

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
      {/* <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={false} setValue={setValue} message='aaaa'/> */}
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/auth' element={<Authentication />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/user' element={<User />}/>
          <Route path='/board'>
            <Route path='write' element={<BoardWrite/>}/>
            <Route path='update/:boardNumber' element={<BoardUpdate/>}/>
            <Route path='detail/:boardNumber' element={<BoardDetail/>}/>
          </Route>
          <Route path='/' element={<Main />}/>
        </Routes>
    </>
  )
}

export default App
