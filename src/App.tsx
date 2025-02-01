import React, { useEffect, useState } from 'react';
import './App.css'
import Footer from './layouts/Footer';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import Authentication from './views/Authentication';
import Search from './views/Search';
import UserP from './views/User';
import BoardDetail from './views/Board/Detail';
import BoardWrite from './views/Board/Write';
import BoardUpdate from './views/Board/Update';
import Container from './layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from './constants';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from './stores';
import { getSignInUserRequest } from './apis';
import { GetSignInUserResposeDto } from './apis/response/user';
import { ResponseDto } from './apis/response';
import { User } from './types/interface';

// component: Application 컴포넌트트
function App() {

  // state: 로그인 유저 전역 상태 (useLoginUserStore 이 친구 관리하는 로직 이해하기)
  const { setLoginUser, resetLoginUser} = useLoginUserStore();

  // state: cookies 상태 
  const [cookies, setCookie] = useCookies();

  // function: get sign in user response 처리 함수  
  const getSignInUserResponse = (responseBody: GetSignInUserResposeDto | ResponseDto | null) => {
    if(!responseBody) return;

    const {code} = responseBody;

    // 올바르지 않는 응답인 경우 reset
    if(code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      return;
    } 

    // User와 GetSignInUserResposeDto 구조가 같은 와중에 responseBody 객체의 모든 속성을 
    // 새로운 개게로 복사하여 loginUser 로 사용하겠다는 말말
    const loginUser: User = {...responseBody as GetSignInUserResposeDto}
    setLoginUser(loginUser);
  }
  // effect: accessToken cookie 값이 변경될 때 마다 실행할 함수 
  useEffect(()=> {
    if(!cookies.accessToken) {
      resetLoginUser(); // 토큰이 존재하지 않으면 loginUser 값을 null 로 바꿈
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

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
          <Route element={<Container/>} >
            <Route path={MAIN_PATH()} element={<Main />}/>
            <Route path={AUTH_PATH()} element={<Authentication />}/>
            <Route path={SEARCH_PATH(':searchWord')} element={<Search />}/>
            <Route path={USER_PATH(':userEmail')} element={<UserP />}/>
            <Route path={BOARD_PATH()}>
              <Route path={BOARD_WRITE_PATH()} element={<BoardWrite/>}/>
              <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate/>}/>
              <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail/>}/>
            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
